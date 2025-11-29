import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { activityLog } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

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

    const activities = await db
      .select()
      .from(activityLog)
      .where(eq(activityLog.userId, session.user.id))
      .orderBy(desc(activityLog.createdAt))
      .limit(50);

    return NextResponse.json({ activities });
  } catch (error) {
    console.error("Failed to fetch activity log:", error);
    return NextResponse.json(
      { error: "Failed to fetch activity log" },
      { status: 500 }
    );
  }
}
