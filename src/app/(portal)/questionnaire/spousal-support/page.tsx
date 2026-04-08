"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { spousalSupportQuestions } from "@/lib/questionnaire/spousal-support";
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

export default function SpousalSupportPage() {
  const { answers, updateAnswer, isLoading, isSaving, saveError, saveNow } =
    useQuestionnaireStep({ stepId: "spousal-support" });
  const { stateRules, spousalSupportWaivable, spousalSupportDisabled, legalConfig } = useStateContext();
  const { completeStep } = useProgress();
  const { hasPrenup: hasPaid } = usePaymentStatus();
  const router = useRouter();

  const handleNext = async () => {
    try {
      await saveNow();
    } catch {
      return;
    }
    completeStep("spousal-support");
    router.push("/questionnaire/legal-representation");
  };

  if (isLoading) return <QuestionnaireLoading />;

  return (
    <div className="space-y-8">
      {/* Section header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-text-secondary mb-2">
          <span className="bg-navy/10 text-navy px-2.5 py-0.5 rounded-full text-xs font-semibold">
            Step 5 of 8
          </span>
          <span>Spousal Support</span>
          <SaveIndicator isSaving={isSaving} error={saveError} />
        </div>
        <h1 className="text-3xl font-normal text-navy-dark font-[family-name:var(--font-heading)]">
          Spousal Support
        </h1>
        <p className="text-text-secondary mt-2">
          Decide how financial support should work if the marriage ends.
        </p>
      </div>

      {/* Spousal support disabled for IA, NM, SD */}
      {spousalSupportDisabled && legalConfig && (
        <div className="rounded-[12px] border-2 border-orange-300 bg-orange-50 p-6">
          <div className="flex items-start gap-3">
            <Lock className="w-6 h-6 text-orange-600 mt-0.5 shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-orange-800 mb-2">
                Spousal Support Not Available in {legalConfig.stateName}
              </h3>
              <p className="text-sm text-orange-700 leading-relaxed mb-3">
                {legalConfig.spousalSupport.disabledReason}
              </p>
              <p className="text-sm text-orange-700 leading-relaxed">
                Your prenuptial agreement will not include spousal support provisions.
                This section has been automatically skipped. You can continue to the next step.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* State-specific spousal support warning (not disabled but limited) */}
      {!spousalSupportDisabled && stateRules && !spousalSupportWaivable && (
        <StateCallout type="warning" title={`Spousal Support Limitations in ${stateRules.stateName}`}>
          <p>{stateRules.spousalSupportNotes}</p>
          <p className="mt-2 font-medium">
            We recommend including fair spousal support terms rather than a full waiver to improve enforceability.
          </p>
        </StateCallout>
      )}

      {!spousalSupportDisabled && stateRules && spousalSupportWaivable && (
        <StateCallout type="info" title="Spousal Support Waivers in Your State">
          <p>{stateRules.spousalSupportNotes}</p>
        </StateCallout>
      )}

      {/* Paywall Banner — shown when not paid and spousal support is not disabled */}
      {!spousalSupportDisabled && !hasPaid && (
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

      {/* Questions — only rendered after payment is confirmed */}
      {!spousalSupportDisabled && hasPaid && (
        <div className="space-y-6">
          {spousalSupportQuestions.map((q) => (
            <QuestionCard
              key={q.id}
              question={q}
              value={answers[q.id] || (q.type === "multi-select" ? [] : "")}
              onChange={(val) => updateAnswer(q.id, val)}
            />
          ))}
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4">
        <Link href="/questionnaire/financial">
          <Button variant="secondary" size="md">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>
        <Button variant="primary" size="md" onClick={handleNext}>
          Next: Disclosure &amp; Legal
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
