import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { users, financialDisclosures } from "@/lib/db/schema";
import { eq, and, isNull } from "drizzle-orm";
import { NextResponse } from "next/server";

async function getUser(clerkId: string) {
  const [user] = await db
    .select()
    .from(users)
    .where(and(eq(users.clerkId, clerkId), isNull(users.deletedAt)))
    .limit(1);
  return user ?? null;
}

/**
 * GET /api/financial-disclosure
 * Load saved financial disclosure data.
 */
export async function GET() {
  const { userId: clerkId } = await auth();
  if (!clerkId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await getUser(clerkId);
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  if (!user.coupleId) {
    return NextResponse.json({ data: {}, completedAt: null });
  }

  const [row] = await db
    .select()
    .from(financialDisclosures)
    .where(
      and(
        eq(financialDisclosures.userId, user.id),
        eq(financialDisclosures.coupleId, user.coupleId)
      )
    )
    .limit(1);

  return NextResponse.json({
    data: row?.data ?? {},
    completedAt: row?.completedAt ?? null,
  });
}

/**
 * PUT /api/financial-disclosure
 * Save (upsert) financial disclosure data.
 */
export async function PUT(req: Request) {
  const { userId: clerkId } = await auth();
  if (!clerkId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await getUser(clerkId);
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
  if (!user.coupleId) return NextResponse.json({ error: "No couple linked" }, { status: 400 });

  const { data } = await req.json();

  await db
    .insert(financialDisclosures)
    .values({
      userId: user.id,
      coupleId: user.coupleId,
      data,
    })
    .onConflictDoUpdate({
      target: [financialDisclosures.userId, financialDisclosures.coupleId],
      set: {
        data,
        updatedAt: new Date(),
      },
    });

  return NextResponse.json({ success: true });
}
