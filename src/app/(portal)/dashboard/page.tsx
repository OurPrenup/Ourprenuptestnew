"use client";

import DashboardCard from "@/components/portal/DashboardCard";
import { useProgress } from "@/lib/ProgressContext";
import {
  UserPlus,
  ClipboardList,
  DollarSign,
  Users,
  FileText,
  Scale,
  Stamp,
  TrendingUp,
  Clock,
  type LucideIcon,
} from "lucide-react";

interface StepConfig {
  id: string;
  icon: LucideIcon;
  iconBg: string;
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
}

const stepConfigs: StepConfig[] = [
  {
    id: "invite",
    icon: UserPlus,
    iconBg: "bg-pink/10",
    title: "Invite Your Partner",
    description:
      "Send an invite to your future spouse (woohoo!) to start collaborating.",
    ctaLabel: "Send Invite",
    href: "/invite",
  },
  {
    id: "questionnaire",
    icon: ClipboardList,
    iconBg: "bg-purple/10",
    title: "Complete Questionnaire",
    description:
      "Answer questions about your assets, debts, and preferences for your prenup.",
    ctaLabel: "Start",
    href: "/questionnaire/introduction",
  },
  {
    id: "financial-disclosure",
    icon: DollarSign,
    iconBg: "bg-teal/10",
    title: "Financial Disclosure",
    description:
      "Disclose your assets, debts, income, and property for full transparency.",
    ctaLabel: "Start",
    href: "/financial-disclosure",
  },
  {
    id: "collaboration",
    icon: Users,
    iconBg: "bg-warning/10",
    title: "Collaboration Station",
    description:
      "Review and resolve any differences between you and your partner\u2019s answers.",
    ctaLabel: "Collaborate",
    href: "/collaboration",
  },
  {
    id: "documents",
    icon: FileText,
    iconBg: "bg-coral/10",
    title: "Generate Your Prenup",
    description:
      "We\u2019ll generate your custom prenuptial agreement based on your answers.",
    ctaLabel: "Generate",
    href: "/documents",
  },
  {
    id: "attorney",
    icon: Scale,
    iconBg: "bg-lavender",
    title: "Attorney Representation",
    description:
      "Connect with a licensed attorney in your state for independent legal review.",
    ctaLabel: "Get Attorney",
    href: "/attorney",
  },
  {
    id: "review-notarize",
    icon: Stamp,
    iconBg: "bg-success-light",
    title: "E-Sign & Notarize",
    description:
      "Electronically sign and notarize your completed prenuptial agreement.",
    ctaLabel: "Sign",
    href: "/review-notarize",
  },
];

export default function DashboardPage() {
  const { stepStatuses, percentage } = useProgress();

  // Map step statuses to the step configs
  const stepsWithStatus = stepConfigs.map((config) => {
    const status = stepStatuses.find((s) => s.id === config.id);
    return {
      ...config,
      status: (status?.status ?? "locked") as "active" | "locked" | "completed",
    };
  });

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-normal text-navy-dark font-[family-name:var(--font-heading)]">
          Congratulations on your upcoming marriage! 🎊
        </h1>
        <p className="text-text-secondary mt-2 text-lg">
          Let&apos;s get your prenuptial agreement set up. Follow the steps
          below to get started.
        </p>
      </div>

      {/* Progress Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card rounded-[12px] shadow-card p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-navy/10 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-navy" />
          </div>
          <div>
            <p className="text-2xl font-bold text-navy">{percentage}%</p>
            <p className="text-sm text-text-secondary">Overall Progress</p>
          </div>
        </div>
        <div className="bg-card rounded-[12px] shadow-card p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-success-light flex items-center justify-center">
            <span className="text-lg">✅</span>
          </div>
          <div>
            <p className="text-2xl font-bold text-navy">
              {stepStatuses.filter((s) => s.status === "completed").length}
              <span className="text-base font-normal text-text-secondary">
                {" "}
                / {stepStatuses.length}
              </span>
            </p>
            <p className="text-sm text-text-secondary">Steps Completed</p>
          </div>
        </div>
        <div className="bg-card rounded-[12px] shadow-card p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-teal/10 flex items-center justify-center">
            <Clock className="w-6 h-6 text-teal" />
          </div>
          <div>
            <p className="text-2xl font-bold text-navy">~45 min</p>
            <p className="text-sm text-text-secondary">Estimated Time Left</p>
          </div>
        </div>
      </div>

      {/* Process Overview */}
      <div className="rounded-[16px] bg-gradient-to-br from-[#FCE4EC] via-[#F3E5F5] to-[#EDE7F6] p-6">
        <p className="text-sm font-semibold text-navy mb-4">
          Here&apos;s what to expect for this process:
        </p>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl mb-1">📋</div>
            <p className="text-sm font-medium text-navy">Fill out</p>
            <p className="text-xs text-text-secondary">questionnaire</p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-1">👤</div>
            <p className="text-sm font-medium text-navy">Connect with</p>
            <p className="text-xs text-text-secondary">attorney</p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-1">✅</div>
            <p className="text-sm font-medium text-navy">E-sign &</p>
            <p className="text-xs text-text-secondary">notarize</p>
          </div>
        </div>
      </div>

      {/* Step cards */}
      <div className="space-y-4">
        {stepsWithStatus.map((step, i) => (
          <DashboardCard key={step.href} stepNumber={i + 1} {...step} />
        ))}
      </div>

      {/* Social proof / encouragement */}
      <div className="rounded-[12px] bg-gradient-to-r from-teal/5 via-teal/10 to-navy/5 border border-teal/20 p-5 text-center">
        <p className="text-sm text-navy font-medium">
          💡 Most couples complete their prenup in under 45 minutes.
        </p>
        <p className="text-xs text-text-secondary mt-1">
          You can save your progress and come back anytime.
        </p>
      </div>
    </div>
  );
}
