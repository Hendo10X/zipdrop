import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const verifyAddressSchema = z.object({
  address: z.string().min(1, "Address is required"),
});

interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

interface GoogleGeocodeResult {
  address_components: AddressComponent[];
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  place_id: string;
  types: string[];
}

interface GoogleGeocodeResponse {
  results: GoogleGeocodeResult[];
  status: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { address } = verifyAddressSchema.parse(body);

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

    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${apiKey}`;

    const response = await fetch(geocodeUrl);
    const data: GoogleGeocodeResponse = await response.json();

    if (data.status === "ZERO_RESULTS") {
      return NextResponse.json(
        { error: "No results found for the provided address" },
        { status: 404 }
      );
    }

    if (data.status !== "OK") {
      return NextResponse.json(
        { error: `Geocoding failed: ${data.status}` },
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

    const verifiedAddress = {
      street: street || "",
      city:
        getComponent(["locality", "sublocality"])?.long_name ||
        getComponent(["administrative_area_level_2"])?.long_name ||
        "",
      state:
        getComponent(["administrative_area_level_1"])?.short_name || "",
      postalCode: getComponent(["postal_code"])?.long_name || "",
      country: getComponent(["country"])?.long_name || "",
      countryCode: getComponent(["country"])?.short_name || "",
      formattedAddress: result.formatted_address,
      latitude: result.geometry.location.lat.toString(),
      longitude: result.geometry.location.lng.toString(),
      placeId: result.place_id,
    };

    return NextResponse.json({ address: verifiedAddress });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
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
