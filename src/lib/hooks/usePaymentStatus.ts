"use client";

import { useState, useEffect } from "react";

interface PaymentStatus {
  /** Whether payment data is loading */
  isLoading: boolean;
  /** Whether the prenup has been purchased */
  hasPrenup: boolean;
  /** Whether attorney review has been purchased */
  hasAttorney: boolean;
  /** Whether notarization has been purchased */
  hasNotarization: boolean;
  /** Whether any payment has been completed */
  hasPaid: boolean;
}

/**
 * Hook to check if the current couple has completed payment.
 * Used to gate premium features (unlock questionnaire sections, document generation, etc.)
 */
export function usePaymentStatus(): PaymentStatus {
  const [status, setStatus] = useState<PaymentStatus>({
    isLoading: true,
    hasPrenup: false,
    hasAttorney: false,
    hasNotarization: false,
    hasPaid: false,
  });

  useEffect(() => {
    let cancelled = false;

    async function check() {
      try {
        const res = await fetch("/api/payments/status");
        if (res.ok) {
          const data = await res.json();
          if (!cancelled) {
            setStatus({
              isLoading: false,
              hasPrenup: data.hasPrenup ?? false,
              hasAttorney: data.hasAttorney ?? false,
              hasNotarization: data.hasNotarization ?? false,
              hasPaid: data.hasPrenup || data.hasAttorney || data.hasNotarization,
            });
          }
        } else {
          if (!cancelled) setStatus((prev) => ({ ...prev, isLoading: false }));
        }
      } catch {
        if (!cancelled) setStatus((prev) => ({ ...prev, isLoading: false }));
      }
    }

    check();
    return () => { cancelled = true; };
  }, []);

  return status;
}
