import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/db/drizzle";
import { apiKey } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const createApiKeySchema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name too long"),
});

async function getSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session;
}

function generateApiKey(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let key = "zd_";
  for (let i = 0; i < 32; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return key;
}

// GET - List all API keys for user
export async function GET() {
  try {
    const session = await getSession();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const keys = await db
      .select({
        id: apiKey.id,
        name: apiKey.name,
        keyPrefix: apiKey.keyPrefix,
        requestCount: apiKey.requestCount,
        lastUsedAt: apiKey.lastUsedAt,
        createdAt: apiKey.createdAt,
      })
      .from(apiKey)
      .where(eq(apiKey.userId, session.user.id))
      .orderBy(apiKey.createdAt);

    return NextResponse.json({ keys });
  } catch (error) {
    console.error("Failed to fetch API keys:", error);
    return NextResponse.json(
      { error: "Failed to fetch API keys" },
      { status: 500 }
    );
  }
}

// POST - Create new API key
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = createApiKeySchema.parse(body);

    // Check if user already has 5 API keys
    const existingKeys = await db
      .select()
      .from(apiKey)
      .where(eq(apiKey.userId, session.user.id));

    if (existingKeys.length >= 5) {
      return NextResponse.json(
        { error: "Maximum of 5 API keys allowed" },
        { status: 400 }
      );
    }

    const key = generateApiKey();
    const id = crypto.randomUUID();

    const [newKey] = await db
      .insert(apiKey)
      .values({
        id,
        userId: session.user.id,
        name: validatedData.name,
        key,
        keyPrefix: key.substring(0, 10) + "...",
      })
      .returning();

    // Return full key only on creation
    return NextResponse.json(
      {
        apiKey: {
          id: newKey.id,
          name: newKey.name,
          key, // Full key only shown once
          keyPrefix: newKey.keyPrefix,
          createdAt: newKey.createdAt,
        },
        message: "API key created successfully. Save this key - it won't be shown again.",
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues?.[0]?.message ?? "Invalid input" },
        { status: 400 }
      );
    }

    console.error("Failed to create API key:", error);
    return NextResponse.json(
      { error: "Failed to create API key" },
      { status: 500 }
    );
  }
}

