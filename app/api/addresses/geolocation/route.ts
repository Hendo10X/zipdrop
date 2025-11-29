import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const geolocationSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
});

interface GoogleReverseGeocodeResponse {
  results: Array<{
    address_components: Array<{
      long_name: string;
      short_name: string;
      types: string[];
    }>;
    formatted_address: string;
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
    place_id: string;
    types: string[];
  }>;
  status: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { latitude, longitude } = geolocationSchema.parse(body);

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "Google Maps API key is not configured. Please add GOOGLE_MAPS_API_KEY to your environment variables.",
        },
        { status: 500 }
      );
    }

    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    const response = await fetch(geocodeUrl);
    const data: GoogleReverseGeocodeResponse = await response.json();

    if (data.status === "ZERO_RESULTS") {
      return NextResponse.json(
        { error: "No address found for the provided coordinates" },
        { status: 404 }
      );
    }

    if (data.status !== "OK") {
      return NextResponse.json(
        { error: `Reverse geocoding failed: ${data.status}` },
        { status: 400 }
      );
    }

    const result = data.results[0];

    const getComponent = (types: string[]) => {
      return result.address_components.find((component) =>
        types.some((type) => component.types.includes(type))
      );
    };

    const street = [
      getComponent(["street_number"])?.long_name,
      getComponent(["route"])?.long_name,
    ]
      .filter(Boolean)
      .join(" ");

    const address = {
      street: street || "",
      city:
        getComponent(["locality", "sublocality"])?.long_name ||
        getComponent(["administrative_area_level_2"])?.long_name ||
        "",
      state: getComponent(["administrative_area_level_1"])?.short_name || "",
      postalCode: getComponent(["postal_code"])?.long_name || "",
      country: getComponent(["country"])?.long_name || "",
      countryCode: getComponent(["country"])?.short_name || "",
      formattedAddress: result.formatted_address,
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      placeId: result.place_id,
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
