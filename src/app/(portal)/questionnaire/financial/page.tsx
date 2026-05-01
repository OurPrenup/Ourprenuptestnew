"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { financialQuestions } from "@/lib/questionnaire/financial";
import QuestionCard from "@/components/portal/QuestionCard";
import Button from "@/components/ui/Button";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useProgress } from "@/lib/ProgressContext";
import { useStateContext } from "@/lib/StateContext";
import StateCallout from "@/components/portal/StateCallout";
import { useQuestionnaireStep } from "@/lib/hooks/useQuestionnaireStep";
import SaveIndicator from "@/components/portal/SaveIndicator";
import QuestionnaireLoading from "@/components/portal/QuestionnaireLoading";
import { validateStep, type FieldErrors } from "@/lib/validation/questionnaire-schemas";

export default function FinancialPage() {
  const { answers, updateAnswer, isLoading, isSaving, saveError, saveNow } =
    useQuestionnaireStep({ stepId: "financial" });
  const { completeStep } = useProgress();
  const { legalConfig } = useStateContext();
  const router = useRouter();
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const handleNext = async () => {
    const { valid, errors } = validateStep("financial", answers);
    if (!valid) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});
    try {
      await saveNow();
      await fetch("/api/questionnaire/financial/complete", { method: "POST" });
    } catch {
      return;
    }
    completeStep("financial");
    router.push("/questionnaire/spousal-support");
  };

  const allRequiredAnswered = financialQuestions
    .filter((q) => q.required)
    .every((q) => {
      const val = answers[q.id];
      if (Array.isArray(val)) return val.length > 0;
      return val && val.trim() !== "";
    });

  if (isLoading) return <QuestionnaireLoading />;

  return (
    <div className="space-y-8">
      {/* Section header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-text-secondary mb-2">
          <span className="bg-navy/10 text-navy px-2.5 py-0.5 rounded-full text-xs font-semibold">
            Step 4 of 8
          </span>
          <span>Financial Considerations</span>
          <SaveIndicator isSaving={isSaving} error={saveError} />
        </div>
        <h1 className="text-3xl font-normal text-navy-dark font-[family-name:var(--font-heading)]">
          Financial Considerations
        </h1>
        <p className="text-text-secondary mt-2">
          A few key money topics that affect how your prenup works in practice.
        </p>
      </div>

      {/* State-specific disclosure requirements */}
      {legalConfig?.financialDisclosure.strictness === "strict" && (
        <StateCallout type="warning" title="Detailed Financial Disclosure Required">
          <p>
            {legalConfig.stateName} requires thorough financial disclosure for prenuptial agreements
            to be enforceable. Be as complete and accurate as possible when listing your finances.
          </p>
          {legalConfig.stateCode === "NJ" && (
            <p className="mt-2">
              Your agreement will include an annexed statement of assets as required by New Jersey law.
            </p>
          )}
          {legalConfig.stateCode === "MN" && (
            <p className="mt-2">
              Minnesota requires good-faith value estimates and the basis for those valuations for all
              material assets.
            </p>
          )}
          {legalConfig.stateCode === "MA" && (
            <p className="mt-2">
              Massachusetts requires an itemized listing of all assets with values, all income sources,
              and all liabilities.
            </p>
          )}
        </StateCallout>
      )}

      {legalConfig?.financialDisclosure.strictness === "soft" && (
        <StateCallout type="info" title="Financial Disclosure">
          <p>
            {legalConfig.stateName} takes a flexible approach to disclosure. Both parties should have
            adequate knowledge of each other&apos;s financial situation, but an itemized listing is not
            strictly required.
          </p>
        </StateCallout>
      )}

      {/* Questions */}
      <div className="space-y-6">
        {financialQuestions.map((q) => (
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

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4">
        <Link href="/questionnaire/debts">
          <Button variant="secondary" size="md">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back: Debts
          </Button>
        </Link>
        {allRequiredAnswered ? (
          <Button variant="primary" size="md" onClick={handleNext}>
            Next: Spousal Support
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button variant="disabled" size="md" disabled>
            Next: Spousal Support
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}
