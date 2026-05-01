"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { propertyQuestions } from "@/lib/questionnaire/property";
import QuestionCard from "@/components/portal/QuestionCard";
import Button from "@/components/ui/Button";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useStateContext } from "@/lib/StateContext";
import StateCallout from "@/components/portal/StateCallout";
import { useProgress } from "@/lib/ProgressContext";
import { useQuestionnaireStep } from "@/lib/hooks/useQuestionnaireStep";
import SaveIndicator from "@/components/portal/SaveIndicator";
import QuestionnaireLoading from "@/components/portal/QuestionnaireLoading";
import { validateStep, type FieldErrors } from "@/lib/validation/questionnaire-schemas";

export default function PropertyPage() {
  const { answers, updateAnswer, isLoading, isSaving, saveError, saveNow } =
    useQuestionnaireStep({ stepId: "property" });
  const { stateRules, isCommunityProperty, legalConfig } = useStateContext();
  const { completeStep } = useProgress();
  const router = useRouter();
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const handleNext = async () => {
    const { valid, errors } = validateStep("property", answers);
    if (!valid) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});
    try {
      await saveNow();
      await fetch("/api/questionnaire/property/complete", { method: "POST" });
    } catch {
      return;
    }
    completeStep("property");
    router.push("/questionnaire/debts");
  };

  const allRequiredAnswered = propertyQuestions
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
            Step 2 of 8
          </span>
          <span>Property &amp; Ownership</span>
          <SaveIndicator isSaving={isSaving} error={saveError} />
        </div>
        <h1 className="text-3xl font-normal text-navy-dark font-[family-name:var(--font-heading)]">
          Property &amp; Ownership
        </h1>
        <p className="text-text-secondary mt-2">
          Your prenup helps define how current and future property will be treated during your marriage.
        </p>
      </div>

      {/* State-specific callout */}
      {stateRules && isCommunityProperty && legalConfig?.communityPropertyVariant === "umpa_wisconsin" && (
        <StateCallout type="warning" title="Wisconsin Marital Property">
          <p>
            Wisconsin uses a unique marital property system. Without a marital property agreement,
            most assets and income acquired during marriage are considered &quot;marital property&quot;
            and owned equally by both spouses. Your agreement can override these defaults.
          </p>
        </StateCallout>
      )}

      {stateRules && isCommunityProperty && legalConfig?.communityPropertyVariant !== "umpa_wisconsin" && (
        <StateCallout type="warning" title={`${stateRules.stateName} is a Community Property State`}>
          <p>
            In community property states, most assets and debts acquired during marriage are owned
            equally by both spouses. Your prenup can override these defaults, but it is important
            to understand how your state treats property before making decisions below.
          </p>
        </StateCallout>
      )}

      {stateRules && !isCommunityProperty && legalConfig?.communityPropertyVariant === "opt_in_alaska" && (
        <StateCallout type="info" title="Alaska Offers Opt-In Community Property">
          <p>
            Alaska uses equitable distribution by default, but uniquely allows couples to
            opt into a community property arrangement for some or all assets. If you&apos;d like
            to share ownership of certain property equally, you can include that in your agreement.
          </p>
        </StateCallout>
      )}

      {stateRules && !isCommunityProperty && legalConfig?.communityPropertyVariant !== "opt_in_alaska" && (
        <StateCallout type="info" title={`${stateRules.stateName} Uses Equitable Distribution`}>
          <p>
            Your state divides marital property &quot;equitably&quot; (fairly, but not necessarily 50/50)
            in the event of divorce. A prenup lets you define your own terms instead of leaving
            it to a court.
          </p>
        </StateCallout>
      )}

      {/* Questions */}
      <div className="space-y-6">
        {propertyQuestions.map((q) => (
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
        <Link href="/questionnaire/introduction">
          <Button variant="secondary" size="md">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back: Introduction
          </Button>
        </Link>
        {allRequiredAnswered ? (
          <Button variant="primary" size="md" onClick={handleNext}>
            Next: Debts
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button variant="disabled" size="md" disabled>
            Next: Debts
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}
