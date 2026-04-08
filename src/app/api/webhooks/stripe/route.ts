import { getStripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { payments, couples, users } from "@/lib/db/schema";
import { eq, and, isNull } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getResend, FROM_EMAIL } from "@/lib/email";
import PaymentReceiptEmail from "@/emails/payment-receipt";
import { PRODUCTS, type ProductType } from "@/lib/stripe";

/**
 * POST /api/webhooks/stripe
 * Handles Stripe webhook events (payment success, failure, refund).
 */
export async function POST(req: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 });
  }

  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const stripe = getStripe();
  let event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;

      // Only mark as completed if payment is actually received
      // (handles delayed payment methods like bank transfers)
      if (session.payment_status !== "paid") {
        // Payment not yet received — will get async_payment_succeeded later
        break;
      }

      // Update payment status
      if (session.id) {
        await db
          .update(payments)
          .set({ status: "completed", updatedAt: new Date() })
          .where(eq(payments.stripeSessionId, session.id));
      }

      // If this is the prenup payment, advance couple status
      const productType = session.metadata?.productType;
      const coupleId = session.metadata?.coupleId;

      if (productType === "prenup" && coupleId) {
        await db
          .update(couples)
          .set({ status: "questionnaire", updatedAt: new Date() })
          .where(eq(couples.id, coupleId));
      }

      // Send receipt email
      if (coupleId && productType) {
        try {
          const userId = session.metadata?.userId;
          if (userId) {
            const [user] = await db
              .select()
              .from(users)
              .where(and(eq(users.id, userId), isNull(users.deletedAt)))
              .limit(1);

            if (user?.email) {
              const product = PRODUCTS[productType as ProductType];
              const resend = getResend();
              const userName = [user.firstName, user.lastName].filter(Boolean).join(" ") || "Customer";
              // Use actual Stripe charge amount (handles coupons/promotions correctly)
              const actualAmountCents = session.amount_total ?? product?.priceInCents ?? 0;
              await resend.emails.send({
                from: FROM_EMAIL,
                to: user.email,
                subject: "Your OurPrenup Receipt",
                react: PaymentReceiptEmail({
                  userName,
                  productName: product?.name || productType,
                  amountFormatted: `$${(actualAmountCents / 100).toFixed(2)}`,
                  date: new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }),
                }),
              });
            }
          }
        } catch (emailErr) {
          // Don't fail the webhook if email fails — payment is already recorded
          console.error("Failed to send receipt email:", emailErr);
        }
      }

      break;
    }

    case "checkout.session.async_payment_succeeded": {
      // Delayed payment method has now been received
      const session = event.data.object;
      if (session.id) {
        await db
          .update(payments)
          .set({ status: "completed", updatedAt: new Date() })
          .where(eq(payments.stripeSessionId, session.id));
      }

      const productType = session.metadata?.productType;
      const coupleId = session.metadata?.coupleId;

      if (productType === "prenup" && coupleId) {
        await db
          .update(couples)
          .set({ status: "questionnaire", updatedAt: new Date() })
          .where(eq(couples.id, coupleId));
      }
      break;
    }

    case "checkout.session.async_payment_failed": {
      const session = event.data.object;
      if (session.id) {
        await db
          .update(payments)
          .set({ status: "failed", updatedAt: new Date() })
          .where(eq(payments.stripeSessionId, session.id));
      }
      break;
    }

    case "charge.refunded": {
      const charge = event.data.object;
      const paymentIntentId = charge.payment_intent;

      if (paymentIntentId && typeof paymentIntentId === "string") {
        // Find the checkout session for this payment intent
        const sessions = await stripe.checkout.sessions.list({
          payment_intent: paymentIntentId,
          limit: 1,
        });

        if (sessions.data.length > 0) {
          await db
            .update(payments)
            .set({ status: "refunded", updatedAt: new Date() })
            .where(eq(payments.stripeSessionId, sessions.data[0].id));
        }
      }

      break;
    }
  }

  return NextResponse.json({ received: true });
}
