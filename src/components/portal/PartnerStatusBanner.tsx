"use client";

import { usePartnerProgress } from "@/lib/hooks/usePartnerProgress";
import {
  CheckCircle2,
  Clock,
  UserX,
  Loader2,
} from "lucide-react";

const ALL_STEPS = [
  { id: "introduction", label: "Introduction" },
  { id: "property", label: "Property" },
  { id: "debts", label: "Debts" },
  { id: "financial", label: "Financial" },
  { id: "spousal-support", label: "Spousal Support" },
  { id: "legal-representation", label: "Legal Rep." },
  { id: "optional-clauses", label: "Optional Clauses" },
  { id: "additional-documents", label: "Additional Docs" },
];

export default function PartnerStatusBanner() {
  const { completedSteps, isLoading } = usePartnerProgress();

  if (isLoading) {
    return (
      <div className="rounded-[12px] bg-navy/5 border border-navy/10 p-4">
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <Loader2 className="w-4 h-4 animate-spin" />
          Loading partner status...
        </div>
      </div>
    );
  }

  if (completedSteps.length === 0) {
    return (
      <div className="rounded-[12px] bg-amber-50 border border-amber-200 p-4">
        <div className="flex items-center gap-2">
          <UserX className="w-4 h-4 text-amber-600 shrink-0" />
          <p className="text-sm text-amber-800">
            Your partner hasn&apos;t started the questionnaire yet.
          </p>
        </div>
      </div>
    );
  }

  const completedCount = completedSteps.length;
  const totalSteps = ALL_STEPS.length;
  const allDone = completedCount >= totalSteps;

  return (
    <div
      className={`rounded-[12px] border p-4 ${
        allDone
          ? "bg-green-50 border-green-200"
          : "bg-blue-50 border-blue-200"
      }`}
    >
      <div className="flex items-center gap-2 mb-3">
        {allDone ? (
          <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
        ) : (
          <Clock className="w-4 h-4 text-blue-600 shrink-0" />
        )}
        <p
          className={`text-sm font-medium ${
            allDone ? "text-green-800" : "text-blue-800"
          }`}
        >
          {allDone
            ? "Your partner has completed the questionnaire!"
            : `Your partner has completed ${completedCount} of ${totalSteps} steps`}
        </p>
      </div>

      {/* Step progress dots */}
      <div className="flex gap-1.5">
        {ALL_STEPS.map((step) => {
          const done = completedSteps.includes(step.id);
          return (
            <div
              key={step.id}
              title={`${step.label}: ${done ? "Complete" : "Not started"}`}
              className={`h-2 flex-1 rounded-full transition-colors ${
                done
                  ? allDone
                    ? "bg-green-400"
                    : "bg-blue-400"
                  : "bg-gray-200"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
