"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import {
  GitCompareArrows,
  CheckCircle2,
  User,
  Users,
  MessageSquare,
} from "lucide-react";
import type { ConflictItem } from "@/lib/types/collaboration";

interface ConflictCardProps {
  conflict: ConflictItem;
  onResolve: (conflictId: string, resolvedAnswer: unknown) => Promise<boolean>;
  /** Human-readable label for this question */
  questionLabel?: string;
  /** Human-readable label for the step */
  stepLabel?: string;
}

function formatAnswer(answer: unknown): string {
  if (answer === null || answer === undefined) return "(no answer)";
  if (Array.isArray(answer)) {
    return answer.length === 0 ? "(none selected)" : answer.join(", ");
  }
  if (typeof answer === "string") return answer || "(empty)";
  return JSON.stringify(answer);
}

export default function ConflictCard({
  conflict,
  onResolve,
  questionLabel,
  stepLabel,
}: ConflictCardProps) {
  const [isResolving, setIsResolving] = useState(false);
  const [customAnswer, setCustomAnswer] = useState("");
  const [showCustom, setShowCustom] = useState(false);
  const isResolved = conflict.status === "resolved";

  const handleResolve = async (answer: unknown) => {
    if (!conflict.id) return;
    setIsResolving(true);
    await onResolve(conflict.id, answer);
    setIsResolving(false);
  };

  return (
    <Card
      className={
        isResolved
          ? "border-green-200 bg-green-50/30"
          : "border-amber-200 bg-amber-50/30"
      }
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-2">
          {isResolved ? (
            <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
          ) : (
            <GitCompareArrows className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
          )}
          <div>
            <h3 className="text-sm font-semibold text-navy">
              {questionLabel || conflict.questionId}
            </h3>
            {stepLabel && (
              <p className="text-xs text-text-secondary">{stepLabel}</p>
            )}
          </div>
        </div>
        {isResolved && (
          <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
            Resolved
          </span>
        )}
      </div>

      {/* Side-by-side answers */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="rounded-lg bg-white border border-border p-3">
          <div className="flex items-center gap-1.5 mb-1.5">
            <User className="w-3.5 h-3.5 text-navy/50" />
            <span className="text-xs font-semibold text-navy/60 uppercase">
              You
            </span>
          </div>
          <p className="text-sm text-navy">
            {formatAnswer(conflict.primaryAnswer)}
          </p>
        </div>
        <div className="rounded-lg bg-white border border-border p-3">
          <div className="flex items-center gap-1.5 mb-1.5">
            <Users className="w-3.5 h-3.5 text-navy/50" />
            <span className="text-xs font-semibold text-navy/60 uppercase">
              Partner
            </span>
          </div>
          <p className="text-sm text-navy">
            {formatAnswer(conflict.partnerAnswer)}
          </p>
        </div>
      </div>

      {/* Resolution */}
      {isResolved ? (
        <div className="rounded-lg bg-green-50 border border-green-200 p-3">
          <p className="text-xs font-semibold text-green-700 mb-1">
            Agreed Answer
          </p>
          <p className="text-sm text-green-800">
            {formatAnswer(conflict.resolvedAnswer)}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-navy/60 uppercase">
            Choose a resolution
          </p>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="secondary"
              size="sm"
              disabled={isResolving}
              onClick={() => handleResolve(conflict.primaryAnswer)}
            >
              Use yours
            </Button>
            <Button
              variant="secondary"
              size="sm"
              disabled={isResolving}
              onClick={() => handleResolve(conflict.partnerAnswer)}
            >
              Use partner&apos;s
            </Button>
            <Button
              variant="secondary"
              size="sm"
              disabled={isResolving}
              onClick={() => setShowCustom(!showCustom)}
            >
              <MessageSquare className="w-3.5 h-3.5 mr-1" />
              Compromise
            </Button>
          </div>

          {showCustom && (
            <div className="flex gap-2 mt-2">
              <input
                type="text"
                value={customAnswer}
                onChange={(e) => setCustomAnswer(e.target.value)}
                placeholder="Enter agreed answer..."
                className="flex-1 h-10 px-3 rounded-lg border border-border text-sm text-navy focus:outline-none focus:ring-2 focus:ring-navy/30"
              />
              <Button
                variant="primary"
                size="sm"
                disabled={isResolving || !customAnswer.trim()}
                onClick={() => handleResolve(customAnswer.trim())}
              >
                Save
              </Button>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
