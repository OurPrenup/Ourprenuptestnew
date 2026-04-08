import { Webhook } from "svix";
import { headers } from "next/headers";
import { type WebhookEvent } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    throw new Error("Missing CLERK_WEBHOOK_SECRET env var");
  }

  // Verify the webhook signature
  const headerPayload = await headers();
  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response("Missing svix headers", { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);
  let event: WebhookEvent;

  try {
    event = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent;
  } catch {
    return new Response("Invalid signature", { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case "user.created": {
      const { id, email_addresses, first_name, last_name } = event.data;
      const primaryEmail = email_addresses[0]?.email_address;

      // If no email, return 400 so Clerk retries (email may arrive on a subsequent webhook)
      if (!primaryEmail) {
        console.warn(`Clerk user.created for ${id} has no email — returning 400 to retry`);
        return new Response("No email address found", { status: 400 });
      }

      try {
        await db.insert(users).values({
          clerkId: id,
          email: primaryEmail,
          firstName: first_name,
          lastName: last_name,
        });
      } catch (err) {
        // Handle duplicate clerkId (idempotency — webhook may fire twice)
        const message = err instanceof Error ? err.message : String(err);
        if (message.includes("duplicate") || message.includes("unique")) {
          console.warn(`Duplicate user.created for ${id}, ignoring`);
        } else {
          console.error("Failed to create user from webhook:", err);
          return new Response("Internal error", { status: 500 });
        }
      }
      break;
    }

    case "user.updated": {
      const { id, email_addresses, first_name, last_name } = event.data;
      const primaryEmail = email_addresses[0]?.email_address;

      const updated = await db
        .update(users)
        .set({
          email: primaryEmail ?? undefined,
          firstName: first_name,
          lastName: last_name,
          updatedAt: new Date(),
        })
        .where(eq(users.clerkId, id))
        .returning({ id: users.id });

      // If no rows were updated, the user doesn't exist yet (missed user.created webhook).
      // Create the user now so the update isn't silently lost.
      if (updated.length === 0) {
        if (!primaryEmail) {
          console.warn(`Clerk user.updated for ${id} has no email and user doesn't exist — returning 400 to retry`);
          return new Response("No email address found", { status: 400 });
        }
        console.warn(`user.updated for ${id} matched no rows — inserting user`);
        try {
          await db.insert(users).values({
            clerkId: id,
            email: primaryEmail,
            firstName: first_name,
            lastName: last_name,
          });
        } catch (err) {
          // Handle duplicate clerkId (two user.updated webhooks racing)
          const message = err instanceof Error ? err.message : String(err);
          if (message.includes("duplicate") || message.includes("unique")) {
            console.warn(`Duplicate fallback insert for ${id}, ignoring`);
          } else {
            console.error("Failed to insert user from user.updated fallback:", err);
            return new Response("Internal error", { status: 500 });
          }
        }
      }
      break;
    }

    case "user.deleted": {
      const { id } = event.data;
      if (id) {
        try {
          // Soft-delete: preserve the row so couple FK references stay valid
          await db
            .update(users)
            .set({ deletedAt: new Date(), updatedAt: new Date() })
            .where(eq(users.clerkId, id));
        } catch (err) {
          console.error(`Failed to soft-delete user ${id}:`, err);
          return new Response("Internal error", { status: 500 });
        }
      }
      break;
    }
  }

  return new Response("OK", { status: 200 });
}
