import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { apiKey } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

async function getSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session;
}

// DELETE - Delete an API key
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

    // Verify the key belongs to the user
    const [existingKey] = await db
      .select()
      .from(apiKey)
      .where(and(eq(apiKey.id, id), eq(apiKey.userId, session.user.id)));

    if (!existingKey) {
      return NextResponse.json({ error: "API key not found" }, { status: 404 });
    }

    await db
      .delete(apiKey)
      .where(and(eq(apiKey.id, id), eq(apiKey.userId, session.user.id)));

    return NextResponse.json({ message: "API key deleted successfully" });
  } catch (error) {
    console.error("Failed to delete API key:", error);
    return NextResponse.json(
      { error: "Failed to delete API key" },
      { status: 500 }
    );
  }
}

