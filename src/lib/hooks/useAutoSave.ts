"use client";

import { useEffect, useRef, useCallback, useState } from "react";

interface UseAutoSaveOptions {
  /** API endpoint to PUT data to */
  endpoint: string;
  /** Data to auto-save */
  data: Record<string, unknown>;
  /** The JSON body key to wrap data in (default: "answers") */
  bodyKey?: string;
  /** Debounce delay in milliseconds (default: 1500) */
  delay?: number;
  /** Whether auto-save is enabled (default: true) */
  enabled?: boolean;
}

interface UseAutoSaveReturn {
  /** Whether a save is currently in flight */
  isSaving: boolean;
  /** Last save error, if any */
  error: string | null;
  /** Timestamp of last successful save */
  lastSavedAt: Date | null;
  /** Manually trigger a save */
  saveNow: () => Promise<void>;
}

/**
 * Debounced auto-save hook for questionnaire pages.
 * Saves data to the given API endpoint whenever `data` changes.
 */
export function useAutoSave({
  endpoint,
  data,
  bodyKey = "answers",
  delay = 1500,
  enabled = true,
}: UseAutoSaveOptions): UseAutoSaveReturn {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dataRef = useRef(data);
  const initialLoadRef = useRef(true);

  // Keep dataRef in sync
  dataRef.current = data;

  const save = useCallback(async (options?: { rethrow?: boolean }) => {
    setIsSaving(true);
    setError(null);
    try {
      const res = await fetch(endpoint, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [bodyKey]: dataRef.current }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Save failed (${res.status})`);
      }
      setLastSavedAt(new Date());
    } catch (err) {
      const message = err instanceof Error ? err.message : "Save failed";
      setError(message);
      if (options?.rethrow) throw err;
    } finally {
      setIsSaving(false);
    }
  }, [endpoint, bodyKey]);

  /** Manual save that throws on failure */
  const saveNow = useCallback(() => save({ rethrow: true }), [save]);

  const saveRef = useRef(save);
  saveRef.current = save;

  // Debounced auto-save on data change
  useEffect(() => {
    if (!enabled) return;

    // Skip the initial mount (data loaded from API)
    if (initialLoadRef.current) {
      initialLoadRef.current = false;
      return;
    }

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(save, delay);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [data, delay, enabled, save]);

  // Flush pending save on actual unmount only
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
        saveRef.current();
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { isSaving, error, lastSavedAt, saveNow };
}
