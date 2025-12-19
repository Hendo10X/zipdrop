import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/db/drizzle";
import { savedAddress, activityLog } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const saveAddressSchema = z.object({
  label: z.string().optional(),
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().optional(),
  postalCode: z.string().min(1, "Postal code is required"),
  country: z.string().min(1, "Country is required"),
  formattedAddress: z.string().min(1, "Formatted address is required"),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
});

async function getSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session;
}

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const addresses = await db
      .select()
      .from(savedAddress)
      .where(eq(savedAddress.userId, session.user.id))
      .orderBy(savedAddress.createdAt);

    return NextResponse.json({ addresses });
  } catch (error) {
    console.error("Failed to fetch saved addresses:", error);
    return NextResponse.json(
      { error: "Failed to fetch saved addresses" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = saveAddressSchema.parse(body);

    const id = crypto.randomUUID();

    const [newAddress] = await db
      .insert(savedAddress)
      .values({
        id,
        userId: session.user.id,
        ...validatedData,
      })
      .returning();

    await db.insert(activityLog).values({
      id: crypto.randomUUID(),
      userId: session.user.id,
      action: "address_saved",
      details: `Saved address: ${validatedData.formattedAddress}`,
      metadata: JSON.stringify({ addressId: id }),
    });

    return NextResponse.json(
      { address: newAddress, message: "Address saved successfully" },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues?.[0]?.message ?? "Invalid input" },
        { status: 400 }
      );
    }

    console.error("Failed to save address:", error);
    return NextResponse.json(
      { error: "Failed to save address" },
      { status: 500 }
    );
  }
}
