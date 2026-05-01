"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface UseQuestionnaireStepOptions {
  stepId: string;
  /** Debounce delay in ms (default: 1500) */
  saveDelay?: number;
}

interface UseQuestionnaireStepReturn {
  answers: Record<string, string | string[]>;
  setAnswers: React.Dispatch<React.SetStateAction<Record<string, string | string[]>>>;
  updateAnswer: (id: string, value: string | string[]) => void;
  /** Whether initial data is loading from the API */
  isLoading: boolean;
  /** Whether a save is in progress */
  isSaving: boolean;
  /** Last save error */
  saveError: string | null;
  /** Manually trigger a save (useful before navigation) */
  saveNow: () => Promise<void>;
}

/**
 * Hook for questionnaire pages that handles:
 * - Loading saved answers from GET /api/questionnaire/[stepId]
 * - Auto-saving changes to PUT /api/questionnaire/[stepId] (debounced)
 * - Also persists to sessionStorage for offline fallback
 */
export function useQuestionnaireStep({
  stepId,
  saveDelay = 1500,
}: UseQuestionnaireStepOptions): UseQuestionnaireStepReturn {
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const answersRef = useRef(answers);
  const hasLoadedRef = useRef(false);
  const changeCountRef = useRef(0);

  answersRef.current = answers;

  // Load from API on mount (or when stepId changes)
  useEffect(() => {
    let cancelled = false;

    // Reset change counter when step changes so auto-save skips the initial load
    changeCountRef.current = 0;
    hasLoadedRef.current = false;

    async function load() {
      // First try sessionStorage for instant display
      const sessionKey = `ourprenup_answers_${stepId}`;
      const cached = sessionStorage.getItem(sessionKey);
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (!cancelled) setAnswers(parsed);
        } catch {
          // ignore
        }
      }

      // Then hydrate from API
      try {
        const res = await fetch(`/api/questionnaire/${stepId}`);
        if (res.ok) {
          const { answers: apiAnswers } = await res.json();
          if (!cancelled && apiAnswers && Object.keys(apiAnswers).length > 0) {
            setAnswers(apiAnswers as Record<string, string | string[]>);
            sessionStorage.setItem(sessionKey, JSON.stringify(apiAnswers));
          }
        }
      } catch {
        // Fall back to sessionStorage data already loaded
      } finally {
        if (!cancelled) {
          setIsLoading(false);
          hasLoadedRef.current = true;
        }
      }
    }

    load();
    return () => { cancelled = true; };
  }, [stepId]);

  // Save function
  // When called by auto-save (debounce timer), errors are caught and stored in saveError.
  // When called manually via saveNow(), the error is re-thrown so callers can handle it.
  const save = useCallback(async (options?: { rethrow?: boolean }) => {
    const data = answersRef.current;
    if (Object.keys(data).length === 0) return;

    setIsSaving(true);
    setSaveError(null);

    // Always save to sessionStorage
    try {
      const sessionKey = `ourprenup_answers_${stepId}`;
      sessionStorage.setItem(sessionKey, JSON.stringify(data));
    } catch {
      // sessionStorage may be unavailable (private browsing, quota exceeded)
    }

    // Save to API
    try {
      const res = await fetch(`/api/questionnaire/${stepId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: data }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Save failed (${res.status})`);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Save failed";
      setSaveError(message);
      if (options?.rethrow) throw err;
    } finally {
      setIsSaving(false);
    }
  }, [stepId]);

  /** Manual save that throws on failure (use in handleNext) */
  const saveNow = useCallback(() => save({ rethrow: true }), [save]);

  // Keep a stable ref to save so the unmount effect always calls the latest version
  const saveRef = useRef(save);
  saveRef.current = save;

  // Debounced auto-save on answer changes
  useEffect(() => {
    if (!hasLoadedRef.current) return;

    // Track changes to skip the initial set from loading
    changeCountRef.current++;
    if (changeCountRef.current <= 1) return;

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(save, saveDelay);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [answers, save, saveDelay]);

  // Flush any pending save on actual unmount only
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
        saveRef.current();
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const updateAnswer = useCallback((id: string, value: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }, []);

  return {
    answers,
    setAnswers,
    updateAnswer,
    isLoading,
    isSaving,
    saveError,
    saveNow,
  };
}
