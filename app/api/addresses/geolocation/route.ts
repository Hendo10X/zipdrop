import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const geolocationSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
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
  query: [number, number];
  features: MapboxFeature[];
  attribution: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { latitude, longitude } = geolocationSchema.parse(body);

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

    const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${apiKey}&limit=1`;

    const response = await fetch(geocodeUrl);
    const data: MapboxResponse = await response.json();

    if (!data.features || data.features.length === 0) {
      return NextResponse.json(
        { error: "No address found for the provided coordinates" },
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
    const stateCode = getContext("region")?.short_code?.replace("US-", "") || "";

    const postalCode = getContext("postcode")?.text || "";
    const country = getContext("country")?.text || "";
    const countryCode =
      getContext("country")?.short_code?.toUpperCase() || "";

    const address = {
      street: street || "",
      city: city,
      state: stateCode || state,
      postalCode: postalCode,
      country: country,
      countryCode: countryCode,
      formattedAddress: result.place_name,
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      placeId: result.id,
    };

    return NextResponse.json({ address });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error("Geolocation error:", error);
    return NextResponse.json(
      { error: "Failed to get address from coordinates" },
      { status: 500 }
    );
  }
}
