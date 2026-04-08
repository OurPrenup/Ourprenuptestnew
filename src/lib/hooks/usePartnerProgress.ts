"use client";

import { useState, useEffect, useCallback } from "react";

interface PartnerProgress {
  completedSteps: string[];
  isLoading: boolean;
  error: string | null;
  refresh: () => void;
}

/**
 * Polls the partner's progress at a regular interval.
 * In a future phase, this could use Supabase Realtime for instant updates.
 * For now, polling every 30 seconds is good enough and avoids adding
 * a Supabase client-side dependency.
 */
export function usePartnerProgress(pollInterval = 30000): PartnerProgress {
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProgress = useCallback(async () => {
    try {
      const res = await fetch("/api/collaboration/partner-progress");
      if (res.ok) {
        const data = await res.json();
        setCompletedSteps(data.completedSteps ?? []);
        setError(null);
      } else if (res.status !== 404) {
        setError("Failed to load partner progress");
      }
    } catch {
      setError("Network error");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProgress();
    const interval = setInterval(fetchProgress, pollInterval);
    return () => clearInterval(interval);
  }, [fetchProgress, pollInterval]);

  return { completedSteps, isLoading, error, refresh: fetchProgress };
}
