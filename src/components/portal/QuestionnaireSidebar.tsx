"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { questionnaireSteps } from "@/lib/questionnaire";
import { useProgress } from "@/lib/ProgressContext";
import { ArrowLeft, Check, Lock } from "lucide-react";

interface QuestionnaireSidebarProps {
  expanded: boolean;
  pathname: string;
}

export default function QuestionnaireSidebar({
  expanded,
  pathname,
}: QuestionnaireSidebarProps) {
  const { isCompleted } = useProgress();

  const completedCount = questionnaireSteps.filter((s) =>
    isCompleted(s.id)
  ).length;

  return (
    <div className="flex flex-col h-full">
      {/* Back to Dashboard */}
      <div className="px-3 mb-2">
        <Link
          href="/dashboard"
          className={cn(
            "flex items-center gap-3 h-10 rounded-[12px] transition-colors text-text-secondary hover:text-navy hover:bg-navy/5",
            expanded ? "px-3" : "justify-center"
          )}
        >
          <ArrowLeft className="w-5 h-5 shrink-0" />
          {expanded && (
            <span className="text-sm font-medium whitespace-nowrap">
              Back to Dashboard
            </span>
          )}
        </Link>
      </div>

      {/* Section label */}
      {expanded && (
        <div className="px-6 mb-3">
          <span className="text-xs font-bold text-text-secondary/60 uppercase tracking-wider">
            Questionnaire
          </span>
        </div>
      )}

      {/* Step list */}
      <nav className="flex-1 space-y-0.5 px-3">
        {questionnaireSteps.map((step, index) => {
          const completed = isCompleted(step.id);
          const isCurrent = pathname.startsWith(step.path);
          const isLocked = step.locked && !completed;

          // Determine which steps are accessible
          const canNavigate = completed || isCurrent || !isLocked;

          const stepContent = (
            <div
              className={cn(
                "flex items-center gap-3 h-11 rounded-[12px] transition-colors",
                expanded ? "px-3" : "justify-center",
                isCurrent
                  ? "bg-navy text-white"
                  : completed
                    ? "text-navy hover:bg-navy/5"
                    : isLocked
                      ? "text-text-secondary/40 cursor-not-allowed"
                      : "text-navy/60 hover:bg-navy/5"
              )}
            >
              {/* Step indicator */}
              <div
                className={cn(
                  "w-7 h-7 flex items-center justify-center rounded-full shrink-0 text-xs font-bold",
                  isCurrent
                    ? "bg-white/20 text-white"
                    : completed
                      ? "bg-success/15 text-success"
                      : isLocked
                        ? "bg-disabled/10 text-text-secondary/40"
                        : "bg-navy/10 text-navy/60"
                )}
              >
                {completed ? (
                  <Check className="w-3.5 h-3.5" />
                ) : isLocked ? (
                  <Lock className="w-3 h-3" />
                ) : (
                  index + 1
                )}
              </div>

              {expanded && (
                <span className="text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                  {step.label}
                </span>
              )}
            </div>
          );

          if (canNavigate) {
            return (
              <Link key={step.id} href={step.path}>
                {stepContent}
              </Link>
            );
          }

          return (
            <div key={step.id} aria-disabled="true">
              {stepContent}
            </div>
          );
        })}
      </nav>

      {/* Progress counter */}
      <div className="px-3 py-4 border-t border-border">
        <div
          className={cn(
            "flex items-center gap-3",
            expanded ? "px-3" : "justify-center"
          )}
        >
          {/* Mini progress ring */}
          <div className="w-8 h-8 relative shrink-0">
            <svg className="w-8 h-8 -rotate-90" viewBox="0 0 32 32">
              <circle
                cx="16"
                cy="16"
                r="12"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="text-border"
              />
              <circle
                cx="16"
                cy="16"
                r="12"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="text-success"
                strokeDasharray={`${(completedCount / questionnaireSteps.length) * 75.4} 75.4`}
                strokeLinecap="round"
              />
            </svg>
          </div>
          {expanded && (
            <span className="text-xs font-medium text-text-secondary">
              {completedCount} of {questionnaireSteps.length} complete
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
