import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { savedAddress, activityLog } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

async function getSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session;
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const [address] = await db
      .select()
      .from(savedAddress)
      .where(
        and(eq(savedAddress.id, id), eq(savedAddress.userId, session.user.id))
      );

    if (!address) {
      return NextResponse.json(
        { error: "Address not found" },
        { status: 404 }
      );
    }

    await db
      .delete(savedAddress)
      .where(
        and(eq(savedAddress.id, id), eq(savedAddress.userId, session.user.id))
      );

    await db.insert(activityLog).values({
      id: crypto.randomUUID(),
      userId: session.user.id,
      action: "address_deleted",
      details: `Deleted address: ${address.formattedAddress}`,
      metadata: JSON.stringify({ addressId: id }),
    });

    return NextResponse.json({ message: "Address deleted successfully" });
  } catch (error) {
    console.error("Failed to delete address:", error);
    return NextResponse.json(
      { error: "Failed to delete address" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const [address] = await db
      .select()
      .from(savedAddress)
      .where(
        and(eq(savedAddress.id, id), eq(savedAddress.userId, session.user.id))
      );

    if (!address) {
      return NextResponse.json(
        { error: "Address not found" },
        { status: 404 }
      );
    }

    const [updatedAddress] = await db
      .update(savedAddress)
      .set({
        label: body.label,
        updatedAt: new Date(),
      })
      .where(
        and(eq(savedAddress.id, id), eq(savedAddress.userId, session.user.id))
      )
      .returning();

    await db.insert(activityLog).values({
      id: crypto.randomUUID(),
      userId: session.user.id,
      action: "address_updated",
      details: `Updated address label: ${body.label}`,
      metadata: JSON.stringify({ addressId: id }),
    });

    return NextResponse.json({
      address: updatedAddress,
      message: "Address updated successfully",
    });
  } catch (error) {
    console.error("Failed to update address:", error);
    return NextResponse.json(
      { error: "Failed to update address" },
      { status: 500 }
    );
  }
}
