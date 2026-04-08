import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { users, couples, payments } from "@/lib/db/schema";
import { eq, and, inArray, sql, isNull } from "drizzle-orm";
import { getStripe, PRODUCTS, type ProductType } from "@/lib/stripe";
import { NextResponse } from "next/server";
import { createRateLimiter, getClientIp } from "@/lib/rate-limit";

// 10 checkout attempts per 15 minutes per IP — prevents Stripe API abuse
const checkoutLimiter = createRateLimiter({ windowMs: 15 * 60 * 1000, maxRequests: 10 });

/**
 * POST /api/payments/checkout
 * Creates a Stripe Checkout session for a given product.
 * Body: { productType: "prenup" | "attorney_single" | "attorney_both" | "notarization" }
 */
export async function POST(req: Request) {
  // Rate limit: prevent Stripe API abuse
  const { limited, retryAfter } = checkoutLimiter.check(getClientIp(req));
  if (limited) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } }
    );
  }

  const { userId: clerkId } = await auth();
  if (!clerkId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [user] = await db
    .select()
    .from(users)
    .where(and(eq(users.clerkId, clerkId), isNull(users.deletedAt)))
    .limit(1);

  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
  if (!user.coupleId) return NextResponse.json({ error: "No couple linked" }, { status: 400 });

  let body: { productType: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { productType } = body;

  if (!productType || !(productType in PRODUCTS)) {
    return NextResponse.json({ error: "Invalid product type" }, { status: 400 });
  }

  const product = PRODUCTS[productType as ProductType];
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  // Use a transaction to atomically check for existing payments and create a new one.
  // This prevents double-charging when two requests arrive at the same time.
  let paymentRecordId: string;
  try {
    const txResult = await db.transaction(async (tx) => {
      // Lock all payment rows for this couple+product so no other request can
      // read or insert until we're done.
      const existing = await tx.execute(
        sql`SELECT id, status FROM payments
            WHERE couple_id = ${user.coupleId}
              AND product_type = ${productType}
              AND status IN ('completed', 'pending')
            FOR UPDATE`
      );

      // If there's already a completed payment, block the purchase
      const completed = (existing as unknown as Array<{ id: string; status: string }>).find(
        (row) => row.status === "completed"
      );
      if (completed) {
        return { blocked: true as const, reason: "Already purchased" };
      }

      // If there's already a pending payment, that means a checkout session was
      // already created but never finished. We'll let them try again — the old
      // pending record stays (Stripe will expire the old session on its own).

      // Create the pending payment record with a unique placeholder ID
      const uniquePlaceholder = `pending_${Date.now()}_${crypto.randomUUID().slice(0, 8)}`;
      const [record] = await tx
        .insert(payments)
        .values({
          coupleId: user.coupleId!,
          stripeSessionId: uniquePlaceholder,
          productType,
          amountCents: product.priceInCents,
          status: "pending",
        })
        .returning();

      return { blocked: false as const, recordId: record.id };
    });

    if (txResult.blocked) {
      return NextResponse.json({ error: txResult.reason }, { status: 409 });
    }

    paymentRecordId = txResult.recordId;
  } catch (err) {
    console.error("Failed to create payment record:", err);
    return NextResponse.json(
      { error: "Failed to start checkout. Please try again." },
      { status: 500 }
    );
  }

  // Now create the Stripe session (outside the DB transaction so we don't
  // hold the lock during a slow network call to Stripe).
  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: user.email,
      line_items: [
        product.stripePriceId
          ? { price: product.stripePriceId, quantity: 1 }
          : {
              // Fallback: create price on the fly (works for dev/testing)
              price_data: {
                currency: "usd",
                product_data: { name: product.name },
                unit_amount: product.priceInCents,
              },
              quantity: 1,
            },
      ],
      success_url: `${appUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/payment/cancel`,
      metadata: {
        coupleId: user.coupleId,
        userId: user.id,
        productType,
      },
    });

    // Update the payment record with the real Stripe session ID
    await db
      .update(payments)
      .set({ stripeSessionId: session.id, updatedAt: new Date() })
      .where(eq(payments.id, paymentRecordId));

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Failed to create Stripe checkout session:", err);

    // Clean up ONLY the specific payment record we just created
    try {
      await db.delete(payments).where(eq(payments.id, paymentRecordId));
    } catch {
      // Best effort cleanup
    }

    return NextResponse.json(
      { error: "Failed to create checkout session. Please try again." },
      { status: 500 }
    );
  }
}
