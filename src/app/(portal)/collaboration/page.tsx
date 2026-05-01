"use client";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Link from "next/link";
import {
  Users,
  CheckCircle2,
  MessageSquare,
  GitCompareArrows,
  Handshake,
  Loader2,
  PartyPopper,
} from "lucide-react";
import { useCollaborationStatus } from "@/lib/hooks/useCollaborationStatus";
import PartnerStatusBanner from "@/components/portal/PartnerStatusBanner";
import ConflictCard from "@/components/portal/ConflictCard";

// Human-readable step labels
const STEP_LABELS: Record<string, string> = {
  introduction: "Introduction",
  property: "Property & Ownership",
  debts: "Debts & Liabilities",
  financial: "Financial Considerations",
  "spousal-support": "Spousal Support",
  "legal-representation": "Disclosure & Legal",
  "optional-clauses": "Optional Clauses",
  "additional-documents": "Additional Documents",
};

export default function CollaborationPage() {
  const {
    conflicts,
    bothComplete,
    totalConflicts,
    unresolvedCount,
    resolvedCount,
    allResolved,
    isLoading,
    refresh,
    resolveConflict,
  } = useCollaborationStatus();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-normal text-navy-dark font-[family-name:var(--font-heading)]">
          Collaboration Station
        </h1>
        <p className="text-text-secondary mt-2">
          Review and resolve any differences between your answers and your
          partner&apos;s.
        </p>
      </div>

      {/* Info Banner */}
      <div className="rounded-[12px] bg-teal/10 border border-teal/20 p-5">
        <div className="flex items-start gap-3">
          <MessageSquare className="w-5 h-5 text-teal mt-0.5 shrink-0" />
          <p className="text-sm text-navy/80">
            Once both partners complete the questionnaire, any differences will
            appear here for you to discuss and resolve together.
          </p>
        </div>
      </div>

      {/* Partner Status */}
      <div>
        <h2 className="text-lg font-semibold text-navy mb-3">
          Partner Progress
        </h2>
        <PartnerStatusBanner />
      </div>

      {/* How It Works */}
      <div>
        <h2 className="text-xl font-semibold text-navy mb-4">How it works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              step: 1,
              icon: Users,
              title: "Complete Independently",
              description:
                "Both partners fill out the questionnaire independently so answers aren\u0027t influenced.",
            },
            {
              step: 2,
              icon: GitCompareArrows,
              title: "We Flag Differences",
              description:
                "We flag any areas where your answers differ so you know exactly what to discuss.",
            },
            {
              step: 3,
              icon: Handshake,
              title: "Resolve Together",
              description:
                "You review the differences together and agree on final terms for your prenup.",
            },
          ].map((item) => (
            <Card key={item.step} hover>
              <div className="text-center space-y-3">
                <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center mx-auto">
                  <item.icon className="w-5 h-5 text-teal" />
                </div>
                <div className="text-xs font-bold text-teal uppercase">
                  Step {item.step}
                </div>
                <h3 className="text-sm font-semibold text-navy">
                  {item.title}
                </h3>
                <p className="text-xs text-text-secondary">
                  {item.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <Card>
          <div className="flex items-center justify-center gap-2 py-8 text-sm text-text-secondary">
            <Loader2 className="w-4 h-4 animate-spin" />
            Checking for differences...
          </div>
        </Card>
      )}

      {/* No partner / not complete yet */}
      {!isLoading && !bothComplete && (
        <Card>
          <div className="text-center py-8">
            <Users className="w-12 h-12 text-text-secondary/30 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-navy">
              No conflicts to resolve yet
            </h3>
            <p className="text-sm text-text-secondary mt-1 max-w-md mx-auto">
              Both partners need to complete the questionnaire first. Once you
              both finish, any differences will appear here for review.
            </p>
            <Link href="/invite">
              <Button variant="primary" size="md" className="mt-6">
                Invite Your Partner
              </Button>
            </Link>
          </div>
        </Card>
      )}

      {/* Both complete, no conflicts */}
      {!isLoading && bothComplete && totalConflicts === 0 && (
        <Card>
          <div className="text-center py-8">
            <PartyPopper className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-navy">
              Perfect agreement!
            </h3>
            <p className="text-sm text-text-secondary mt-1 max-w-md mx-auto">
              You and your partner answered everything the same way. No
              conflicts to resolve — you&apos;re ready to generate your prenup.
            </p>
            <Link href="/documents">
              <Button variant="primary" size="md" className="mt-6">
                Go to Documents
              </Button>
            </Link>
          </div>
        </Card>
      )}

      {/* Conflicts exist */}
      {!isLoading && bothComplete && totalConflicts > 0 && (
        <>
          {/* Summary bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm text-navy font-medium">
                {totalConflicts} difference{totalConflicts !== 1 ? "s" : ""} found
              </span>
              {resolvedCount > 0 && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                  {resolvedCount} resolved
                </span>
              )}
              {unresolvedCount > 0 && (
                <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                  {unresolvedCount} remaining
                </span>
              )}
            </div>
            <Button variant="secondary" size="sm" onClick={refresh}>
              Refresh
            </Button>
          </div>

          {/* All resolved banner */}
          {allResolved && (
            <div className="rounded-[12px] bg-green-50 border border-green-200 p-5">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-green-800">
                    All conflicts resolved!
                  </p>
                  <p className="text-xs text-green-700 mt-1">
                    You&apos;re ready to generate your prenuptial agreement.
                  </p>
                  <Link href="/documents">
                    <Button variant="primary" size="sm" className="mt-3">
                      Go to Documents
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Conflict cards — unresolved first */}
          <div className="space-y-4">
            {[...conflicts]
              .sort((a, b) => {
                if (a.status === "unresolved" && b.status === "resolved")
                  return -1;
                if (a.status === "resolved" && b.status === "unresolved")
                  return 1;
                return 0;
              })
              .map((conflict) => (
                <ConflictCard
                  key={conflict.id ?? `${conflict.stepId}-${conflict.questionId}`}
                  conflict={conflict}
                  onResolve={resolveConflict}
                  questionLabel={conflict.questionId.replace(/_/g, " ")}
                  stepLabel={STEP_LABELS[conflict.stepId] ?? conflict.stepId}
                />
              ))}
          </div>
        </>
      )}
    </div>
  );
}
