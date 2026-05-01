"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { legalRepresentationQuestions } from "@/lib/questionnaire/legal-representation";
import QuestionCard from "@/components/portal/QuestionCard";
import Button from "@/components/ui/Button";
import { ArrowRight, ArrowLeft, Lock } from "lucide-react";
import { useStateContext } from "@/lib/StateContext";
import StateCallout from "@/components/portal/StateCallout";
import { useProgress } from "@/lib/ProgressContext";
import { useQuestionnaireStep } from "@/lib/hooks/useQuestionnaireStep";
import SaveIndicator from "@/components/portal/SaveIndicator";
import QuestionnaireLoading from "@/components/portal/QuestionnaireLoading";
import { usePaymentStatus } from "@/lib/hooks/usePaymentStatus";
import { validateStep, type FieldErrors } from "@/lib/validation/questionnaire-schemas";

export default function LegalRepresentationPage() {
  const { answers, updateAnswer, isLoading, isSaving, saveError, saveNow } =
    useQuestionnaireStep({ stepId: "legal-representation" });
  const { legalConfig, requiresAttorney, requiresNotarization, requiresWitnesses, hasWaitingPeriod } = useStateContext();
  const { completeStep } = useProgress();
  const { hasPrenup: hasPaid } = usePaymentStatus();
  const router = useRouter();
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const handleNext = async () => {
    if (hasPaid) {
      const { valid, errors } = validateStep("legal-representation", answers);
      if (!valid) {
        setFieldErrors(errors);
        return;
      }
      setFieldErrors({});
    }
    try {
      await saveNow();
      await fetch("/api/questionnaire/legal-representation/complete", { method: "POST" });
    } catch {
      return;
    }
    completeStep("legal-representation");
    router.push("/questionnaire/optional-clauses");
  };

  if (isLoading) return <QuestionnaireLoading />;

  return (
    <div className="space-y-8">
      {/* Section header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-text-secondary mb-2">
          <span className="bg-navy/10 text-navy px-2.5 py-0.5 rounded-full text-xs font-semibold">
            Step 6 of 8
          </span>
          <span>Disclosure &amp; Legal Representation</span>
          <SaveIndicator isSaving={isSaving} error={saveError} />
        </div>
        <h1 className="text-3xl font-normal text-navy-dark font-[family-name:var(--font-heading)]">
          Disclosure &amp; Legal Representation
        </h1>
        <p className="text-text-secondary mt-2">
          Ensure both partners understand their rights and have access to independent legal advice.
        </p>
      </div>

      {/* State-specific signing requirements — enhanced with new engine data */}
      {legalConfig && (
        <StateCallout
          type={requiresAttorney ? "warning" : "info"}
          title={`Signing Requirements in ${legalConfig.stateName}`}
        >
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>Independent legal counsel:</strong>{" "}
              {legalConfig.independentCounsel.requirement === "required"
                ? "Required for enforceability. Both parties must have their own attorney."
                : legalConfig.independentCounsel.requirement === "conditionally_required"
                  ? `May be required. ${legalConfig.independentCounsel.conditions || "Depends on fairness of the agreement."}`
                  : legalConfig.independentCounsel.requirement === "required_for_spousal_support"
                    ? "Required if the agreement modifies or eliminates spousal support. Otherwise strongly recommended."
                    : legalConfig.independentCounsel.requirement === "opportunity_required"
                      ? "Each party must have a meaningful opportunity to consult with an independent attorney."
                      : "Recommended for enforceability. Courts are more likely to uphold agreements where both parties had counsel."}
            </li>
            {legalConfig.independentCounsel.writtenWaiverRequired && (
              <li>
                <strong>Written waiver:</strong> If either party declines attorney representation, a separate written waiver of counsel is required.
              </li>
            )}
            {requiresWitnesses && (
              <li>
                <strong>Witnesses:</strong> {legalConfig.execution.witnessCount} witness{(legalConfig.execution.witnessCount ?? 0) > 1 ? "es" : ""} required.{" "}
                {legalConfig.execution.witnessRules && <span className="text-navy/60">{legalConfig.execution.witnessRules}</span>}
              </li>
            )}
            <li>
              <strong>Notarization:</strong>{" "}
              {requiresNotarization
                ? `Required in ${legalConfig.stateName}.`
                : `While ${legalConfig.stateName} does not legally require notarization, we strongly recommend it. Notarized agreements are significantly harder to challenge in court.`}
            </li>
            {hasWaitingPeriod && legalConfig.waitingPeriod.daysRequired && (
              <li>
                <strong>Waiting period:</strong>{" "}
                {legalConfig.waitingPeriod.calculationBasis === "before_wedding"
                  ? `Must be signed at least ${legalConfig.waitingPeriod.daysRequired} days before the wedding.`
                  : `Must wait at least ${legalConfig.waitingPeriod.daysRequired} days between presentation of the final agreement and signing.`}
              </li>
            )}
          </ul>
        </StateCallout>
      )}

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
          {legalRepresentationQuestions.map((q) => (
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
        <Link href="/questionnaire/spousal-support">
          <Button variant="secondary" size="md">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>
        <Button variant="primary" size="md" onClick={handleNext}>
          Next: Optional Clauses
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
