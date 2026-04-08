"use client";

import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import ProTip from "@/components/ui/ProTip";
import SelectionCard from "@/components/ui/SelectionCard";
import type { Question } from "@/lib/questionnaire/introduction";

interface QuestionCardProps {
  question: Question;
  value: string | string[];
  onChange: (value: string | string[]) => void;
  /** Field-level validation error message */
  error?: string;
}

export default function QuestionCard({
  question,
  value,
  onChange,
  error,
}: QuestionCardProps) {
  const renderInput = () => {
    switch (question.type) {
      case "info":
        return null;

      case "text":
      case "date":
        return (
          <div className="max-w-[560px]">
            <Input
              id={question.id}
              type={question.type === "date" ? "date" : "text"}
              value={value as string}
              onChange={(e) => onChange(e.target.value)}
              required={question.required}
            />
          </div>
        );

      case "select":
        return (
          <div className="max-w-[560px]">
            <select
              id={question.id}
              value={value as string}
              onChange={(e) => onChange(e.target.value)}
              required={question.required}
              className="w-full h-12 px-4 rounded-[8px] border border-border text-base text-navy-dark bg-card focus:outline-none focus:ring-2 focus:ring-navy/30 focus:border-navy transition-colors appearance-none"
            >
              <option value="">Select...</option>
              {question.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        );

      case "radio":
        return (
          <div className="space-y-3 max-w-[560px]">
            {question.options?.map((opt) => (
              <SelectionCard
                key={opt.value}
                label={opt.label}
                description={opt.description}
                selected={value === opt.value}
                onClick={() => onChange(opt.value)}
              />
            ))}
          </div>
        );

      case "multi-select":
        return (
          <div className="space-y-3">
            {question.options?.map((opt) => {
              const selected = Array.isArray(value) && value.includes(opt.value);
              return (
                <SelectionCard
                  key={opt.value}
                  label={opt.label}
                  description={opt.description}
                  selected={selected}
                  onClick={() => {
                    const currentValues = Array.isArray(value) ? value : [];
                    if (selected) {
                      onChange(currentValues.filter((v) => v !== opt.value));
                    } else {
                      onChange([...currentValues, opt.value]);
                    }
                  }}
                />
              );
            })}
          </div>
        );

      default:
        return null;
    }
  };

  if (question.type === "info") {
    return (
      <div className="space-y-4">
        <div className="rounded-[12px] bg-gradient-to-br from-teal/5 via-teal/10 to-navy/5 border border-teal/20 p-5">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-teal/20 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-teal text-sm">ℹ</span>
            </div>
            <div>
              <h3 className="text-base font-semibold text-navy mb-1">
                {question.question}
              </h3>
              {question.helperText && (
                <p className="text-sm text-navy/70 leading-relaxed">
                  {question.helperText}
                </p>
              )}
            </div>
          </div>
        </div>
        {question.proTip && <ProTip>{question.proTip}</ProTip>}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <div className="space-y-4">
          <div>
            <h3 className="text-base font-semibold text-navy">
              {question.question}
              {question.required && (
                <span className="text-coral ml-0.5">*</span>
              )}
            </h3>
            {question.helperText && (
              <p className="text-sm text-text-secondary mt-1">
                {question.helperText}
              </p>
            )}
          </div>
          {renderInput()}
          {error && (
            <p className="text-sm text-coral mt-1">{error}</p>
          )}
        </div>
      </Card>

      {question.proTip && <ProTip>{question.proTip}</ProTip>}
    </div>
  );
}
