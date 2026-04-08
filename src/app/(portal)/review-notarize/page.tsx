"use client";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import {
  FileSearch,
  PenTool,
  Video,
  Download,
  Info,
  Square,
  Users,
  FileCheck,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { useStateContext } from "@/lib/StateContext";
import { generateSigningInstructions } from "@/legal/signing-instructions";
import ValidationPanel from "@/components/portal/ValidationPanel";

const processSteps = [
  {
    step: 1,
    icon: FileSearch,
    title: "Review Final Document",
    description: "Review your complete prenup one last time before signing.",
    iconBg: "bg-purple/10",
    iconColor: "text-purple",
  },
  {
    step: 2,
    icon: PenTool,
    title: "Electronic Signatures",
    description: "Both partners sign digitally from anywhere.",
    iconBg: "bg-coral/10",
    iconColor: "text-coral",
  },
  {
    step: 3,
    icon: Video,
    title: "Online Notarization",
    description: "Connect with a licensed notary via video call.",
    iconBg: "bg-teal/10",
    iconColor: "text-teal",
  },
  {
    step: 4,
    icon: Download,
    title: "Download & Store",
    description: "Get your official notarized agreement.",
    iconBg: "bg-success-light",
    iconColor: "text-success",
  },
];

const requirements = [
  "Prenup document generated",
  "Both partners have reviewed the agreement",
  "Payment completed",
];

export default function ReviewNotarizePage() {
  const { legalConfig, selectedState } = useStateContext();

  // Generate state-specific signing instructions if a state is selected
  const signingInstructions = selectedState && legalConfig
    ? generateSigningInstructions(legalConfig.stateCode)
    : null;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-normal text-navy-dark font-[family-name:var(--font-heading)]">
          E-Sign & Notarize
        </h1>
        <p className="text-text-secondary mt-2">
          Finalize your prenuptial agreement with electronic signatures and
          notarization.
        </p>
      </div>

      {/* Status Banner */}
      <div className="rounded-[12px] bg-teal/10 border border-teal/20 p-5">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-teal mt-0.5 shrink-0" />
          <p className="text-sm text-navy/80">
            Complete your questionnaire and generate your prenup before signing.
          </p>
        </div>
      </div>

      {/* Process Steps */}
      <div>
        <h2 className="text-xl font-semibold text-navy mb-4">The Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {processSteps.map((item) => (
            <Card key={item.step} hover>
              <div className="flex items-start gap-4">
                <div
                  className={`w-10 h-10 rounded-full ${item.iconBg} flex items-center justify-center shrink-0`}
                >
                  <item.icon className={`w-5 h-5 ${item.iconColor}`} />
                </div>
                <div>
                  <div className="text-xs font-bold text-text-secondary uppercase mb-1">
                    Step {item.step}
                  </div>
                  <h3 className="text-sm font-semibold text-navy">
                    {item.title}
                  </h3>
                  <p className="text-xs text-text-secondary mt-1">
                    {item.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Pricing */}
      <Card>
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-teal mt-0.5 shrink-0" />
          <div>
            <h3 className="text-sm font-semibold text-navy">Pricing</h3>
            <p className="text-sm text-text-secondary mt-1">
              Notarization is included with attorney review, or available
              standalone for{" "}
              <span className="font-semibold text-navy">$50</span>.
            </p>
          </div>
        </div>
      </Card>

      {/* State-Specific Signing Requirements */}
      {signingInstructions && legalConfig && (
        <div>
          <h2 className="text-xl font-semibold text-navy mb-4">
            Signing Requirements for {legalConfig.stateName}
          </h2>

          {/* Who needs to be present */}
          {signingInstructions.requiredPeople.length > 0 && (
            <Card className="mb-4">
              <div className="flex items-start gap-3 mb-3">
                <Users className="w-5 h-5 text-navy/60 mt-0.5 shrink-0" />
                <h3 className="text-sm font-semibold text-navy">
                  People Required ({signingInstructions.totalPeopleCount} total)
                </h3>
              </div>
              <div className="space-y-2 ml-8">
                {signingInstructions.requiredPeople.map((person, i) => (
                  <div key={i} className="text-sm">
                    <span className="font-medium text-navy">{person.role}</span>
                    {person.count > 1 && (
                      <span className="text-text-secondary"> &times; {person.count}</span>
                    )}
                    {person.constraints && (
                      <p className="text-xs text-text-secondary mt-0.5">{person.constraints}</p>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Notarization */}
          <Card className="mb-4">
            <div className="flex items-start gap-3">
              <FileCheck className="w-5 h-5 text-navy/60 mt-0.5 shrink-0" />
              <div>
                <h3 className="text-sm font-semibold text-navy">Notarization</h3>
                <p className="text-sm text-text-secondary mt-1">
                  {legalConfig.execution.notarization === "required"
                    ? `Notarization is required in ${legalConfig.stateName}. Your agreement will not be enforceable without it.`
                    : `While ${legalConfig.stateName} does not legally require notarization, we strongly recommend it. Notarized agreements are significantly harder to challenge in court.`}
                </p>
              </div>
            </div>
          </Card>

          {/* Waiting period */}
          {legalConfig.waitingPeriod.hasMandatoryPeriod && (
            <Card className="mb-4">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-warning mt-0.5 shrink-0" />
                <div>
                  <h3 className="text-sm font-semibold text-navy">
                    {legalConfig.waitingPeriod.daysRequired}-Day Waiting Period
                  </h3>
                  <p className="text-sm text-text-secondary mt-1">
                    {legalConfig.waitingPeriod.details}
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Step-by-step instructions */}
          <Card className="mb-4">
            <h3 className="text-sm font-semibold text-navy mb-3">Signing Steps</h3>
            <ol className="space-y-2 list-decimal list-inside">
              {signingInstructions.steps.map((step, i) => (
                <li key={i} className="text-sm text-navy/80">{step}</li>
              ))}
            </ol>
          </Card>

          {/* Special notes */}
          {signingInstructions.specialNotes.length > 0 && (
            <Card className="mb-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-warning mt-0.5 shrink-0" />
                <div>
                  <h3 className="text-sm font-semibold text-navy mb-2">Important Notes</h3>
                  <ul className="space-y-1">
                    {signingInstructions.specialNotes.map((note, i) => (
                      <li key={i} className="text-sm text-text-secondary">{note}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          )}
        </div>
      )}

      {/* Legal Validation */}
      <ValidationPanel autoFetch />

      {/* Requirements */}
      <Card>
        <h2 className="text-lg font-semibold text-navy mb-4">Requirements</h2>
        <p className="text-sm text-text-secondary mb-4">
          Complete the following before you can sign and notarize:
        </p>
        <div className="space-y-3">
          {requirements.map((req) => (
            <div key={req} className="flex items-center gap-3">
              <Square className="w-4 h-4 text-text-secondary/40 shrink-0" />
              <span className="text-sm text-navy/70">{req}</span>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <Button variant="primary" disabled>
            Start Signing
          </Button>
        </div>
      </Card>
    </div>
  );
}
