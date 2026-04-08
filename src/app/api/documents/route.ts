// =============================================================================
// GET /api/documents
// List all generated documents for the current user's couple.
// =============================================================================

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { users, documents } from "@/lib/db/schema";
import { eq, and, desc, isNull } from "drizzle-orm";
import { NextResponse } from "next/server";

async function getUser(clerkId: string) {
  const [user] = await db
    .select()
    .from(users)
    .where(and(eq(users.clerkId, clerkId), isNull(users.deletedAt)))
    .limit(1);
  return user ?? null;
}

export async function GET() {
  const { userId: clerkId } = await auth();
  if (!clerkId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await getUser(clerkId);
  if (!user || !user.coupleId) {
    return NextResponse.json({ documents: [] });
  }

  const docs = await db
    .select({
      id: documents.id,
      type: documents.type,
      version: documents.version,
      generatedAt: documents.generatedAt,
    })
    .from(documents)
    .where(eq(documents.coupleId, user.coupleId))
    .orderBy(desc(documents.generatedAt));

  return NextResponse.json({ documents: docs });
}
