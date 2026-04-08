"use client";

import { cn } from "@/lib/utils";
import { LucideIcon, Lock } from "lucide-react";
import Link from "next/link";

interface DashboardCardProps {
  icon: LucideIcon;
  iconBg: string;
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
  status: "active" | "locked" | "completed";
  stepNumber: number;
}

export default function DashboardCard({
  icon: Icon,
  iconBg,
  title,
  description,
  ctaLabel,
  href,
  status,
  stepNumber,
}: DashboardCardProps) {
  const isLocked = status === "locked";
  const isCompleted = status === "completed";

  return (
    <div
      className={cn(
        "bg-card rounded-[12px] shadow-card p-6 flex items-center gap-5 transition-shadow",
        !isLocked && "hover:shadow-card-hover"
      )}
    >
      {/* Step number & icon */}
      <div className="flex items-center gap-4">
        <span
          className={cn(
            "text-sm font-bold w-7 h-7 rounded-full flex items-center justify-center shrink-0",
            isLocked
              ? "bg-disabled/20 text-disabled"
              : isCompleted
              ? "bg-success-light text-success"
              : "bg-navy/10 text-navy"
          )}
        >
          {stepNumber}
        </span>
        <div
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center shrink-0",
            isLocked ? "bg-gray-100" : iconBg
          )}
        >
          <Icon
            className={cn(
              "w-6 h-6",
              isLocked ? "text-disabled" : "text-navy"
            )}
          />
        </div>
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <h3
          className={cn(
            "text-lg font-semibold",
            isLocked ? "text-disabled" : "text-navy"
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            "text-sm mt-0.5",
            isLocked ? "text-disabled" : "text-text-secondary"
          )}
        >
          {description}
        </p>
      </div>

      {/* CTA */}
      {isLocked ? (
        <button
          disabled
          className="flex items-center gap-2 bg-disabled text-white/60 px-5 py-2.5 rounded-full text-sm font-semibold cursor-not-allowed shrink-0"
        >
          <Lock className="w-4 h-4" />
          {ctaLabel}
        </button>
      ) : (
        <Link
          href={href}
          className={cn(
            "px-5 py-2.5 rounded-full text-sm font-semibold shrink-0 transition-colors",
            isCompleted
              ? "bg-success text-white hover:bg-success/90"
              : "bg-navy text-white hover:bg-navy-light"
          )}
        >
          {isCompleted ? "Review" : ctaLabel}
        </Link>
      )}
    </div>
  );
}
