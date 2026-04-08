"use client";

import { useStateContext } from "@/lib/StateContext";
import { MapPin, Scale, FileCheck, Users, Clock } from "lucide-react";

export default function QuestionnaireLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { stateRules, legalConfig } = useStateContext();

  return (
    <div>
      {stateRules && (
        <div className="mb-6 rounded-[8px] bg-navy/5 border border-navy/10 px-4 py-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-navy/60 shrink-0" />
            <span className="text-sm text-navy/70">
              Laws shown are based on{" "}
              <span className="font-semibold text-navy">
                {stateRules.stateName}
              </span>{" "}
              ({stateRules.propertyRegime === "community"
                ? "community property"
                : "equitable distribution"}{" "}
              state)
            </span>
          </div>

          {/* Compact state requirements summary */}
          {legalConfig && (
            <div className="flex items-center gap-4 mt-2 pt-2 border-t border-navy/10 flex-wrap">
              {legalConfig.execution.notarization === "required" && (
                <span className="inline-flex items-center gap-1 text-xs text-navy/60">
                  <FileCheck className="w-3.5 h-3.5" />
                  Notarization required
                </span>
              )}
              {legalConfig.execution.witnesses === "required" && (
                <span className="inline-flex items-center gap-1 text-xs text-navy/60">
                  <Users className="w-3.5 h-3.5" />
                  {legalConfig.execution.witnessCount} witness{(legalConfig.execution.witnessCount ?? 0) > 1 ? "es" : ""} required
                </span>
              )}
              {legalConfig.waitingPeriod.hasMandatoryPeriod && (
                <span className="inline-flex items-center gap-1 text-xs text-navy/60">
                  <Clock className="w-3.5 h-3.5" />
                  {legalConfig.waitingPeriod.daysRequired}-day waiting period
                </span>
              )}
              {(legalConfig.independentCounsel.requirement === "required" ||
                legalConfig.independentCounsel.requirement === "conditionally_required") && (
                <span className="inline-flex items-center gap-1 text-xs text-navy/60">
                  <Scale className="w-3.5 h-3.5" />
                  Attorney {legalConfig.independentCounsel.requirement === "required" ? "required" : "may be required"}
                </span>
              )}
            </div>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
