import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const verifyAddressSchema = z.object({
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { address } = verifyAddressSchema.parse(body);

    const apiKey = process.env.MAPBOX_ACCESS_TOKEN;

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "Mapbox access token is not configured. Please add MAPBOX_ACCESS_TOKEN to your environment variables.",
        },
        { status: 500 }
      );
    }

    const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      address
    )}.json?access_token=${apiKey}&limit=1`;

    const response = await fetch(geocodeUrl);
    const data: MapboxResponse = await response.json();

    if (!data.features || data.features.length === 0) {
      return NextResponse.json(
        { error: "No results found for the provided address" },
        { status: 404 }
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
      getContext("region")?.short_code?.replace("US-", "") || "";

    const postalCode = getContext("postcode")?.text || "";
    const country = getContext("country")?.text || "";
    const countryCode = getContext("country")?.short_code?.toUpperCase() || "";

    const verifiedAddress = {
      street: street || "",
      city: city,
      state: stateCode || state,
      postalCode: postalCode,
      country: country,
      countryCode: countryCode,
      formattedAddress: result.place_name,
      latitude: result.center[1].toString(),
      longitude: result.center[0].toString(),
      placeId: result.id,
    };

    return NextResponse.json({ address: verifiedAddress });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues?.[0]?.message ?? "Invalid input" },
        { status: 400 }
      );
    }

    console.error("Address verification error:", error);
    return NextResponse.json(
      { error: "Failed to verify address" },
      { status: 500 }
    );
  }
}
