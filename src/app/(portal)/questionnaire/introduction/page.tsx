"use client";

import { useEffect, useState } from "react";
import { introductionQuestions } from "@/lib/questionnaire/introduction";
import QuestionCard from "@/components/portal/QuestionCard";
import Button from "@/components/ui/Button";
import { ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStateContext } from "@/lib/StateContext";
import { useProgress } from "@/lib/ProgressContext";
import StateCallout from "@/components/portal/StateCallout";
import { useQuestionnaireStep } from "@/lib/hooks/useQuestionnaireStep";
import SaveIndicator from "@/components/portal/SaveIndicator";
import QuestionnaireLoading from "@/components/portal/QuestionnaireLoading";
import { validateStep, type FieldErrors } from "@/lib/validation/questionnaire-schemas";

export default function IntroductionPage() {
  const { answers, updateAnswer, isLoading, isSaving, saveError, saveNow } =
    useQuestionnaireStep({ stepId: "introduction" });
  const { setSelectedState, isExcluded, legalConfig } = useStateContext();
  const { completeStep } = useProgress();
  const router = useRouter();
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const handleNext = async () => {
    const { valid, errors } = validateStep("introduction", answers);
    if (!valid) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});
    try {
      await saveNow();
      await fetch("/api/questionnaire/introduction/complete", { method: "POST" });
    } catch {
      return;
    }
    completeStep("introduction");
    router.push("/questionnaire/property");
  };

  // Sync state selection to context
  useEffect(() => {
    const state = answers.state_of_residence;
    if (state && typeof state === "string") {
      setSelectedState(state);
    }
  }, [answers.state_of_residence, setSelectedState]);

  const allRequiredAnswered = introductionQuestions
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
            Step 1 of 8
          </span>
          <span>Introduction</span>
          <SaveIndicator isSaving={isSaving} error={saveError} />
        </div>
        <h1 className="text-3xl font-normal text-navy-dark font-[family-name:var(--font-heading)]">
          Let&apos;s start with the basics
        </h1>
        <p className="text-text-secondary mt-2">
          Tell us about yourself so we can personalize your prenuptial agreement.
        </p>
      </div>

      {/* Process Overview Banner */}
      <div className="rounded-[16px] bg-gradient-to-br from-[#FCE4EC] via-[#F3E5F5] to-[#EDE7F6] p-6">
        <p className="text-sm font-semibold text-navy mb-4">
          Here&apos;s what to expect:
        </p>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl mb-1">📋</div>
            <p className="text-sm font-medium text-navy">Complete the</p>
            <p className="text-xs text-text-secondary">questionnaire</p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-1">🤝</div>
            <p className="text-sm font-medium text-navy">Collaborate</p>
            <p className="text-xs text-text-secondary">with your partner</p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-1">📄</div>
            <p className="text-sm font-medium text-navy">Generate your</p>
            <p className="text-xs text-text-secondary">prenup</p>
          </div>
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-6">
        {introductionQuestions.map((q) => (
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

      {/* Excluded state warning */}
      {isExcluded && legalConfig && (
        <StateCallout type="warning" title={`${legalConfig.stateName} Requires Attorney Assistance`}>
          <p>
            {legalConfig.stateName} requires independent legal counsel for both parties.
            Self-service prenup creation is not available for this state.
          </p>
          <p className="mt-2 font-medium">
            We offer an attorney-assisted package that meets {legalConfig.stateName}&apos;s requirements.
          </p>
        </StateCallout>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4">
        <Link href="/dashboard">
          <Button variant="secondary" size="md">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
        {allRequiredAnswered ? (
          <Button variant="primary" size="md" onClick={handleNext}>
            Next: Property
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button variant="disabled" size="md" disabled>
            Next: Property
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}
