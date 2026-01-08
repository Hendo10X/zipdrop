import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/db/drizzle";
import { apiKey } from "@/db/schema";
import { eq } from "drizzle-orm";

const lookupSchema = z.object({
  address: z.string().min(1, "Address is required"),
});

interface MapboxContext {
  id: string;
  text: string;
  short_code?: string;
}

interface MapboxFeature {
  id: string;
  type: string;
  place_type: string[];
  relevance: number;
  properties: {
    accuracy?: string;
  };
  text: string;
  place_name: string;
  center: [number, number];
  geometry: {
    type: string;
    coordinates: [number, number];
  };
  address?: string;
  context?: MapboxContext[];
}

interface MapboxResponse {
  type: string;
  query: string[];
  features: MapboxFeature[];
  attribution: string;
}

// CORS headers for public API
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, X-API-Key",
};

// Handle preflight requests
export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: corsHeaders });
}

// Validate API key and return user info
async function validateApiKey(key: string) {
  const [keyRecord] = await db
    .select()
    .from(apiKey)
    .where(eq(apiKey.key, key));

  if (!keyRecord) {
    return null;
  }

  // Check if key is expired
  if (keyRecord.expiresAt && keyRecord.expiresAt < new Date()) {
    return null;
  }

  // Update request count and last used
  await db
    .update(apiKey)
    .set({
      requestCount: keyRecord.requestCount + 1,
      lastUsedAt: new Date(),
    })
    .where(eq(apiKey.id, keyRecord.id));

  return keyRecord;
}

// GET - Lookup with query parameter
export async function GET(request: NextRequest) {
  const apiKeyHeader = request.headers.get("X-API-Key");
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");

  if (!apiKeyHeader) {
    return NextResponse.json(
      {
        error: "Missing API key",
        message: "Include your API key in the X-API-Key header",
      },
      { status: 401, headers: corsHeaders }
    );
  }

  const keyRecord = await validateApiKey(apiKeyHeader);
  if (!keyRecord) {
    return NextResponse.json(
      { error: "Invalid or expired API key" },
      { status: 401, headers: corsHeaders }
    );
  }

  if (!address) {
    return NextResponse.json(
      {
        error: "Missing address parameter",
        message: "Include address as a query parameter: ?address=123 Main St",
      },
      { status: 400, headers: corsHeaders }
    );
  }

  return await performLookup(address);
}

// POST - Lookup with JSON body
export async function POST(request: NextRequest) {
  const apiKeyHeader = request.headers.get("X-API-Key");

  if (!apiKeyHeader) {
    return NextResponse.json(
      {
        error: "Missing API key",
        message: "Include your API key in the X-API-Key header",
      },
      { status: 401, headers: corsHeaders }
    );
  }

  const keyRecord = await validateApiKey(apiKeyHeader);
  if (!keyRecord) {
    return NextResponse.json(
      { error: "Invalid or expired API key" },
      { status: 401, headers: corsHeaders }
    );
  }

  try {
    const body = await request.json();
    const { address } = lookupSchema.parse(body);

    return await performLookup(address);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues?.[0]?.message ?? "Invalid input" },
        { status: 400, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400, headers: corsHeaders }
    );
  }
}

async function performLookup(address: string) {
  try {
    const mapboxToken = process.env.MAPBOX_ACCESS_TOKEN;

    if (!mapboxToken) {
      return NextResponse.json(
        { error: "Service temporarily unavailable" },
        { status: 503, headers: corsHeaders }
      );
    }

    const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      address
    )}.json?access_token=${mapboxToken}&limit=1`;

    const response = await fetch(geocodeUrl);
    const data: MapboxResponse = await response.json();

    if (!data.features || data.features.length === 0) {
      return NextResponse.json(
        {
          error: "Address not found",
          message: "No results found for the provided address",
        },
        { status: 404, headers: corsHeaders }
      );
    }

    const result = data.features[0];

    const getContext = (type: string) => {
      return result.context?.find((ctx) => ctx.id.startsWith(type));
    };

    const street = result.address
      ? `${result.address} ${result.text}`
      : result.text;

    const city =
      getContext("place")?.text ||
      getContext("locality")?.text ||
      getContext("district")?.text ||
      "";

    const state = getContext("region")?.text || "";
    const stateCode =
      getContext("region")?.short_code?.replace("US-", "").replace(/^[A-Z]{2}-/, "") || "";

    const postalCode = getContext("postcode")?.text || "";
    const country = getContext("country")?.text || "";
    const countryCode = getContext("country")?.short_code?.toUpperCase() || "";

    return NextResponse.json(
      {
        success: true,
        data: {
          postalCode,
          street: street || "",
          city,
          state: stateCode || state,
          country,
          countryCode,
          formattedAddress: result.place_name,
          coordinates: {
            latitude: result.center[1],
            longitude: result.center[0],
          },
        },
      },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error("Lookup error:", error);
    return NextResponse.json(
      { error: "Failed to lookup address" },
      { status: 500, headers: corsHeaders }
    );
  }
}

