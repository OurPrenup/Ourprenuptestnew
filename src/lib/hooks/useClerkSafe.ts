"use client";

import { useClerk, useUser } from "@clerk/nextjs";

/**
 * Safe wrappers around Clerk hooks that return null/noop
 * when ClerkProvider isn't mounted (e.g., dev without credentials).
 */

export function useClerkSafe() {
  try {
    return useClerk();
  } catch {
    return { signOut: (_opts?: unknown) => Promise.resolve() } as ReturnType<typeof useClerk>;
  }
}

export function useUserSafe() {
  try {
    return useUser();
  } catch {
    return { user: null, isLoaded: true, isSignedIn: false } as ReturnType<typeof useUser>;
  }
}
