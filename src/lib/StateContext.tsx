"use client";

import { createContext, useContext, useState, useMemo, useCallback, useEffect, ReactNode } from "react";
import { getStateRules, type StateRules } from "./state-rules";
import {
  getStateLegalConfig,
  isCommunityPropertyState,
  isSpousalSupportDisabled,
  requiresNotarization,
  requiresWitnesses,
  requiresAttorney,
  hasWaitingPeriod,
  getResearchDepth,
  isExcludedFromSelfService,
  isValidStateCode,
  type StateCode,
  type StateLegalConfig,
  type ResearchDepth,
} from "@/legal/engine";

interface StateContextValue {
  selectedState: string | null;
  setSelectedState: (code: string) => void;

  // Legacy interface (kept for backward compat)
  stateRules: StateRules | null;
  isCommunityProperty: boolean;
  spousalSupportWaivable: boolean;

  // New engine-powered fields
  legalConfig: StateLegalConfig | null;
  spousalSupportDisabled: boolean;
  requiresNotarization: boolean;
  requiresWitnesses: boolean;
  requiresAttorney: boolean;
  hasWaitingPeriod: boolean;
  researchDepth: ResearchDepth | null;
  isExcluded: boolean;

  /** Whether state is loading from API */
  isLoading: boolean;
}

const StateContext = createContext<StateContextValue | null>(null);

function getInitialState(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem("ourprenup_selected_state");
}

export function StateProvider({ children }: { children: ReactNode }) {
  const [selectedState, setSelectedStateRaw] = useState<string | null>(getInitialState);
  const [isLoading, setIsLoading] = useState(true);

  // Hydrate from couple record on mount
  useEffect(() => {
    let cancelled = false;

    async function hydrate() {
      try {
        // Read-only fetch of couple data (no side effects)
        const res = await fetch("/api/couples/me");
        if (res.ok) {
          const { couple } = await res.json();
          if (!cancelled && couple?.stateCode && !selectedState) {
            setSelectedStateRaw(couple.stateCode);
            sessionStorage.setItem("ourprenup_selected_state", couple.stateCode);
          }
        }
      } catch {
        // Fall back to sessionStorage
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    hydrate();
    return () => { cancelled = true; };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const setSelectedState = useCallback((code: string) => {
    setSelectedStateRaw(code);
    sessionStorage.setItem("ourprenup_selected_state", code);
  }, []);

  const value = useMemo(() => {
    // Legacy rules (backward compat)
    const rules = selectedState ? getStateRules(selectedState) : null;

    // New engine
    const validCode = selectedState && isValidStateCode(selectedState) ? selectedState : null;
    const legalConfig = validCode ? getStateLegalConfig(validCode) : null;

    return {
      selectedState,
      setSelectedState,

      // Legacy (values now derived from new engine where possible)
      stateRules: rules,
      isCommunityProperty: validCode ? isCommunityPropertyState(validCode) : false,
      spousalSupportWaivable: validCode ? !isSpousalSupportDisabled(validCode) : true,

      // New
      legalConfig,
      spousalSupportDisabled: validCode ? isSpousalSupportDisabled(validCode) : false,
      requiresNotarization: validCode ? requiresNotarization(validCode) : false,
      requiresWitnesses: validCode ? requiresWitnesses(validCode) : false,
      requiresAttorney: validCode ? requiresAttorney(validCode) : false,
      hasWaitingPeriod: validCode ? hasWaitingPeriod(validCode) : false,
      researchDepth: validCode ? getResearchDepth(validCode) : null,
      isExcluded: validCode ? isExcludedFromSelfService(validCode) : false,

      isLoading,
    };
  }, [selectedState, setSelectedState, isLoading]);

  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
}

export function useStateContext() {
  const ctx = useContext(StateContext);
  if (!ctx) {
    throw new Error("useStateContext must be used within a StateProvider");
  }
  return ctx;
}
