"use client";

import { useState, useEffect, useCallback } from "react";
import type { ConflictItem } from "@/lib/types/collaboration";

interface CollaborationStatus {
  conflicts: ConflictItem[];
  bothComplete: boolean;
  totalConflicts: number;
  unresolvedCount: number;
  resolvedCount: number;
  allResolved: boolean;
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  resolveConflict: (conflictId: string, resolvedAnswer: unknown) => Promise<boolean>;
}

/**
 * Fetches conflict data and provides a method to resolve conflicts.
 */
export function useCollaborationStatus(): CollaborationStatus {
  const [conflicts, setConflicts] = useState<ConflictItem[]>([]);
  const [bothComplete, setBothComplete] = useState(false);
  const [totalConflicts, setTotalConflicts] = useState(0);
  const [unresolvedCount, setUnresolvedCount] = useState(0);
  const [resolvedCount, setResolvedCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchConflicts = useCallback(async () => {
    try {
      // POST first to sync/upsert conflicts from current answers
      await fetch("/api/collaboration/conflicts", { method: "POST" });

      // Then GET the read-only view with fresh data
      const res = await fetch("/api/collaboration/conflicts");
      if (res.ok) {
        const data = await res.json();
        setConflicts(data.conflicts ?? []);
        setBothComplete(data.bothComplete ?? false);
        setTotalConflicts(data.totalConflicts ?? 0);
        setUnresolvedCount(data.unresolvedCount ?? 0);
        setResolvedCount(data.resolvedCount ?? 0);
        setError(null);
      } else if (res.status === 404) {
        // No couple/partner yet — not an error
        setConflicts([]);
        setBothComplete(false);
      } else {
        setError("Failed to load conflicts");
      }
    } catch {
      setError("Network error");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchConflicts();
  }, [fetchConflicts]);

  const resolveConflict = useCallback(
    async (conflictId: string, resolvedAnswer: unknown): Promise<boolean> => {
      try {
        const res = await fetch(
          `/api/collaboration/conflicts/${conflictId}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ resolvedAnswer }),
          }
        );

        if (res.ok) {
          // Optimistic update
          setConflicts((prev) =>
            prev.map((c) =>
              c.id === conflictId
                ? { ...c, resolvedAnswer, status: "resolved" as const }
                : c
            )
          );
          setUnresolvedCount((prev) => Math.max(0, prev - 1));
          setResolvedCount((prev) => prev + 1);
          return true;
        }
        return false;
      } catch {
        return false;
      }
    },
    []
  );

  return {
    conflicts,
    bothComplete,
    totalConflicts,
    unresolvedCount,
    resolvedCount,
    allResolved: totalConflicts > 0 && unresolvedCount === 0,
    isLoading,
    error,
    refresh: fetchConflicts,
    resolveConflict,
  };
}
