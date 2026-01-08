import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/db/drizzle";
import { userPreferences } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const updatePreferencesSchema = z.object({
  emailNotifications: z.boolean().optional(),
  defaultCountry: z.string().min(2).max(2).optional(),
});

async function getSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session;
}

export async function GET() {
  try {
    const session = await getSession();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [preferences] = await db
      .select()
      .from(userPreferences)
      .where(eq(userPreferences.userId, session.user.id));

    if (!preferences) {
      // Return default preferences if none exist
      return NextResponse.json({
        preferences: {
          emailNotifications: true,
          defaultCountry: "US",
        },
      });
    }

    return NextResponse.json({
      preferences: {
        emailNotifications: preferences.emailNotifications,
        defaultCountry: preferences.defaultCountry,
      },
    });
  } catch (error) {
    console.error("Failed to fetch preferences:", error);
    return NextResponse.json(
      { error: "Failed to fetch preferences" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = updatePreferencesSchema.parse(body);

    // Check if preferences exist
    const [existingPreferences] = await db
      .select()
      .from(userPreferences)
      .where(eq(userPreferences.userId, session.user.id));

    let preferences;

    if (existingPreferences) {
      // Update existing preferences
      [preferences] = await db
        .update(userPreferences)
        .set(validatedData)
        .where(eq(userPreferences.userId, session.user.id))
        .returning();
    } else {
      // Create new preferences
      [preferences] = await db
        .insert(userPreferences)
        .values({
          id: crypto.randomUUID(),
          userId: session.user.id,
          emailNotifications: validatedData.emailNotifications ?? true,
          defaultCountry: validatedData.defaultCountry ?? "US",
        })
        .returning();
    }

    return NextResponse.json({
      preferences: {
        emailNotifications: preferences.emailNotifications,
        defaultCountry: preferences.defaultCountry,
      },
      message: "Preferences updated successfully",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues?.[0]?.message ?? "Invalid input" },
        { status: 400 }
      );
    }

    console.error("Failed to update preferences:", error);
    return NextResponse.json(
      { error: "Failed to update preferences" },
      { status: 500 }
    );
  }
}

