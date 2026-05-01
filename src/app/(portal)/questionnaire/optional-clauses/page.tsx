"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { optionalClausesQuestions } from "@/lib/questionnaire/optional-clauses";
import QuestionCard from "@/components/portal/QuestionCard";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import {
  ArrowRight,
  ArrowLeft,
  Lock,
  ChevronDown,
  ChevronUp,
  Scale,
  Building2,
  FileText,
  Shield,
  Heart,
  Sparkles,
} from "lucide-react";
import { useStateContext } from "@/lib/StateContext";
import StateCallout from "@/components/portal/StateCallout";
import { useProgress } from "@/lib/ProgressContext";
import { getStateOptionalClauses, type OptionalClause } from "@/legal/optional-clauses";
import type { StateCode } from "@/legal/types";
import { useQuestionnaireStep } from "@/lib/hooks/useQuestionnaireStep";
import SaveIndicator from "@/components/portal/SaveIndicator";
import QuestionnaireLoading from "@/components/portal/QuestionnaireLoading";
import { usePaymentStatus } from "@/lib/hooks/usePaymentStatus";
import { validateStep, type FieldErrors } from "@/lib/validation/questionnaire-schemas";

const CATEGORY_CONFIG: Record<
  OptionalClause["category"],
  { label: string; icon: typeof Scale; color: string }
> = {
  property: { label: "Property & Assets", icon: Building2, color: "text-navy" },
  support: { label: "Spousal Support", icon: Heart, color: "text-rose-600" },
  execution: { label: "Signing & Execution", icon: FileText, color: "text-amber-600" },
  protection: { label: "Legal Protections", icon: Shield, color: "text-teal" },
  estate: { label: "Estate & Probate", icon: Scale, color: "text-purple-600" },
  unique: { label: "State-Specific", icon: Sparkles, color: "text-indigo-600" },
};

export default function OptionalClausesPage() {
  const { answers, updateAnswer, isLoading, isSaving, saveError, saveNow } =
    useQuestionnaireStep({ stepId: "optional-clauses" });
  const { legalConfig, selectedState } = useStateContext();
  const { completeStep } = useProgress();
  const { hasPrenup: hasPaid } = usePaymentStatus();
  const router = useRouter();
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const handleNext = async () => {
    if (hasPaid) {
      const { valid, errors } = validateStep("optional-clauses", answers);
      if (!valid) {
        setFieldErrors(errors);
        return;
      }
      setFieldErrors({});
    }
    try {
      await saveNow();
      await fetch("/api/questionnaire/optional-clauses/complete", { method: "POST" });
    } catch {
      return;
    }
    completeStep("optional-clauses");
    router.push("/questionnaire/additional-documents");
  };

  // Initialize clause selections from saved answers (if any)
  const [selectedClauses, setSelectedClauses] = useState<Set<string>>(() => {
    const saved = answers._selectedClauses;
    if (Array.isArray(saved)) return new Set(saved as string[]);
    return new Set();
  });
  const [clauseAnswers, setClauseAnswers] = useState<Record<string, Record<string, string>>>(() => {
    const saved = answers._clauseAnswers;
    if (saved && typeof saved === "string") {
      try { return JSON.parse(saved); } catch { return {}; }
    }
    return {};
  });
  const [expandedClause, setExpandedClause] = useState<string | null>(null);

  // Re-initialize when answers load from API (isLoading transitions to false)
  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    if (!isLoading && !initialized) {
      setInitialized(true);
      const saved = answers._selectedClauses;
      if (Array.isArray(saved)) setSelectedClauses(new Set(saved as string[]));
      const savedAnswers = answers._clauseAnswers;
      if (savedAnswers && typeof savedAnswers === "string") {
        try { setClauseAnswers(JSON.parse(savedAnswers)); } catch { /* ignore */ }
      }
    }
  }, [isLoading, initialized, answers]);

  // Get state-specific optional clauses from the new legal engine
  const stateOptionalClauses = useMemo(() => {
    if (!selectedState) return [];
    try {
      return getStateOptionalClauses(selectedState as StateCode);
    } catch {
      return [];
    }
  }, [selectedState]);

  // Group clauses by category
  const clausesByCategory = useMemo(() => {
    const groups: Record<string, OptionalClause[]> = {};
    for (const clause of stateOptionalClauses) {
      if (!groups[clause.category]) {
        groups[clause.category] = [];
      }
      groups[clause.category].push(clause);
    }
    return groups;
  }, [stateOptionalClauses]);

  const toggleClause = (clauseId: string) => {
    setSelectedClauses((prev) => {
      const next = new Set(prev);
      if (next.has(clauseId)) {
        next.delete(clauseId);
      } else {
        next.add(clauseId);
      }
      // Sync to questionnaire answers so auto-save persists them
      updateAnswer("_selectedClauses", Array.from(next));
      return next;
    });
  };

  const updateClauseField = (clauseId: string, fieldId: string, value: string) => {
    setClauseAnswers((prev) => {
      const next = {
        ...prev,
        [clauseId]: { ...prev[clauseId], [fieldId]: value },
      };
      // Sync to questionnaire answers so auto-save persists them
      updateAnswer("_clauseAnswers", JSON.stringify(next));
      return next;
    });
  };

  const stateName = legalConfig?.stateName ?? "your state";
  const terminology = legalConfig?.agreementTerminology ?? "prenuptial agreement";

  if (isLoading) return <QuestionnaireLoading />;

  return (
    <div className="space-y-8">
      {/* Section header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-text-secondary mb-2">
          <span className="bg-navy/10 text-navy px-2.5 py-0.5 rounded-full text-xs font-semibold">
            Step 7 of 8
          </span>
          <span>Optional Clauses</span>
          <SaveIndicator isSaving={isSaving} error={saveError} />
        </div>
        <h1 className="text-3xl font-normal text-navy-dark font-[family-name:var(--font-heading)]">
          Optional Clauses
        </h1>
        <p className="text-text-secondary mt-2">
          Customize your {terminology} with additional provisions that matter to you.
          {legalConfig && (
            <span className="block mt-1 text-navy/60">
              Showing {stateOptionalClauses.length} clause{stateOptionalClauses.length !== 1 ? "s" : ""} specific to {stateName} law.
            </span>
          )}
        </p>
      </div>

      {/* Paywall Banner — only shown when not paid */}
      {!hasPaid && (
        <div className="rounded-[12px] bg-gradient-to-r from-navy to-navy-dark p-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Lock className="w-5 h-5" />
            <h3 className="text-lg font-semibold">Premium Content</h3>
          </div>
          <p className="text-white/80 text-sm mb-4">
            This section is available with your prenup package. Complete the free sections first, then unlock the full agreement.
          </p>
          <Link href="/payment">
            <Button variant="secondary" size="sm" className="border-white text-white hover:bg-white/10">
              Unlock Full Agreement &mdash; $599
            </Button>
          </Link>
        </div>
      )}

      {/* Standard Questions — only rendered after payment */}
      {hasPaid && (
        <div className="space-y-6">
          {optionalClausesQuestions.map((q) => (
            <QuestionCard
              key={q.id}
              question={q}
              value={answers[q.id] || (q.type === "multi-select" ? [] : "")}
              onChange={(val) => {
                updateAnswer(q.id, val);
                if (fieldErrors[q.id]) setFieldErrors((prev) => { const next = { ...prev }; delete next[q.id]; return next; });
              }}
              error={fieldErrors[q.id]}
            />
          ))}
        </div>
      )}

      {/* State-Specific Optional Clauses */}
      {stateOptionalClauses.length > 0 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-navy font-[family-name:var(--font-heading)]">
              {stateName}-Specific Clauses
            </h2>
            <p className="text-sm text-text-secondary mt-1">
              These clauses are tailored to {stateName} law. Select the ones that apply to your situation and fill in the required details.
            </p>
          </div>

          {Object.entries(clausesByCategory).map(([category, clauses]) => {
            const categoryConfig = CATEGORY_CONFIG[category as OptionalClause["category"]];
            const CategoryIcon = categoryConfig.icon;

            return (
              <div key={category} className="space-y-3">
                {/* Category header */}
                <div className="flex items-center gap-2 pt-2">
                  <CategoryIcon className={`w-4 h-4 ${categoryConfig.color}`} />
                  <h3 className={`text-sm font-semibold ${categoryConfig.color} uppercase tracking-wide`}>
                    {categoryConfig.label}
                  </h3>
                  <div className="flex-1 border-t border-border/50" />
                </div>

                {clauses.map((clause) => {
                  const isSelected = selectedClauses.has(clause.id);
                  const isExpanded = expandedClause === clause.id;

                  return (
                    <Card key={clause.id} className={isSelected ? "ring-2 ring-navy" : ""}>
                      {/* Clause header with checkbox */}
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleClause(clause.id)}
                          className={`w-5 h-5 rounded border-2 shrink-0 mt-0.5 flex items-center justify-center transition-colors ${
                            isSelected
                              ? "bg-navy border-navy text-white"
                              : "border-border hover:border-navy/40"
                          }`}
                        >
                          {isSelected && (
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-navy">{clause.title}</h3>
                            {isSelected && clause.fields.length > 0 && (
                              <button
                                onClick={() => setExpandedClause(isExpanded ? null : clause.id)}
                                className="text-text-secondary hover:text-navy transition-colors"
                              >
                                {isExpanded ? (
                                  <ChevronUp className="w-4 h-4" />
                                ) : (
                                  <ChevronDown className="w-4 h-4" />
                                )}
                              </button>
                            )}
                          </div>
                          <p className="text-xs text-text-secondary mt-1">{clause.description}</p>
                        </div>
                      </div>

                      {/* Expanded fields */}
                      {isSelected && isExpanded && clause.fields.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-border space-y-4 ml-8">
                          {clause.fields.map((field) => {
                            if (field.type === "checkbox") {
                              return (
                                <label key={field.id} className="flex items-start gap-3 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={clauseAnswers[clause.id]?.[field.id] === "true"}
                                    onChange={(e) =>
                                      updateClauseField(clause.id, field.id, e.target.checked ? "true" : "false")
                                    }
                                    className="mt-0.5 w-4 h-4 rounded border-border text-navy focus:ring-navy/30"
                                  />
                                  <span className="text-sm text-navy/80">{field.label}</span>
                                </label>
                              );
                            }

                            if (field.type === "select" && field.options) {
                              return (
                                <div key={field.id} className="space-y-1.5">
                                  <label className="block text-sm font-medium text-navy">
                                    {field.label}
                                  </label>
                                  <select
                                    value={clauseAnswers[clause.id]?.[field.id] || ""}
                                    onChange={(e) => updateClauseField(clause.id, field.id, e.target.value)}
                                    className="w-full h-12 px-4 rounded-[8px] border border-border text-sm text-navy-dark focus:outline-none focus:ring-2 focus:ring-navy/30 focus:border-navy"
                                  >
                                    <option value="">Select an option...</option>
                                    {field.options.map((opt) => (
                                      <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                  </select>
                                </div>
                              );
                            }

                            return (
                              <Input
                                key={field.id}
                                id={`${clause.id}-${field.id}`}
                                label={field.label}
                                value={clauseAnswers[clause.id]?.[field.id] || ""}
                                onChange={(e) => updateClauseField(clause.id, field.id, e.target.value)}
                              />
                            );
                          })}
                        </div>
                      )}
                    </Card>
                  );
                })}
              </div>
            );
          })}

          {/* State-specific warnings from the legal engine */}
          {legalConfig && legalConfig.platformNotes.warnings.length > 0 && (
            <StateCallout type="info" title={`Important Notes for ${stateName}`}>
              <ul className="list-disc list-inside space-y-1">
                {legalConfig.platformNotes.warnings.map((warning, i) => (
                  <li key={i}>{warning}</li>
                ))}
              </ul>
            </StateCallout>
          )}
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4">
        <Link href="/questionnaire/legal-representation">
          <Button variant="secondary" size="md">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>
        <Button variant="primary" size="md" onClick={handleNext}>
          Next: Additional Documents
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
