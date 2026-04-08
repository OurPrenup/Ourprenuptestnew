"use client";

import { Shield, ShieldCheck, ShieldAlert } from "lucide-react";
import type { ResearchDepth } from "@/legal/types";
import { getResearchDepthInfo } from "@/legal/research-depth";

interface ResearchDepthBadgeProps {
  depth: ResearchDepth;
  variant?: "badge" | "inline" | "card";
}

const ICONS = {
  green: ShieldCheck,
  yellow: Shield,
  orange: ShieldAlert,
} as const;

const COLOR_CLASSES = {
  green: {
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    card: "bg-emerald-50/50 border-emerald-200",
    icon: "text-emerald-600",
  },
  yellow: {
    badge: "bg-amber-50 text-amber-700 border-amber-200",
    card: "bg-amber-50/50 border-amber-200",
    icon: "text-amber-600",
  },
  orange: {
    badge: "bg-orange-50 text-orange-700 border-orange-200",
    card: "bg-orange-50/50 border-orange-200",
    icon: "text-orange-600",
  },
} as const;

export default function ResearchDepthBadge({
  depth,
  variant = "badge",
}: ResearchDepthBadgeProps) {
  const info = getResearchDepthInfo(depth);
  const Icon = ICONS[info.color];
  const colors = COLOR_CLASSES[info.color];

  if (variant === "inline") {
    return (
      <span className={`inline-flex items-center gap-1 text-xs ${colors.icon}`}>
        <Icon className="w-3.5 h-3.5" />
        {info.shortMessage}
      </span>
    );
  }

  if (variant === "card") {
    return (
      <div className={`rounded-[12px] border p-4 ${colors.card}`}>
        <div className="flex items-start gap-3">
          <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${colors.icon}`} />
          <div>
            <h4 className={`text-sm font-semibold ${colors.icon} mb-1`}>
              {info.label}
            </h4>
            <p className="text-sm text-navy/70 leading-relaxed">
              {info.message}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Default: badge
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${colors.badge}`}
    >
      <Icon className="w-3.5 h-3.5" />
      {info.label}
    </span>
  );
}
