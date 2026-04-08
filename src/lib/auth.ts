import { auth } from "@clerk/nextjs/server";
import { db } from "./db";
import { users } from "./db/schema";
import { eq, and, isNull } from "drizzle-orm";

/**
 * Custom error class for authentication/authorization failures.
 * Includes an HTTP status code so catch blocks can build proper responses.
 *
 * Usage:
 *   try { const user = await requireUser(); }
 *   catch (err) {
 *     if (err instanceof AuthError) {
 *       return NextResponse.json({ error: err.message }, { status: err.status });
 *     }
 *     throw err;
 *   }
 */
export class AuthError extends Error {
  public readonly status: number;

  constructor(message: string, status: number = 401) {
    super(message);
    this.name = "AuthError";
    this.status = status;
  }
}

/**
 * Get the current authenticated user's DB record.
 * Returns null if not authenticated or user not yet synced.
 */
export async function getCurrentUser() {
  const { userId: clerkId } = await auth();
  if (!clerkId) return null;

  const [user] = await db
    .select()
    .from(users)
    .where(and(eq(users.clerkId, clerkId), isNull(users.deletedAt)))
    .limit(1);

  return user ?? null;
}

/**
 * Get the current user or throw an AuthError (status 401).
 * Use in API routes that require authentication.
 */
export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) {
    throw new AuthError("Unauthorized", 401);
  }
  return user;
}
