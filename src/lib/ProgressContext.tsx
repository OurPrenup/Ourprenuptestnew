"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
  type ReactNode,
} from "react";
import {
  computeStepStatuses,
  computeProgressPercentage,
  isQuestionnaireComplete,
  type StepProgress,
} from "./progress";

interface ProgressContextValue {
  /** Set of completed step IDs */
  completedSteps: Set<string>;
  /** Computed status for each dashboard step */
  stepStatuses: StepProgress[];
  /** Overall percentage */
  percentage: number;
  /** Mark a step as completed */
  completeStep: (stepId: string) => void;
  /** Reset a step to incomplete */
  uncompleteStep: (stepId: string) => void;
  /** Check if a specific step is completed */
  isCompleted: (stepId: string) => boolean;
  /** Get the currently active step ID */
  activeStepId: string | null;
  /** Whether progress is still loading from the API */
  isLoading: boolean;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

function getSessionSteps(): Set<string> {
  if (typeof window === "undefined") return new Set();
  const stored = sessionStorage.getItem("ourprenup_completed_steps");
  if (stored) {
    try {
      return new Set(JSON.parse(stored) as string[]);
    } catch {
      // fall through
    }
  }
  return new Set();
}

function persistToSession(steps: Set<string>) {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("ourprenup_completed_steps", JSON.stringify([...steps]));
  }
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(getSessionSteps);
  const [isLoading, setIsLoading] = useState(true);
  const lastSyncedRef = useRef<string>(""); // JSON of last successfully synced steps

  // Persist to API
  const persistToApi = useCallback(async (steps: Set<string>) => {
    const stepsJson = JSON.stringify([...steps].sort());

    // Skip if nothing changed since last sync
    if (stepsJson === lastSyncedRef.current) return;

    try {
      const res = await fetch("/api/progress", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completedSteps: [...steps] }),
      });
      if (res.ok) {
        lastSyncedRef.current = stepsJson;
      } else {
        console.warn("Failed to save progress to API:", res.status);
      }
    } catch (err) {
      console.warn("Failed to save progress to API:", err);
    }
  }, []);

  // Hydrate from API on mount — merge with local (union of both)
  useEffect(() => {
    let cancelled = false;

    async function hydrate() {
      try {
        const res = await fetch("/api/progress");
        if (res.ok) {
          const { completedSteps: apiSteps } = await res.json();
          if (!cancelled && Array.isArray(apiSteps)) {
            setCompletedSteps(() => {
              // API is the source of truth after hydration.
              // Local-only steps (added offline) are kept if not in API,
              // but API removals are respected.
              const apiSet = new Set<string>(apiSteps);
              persistToSession(apiSet);
              return apiSet;
            });
          }
        }
      } catch {
        // Fall back to sessionStorage (already loaded)
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    hydrate();
    return () => { cancelled = true; };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Persist to sessionStorage and API whenever completedSteps changes.
  // Skip during the initial hydration (isLoading === true) to avoid
  // re-persisting data we just loaded from the API.
  const hasHydratedRef = useRef(false);
  useEffect(() => {
    if (isLoading) return; // Still loading from API — don't persist yet
    if (!hasHydratedRef.current) {
      // First render after hydration — mark as hydrated but don't persist
      // (the API already has this data, or hydrate() just merged it)
      hasHydratedRef.current = true;
      return;
    }
    persistToSession(completedSteps);
    persistToApi(completedSteps);
  }, [completedSteps, isLoading, persistToApi]);

  // Memoize computed values to prevent unnecessary re-renders
  const stepStatuses = useMemo(() => computeStepStatuses(completedSteps), [completedSteps]);
  const percentage = useMemo(() => computeProgressPercentage(completedSteps), [completedSteps]);

  const completeStep = useCallback((stepId: string) => {
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      next.add(stepId);
      if (isQuestionnaireComplete(next)) {
        next.add("questionnaire");
      }
      return next;
    });
  }, []);

  const uncompleteStep = useCallback((stepId: string) => {
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      next.delete(stepId);
      return next;
    });
  }, []);

  const isCompleted = useCallback(
    (stepId: string) => completedSteps.has(stepId),
    [completedSteps]
  );

  const activeStepId =
    stepStatuses.find((s) => s.status === "active")?.id ?? null;

  return (
    <ProgressContext.Provider
      value={{
        completedSteps,
        stepStatuses,
        percentage,
        completeStep,
        uncompleteStep,
        isCompleted,
        activeStepId,
        isLoading,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return ctx;
}
