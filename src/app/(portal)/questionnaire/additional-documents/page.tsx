"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { additionalDocumentsQuestions } from "@/lib/questionnaire/additional-documents";
import QuestionCard from "@/components/portal/QuestionCard";
import Button from "@/components/ui/Button";
import { ArrowRight, ArrowLeft, Lock } from "lucide-react";
import { useProgress } from "@/lib/ProgressContext";
import { useQuestionnaireStep } from "@/lib/hooks/useQuestionnaireStep";
import SaveIndicator from "@/components/portal/SaveIndicator";
import QuestionnaireLoading from "@/components/portal/QuestionnaireLoading";
import { usePaymentStatus } from "@/lib/hooks/usePaymentStatus";
import { validateStep, type FieldErrors } from "@/lib/validation/questionnaire-schemas";

export default function AdditionalDocumentsPage() {
  const { answers, updateAnswer, isLoading, isSaving, saveError, saveNow } =
    useQuestionnaireStep({ stepId: "additional-documents" });
  const { completeStep } = useProgress();
  const { hasPrenup: hasPaid } = usePaymentStatus();
  const router = useRouter();
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const handleComplete = async () => {
    if (hasPaid) {
      const { valid, errors } = validateStep("additional-documents", answers);
      if (!valid) {
        setFieldErrors(errors);
        return;
      }
      setFieldErrors({});
    }
    try {
      await saveNow();
      await fetch("/api/questionnaire/additional-documents/complete", { method: "POST" });
    } catch {
      return;
    }
    completeStep("additional-documents");
    router.push("/dashboard");
  };

  if (isLoading) return <QuestionnaireLoading />;

  return (
    <div className="space-y-8">
      {/* Section header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-text-secondary mb-2">
          <span className="bg-navy/10 text-navy px-2.5 py-0.5 rounded-full text-xs font-semibold">
            Step 8 of 8
          </span>
          <span>Additional Documents</span>
          <SaveIndicator isSaving={isSaving} error={saveError} />
        </div>
        <h1 className="text-3xl font-normal text-navy-dark font-[family-name:var(--font-heading)]">
          Additional Documents
        </h1>
        <p className="text-text-secondary mt-2">
          Final options for supporting documents and translations.
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

      {/* Questions — only rendered after payment */}
      {hasPaid && (
        <div className="space-y-6">
          {additionalDocumentsQuestions.map((q) => (
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

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4">
        <Link href="/questionnaire/optional-clauses">
          <Button variant="secondary" size="md">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>
        <Button variant="primary" size="md" onClick={handleComplete}>
          Complete Questionnaire
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
