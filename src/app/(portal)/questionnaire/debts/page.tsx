"use client";

import { useState } from "react";
import Link from "next/link";
import { debtsQuestions } from "@/lib/questionnaire/debts";
import QuestionCard from "@/components/portal/QuestionCard";
import Button from "@/components/ui/Button";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useProgress } from "@/lib/ProgressContext";
import { useQuestionnaireStep } from "@/lib/hooks/useQuestionnaireStep";
import SaveIndicator from "@/components/portal/SaveIndicator";
import QuestionnaireLoading from "@/components/portal/QuestionnaireLoading";
import { validateStep, type FieldErrors } from "@/lib/validation/questionnaire-schemas";

export default function DebtsPage() {
  const { answers, updateAnswer, isLoading, isSaving, saveError, saveNow } =
    useQuestionnaireStep({ stepId: "debts" });
  const { completeStep } = useProgress();
  const router = useRouter();
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const handleNext = async () => {
    const { valid, errors } = validateStep("debts", answers);
    if (!valid) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});
    try {
      await saveNow();
    } catch {
      return;
    }
    completeStep("debts");
    router.push("/questionnaire/financial");
  };

  const allRequiredAnswered = debtsQuestions
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
            Step 3 of 8
          </span>
          <span>Debts &amp; Liabilities</span>
          <SaveIndicator isSaving={isSaving} error={saveError} />
        </div>
        <h1 className="text-3xl font-normal text-navy-dark font-[family-name:var(--font-heading)]">
          Debts &amp; Liabilities
        </h1>
        <p className="text-text-secondary mt-2">
          Decide together how existing and future debts will be handled in your agreement.
        </p>
      </div>

      {/* Questions */}
      <div className="space-y-6">
        {debtsQuestions.map((q) => (
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
        <Link href="/questionnaire/property">
          <Button variant="secondary" size="md">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back: Property
          </Button>
        </Link>
        {allRequiredAnswered ? (
          <Button variant="primary" size="md" onClick={handleNext}>
            Next: Financial
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button variant="disabled" size="md" disabled>
            Next: Financial
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}
