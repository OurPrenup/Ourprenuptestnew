import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { users, payments } from "@/lib/db/schema";
import { eq, and, isNull } from "drizzle-orm";
import { NextResponse } from "next/server";

/**
 * GET /api/payments/verify?session_id=xxx
 * Verify that a Stripe session belongs to the current user and return its status.
 */
export async function GET(req: Request) {
  const { userId: clerkId } = await auth();
  if (!clerkId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "session_id required" }, { status: 400 });
  }

  const [user] = await db
    .select()
    .from(users)
    .where(and(eq(users.clerkId, clerkId), isNull(users.deletedAt)))
    .limit(1);

  if (!user || !user.coupleId) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Find the payment by Stripe session ID and verify it belongs to this couple
  const [payment] = await db
    .select()
    .from(payments)
    .where(
      and(
        eq(payments.stripeSessionId, sessionId),
        eq(payments.coupleId, user.coupleId)
      )
    )
    .limit(1);

  if (!payment) {
    return NextResponse.json({ error: "Payment not found" }, { status: 404 });
  }

  return NextResponse.json({
    status: payment.status,
    productType: payment.productType,
  });
}
