"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface SelectionCardProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  description?: string;
}

export default function SelectionCard({
  label,
  selected,
  onClick,
  description,
}: SelectionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full text-left p-4 rounded-[12px] border transition-all",
        "flex items-center gap-3",
        selected
          ? "bg-success-light border-success"
          : "bg-card border-border hover:border-navy/30"
      )}
    >
      <div
        className={cn(
          "w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors",
          selected ? "bg-success border-success" : "border-disabled"
        )}
      >
        {selected && <Check className="w-4 h-4 text-white" />}
      </div>
      <div>
        <span className="text-base font-medium text-navy">{label}</span>
        {description && (
          <p className="text-sm text-text-secondary mt-0.5">{description}</p>
        )}
      </div>
    </button>
  );
}
