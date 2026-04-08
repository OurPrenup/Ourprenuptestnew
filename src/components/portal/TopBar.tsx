"use client";

import ProgressBar from "@/components/ui/ProgressBar";
import { useProgress } from "@/lib/ProgressContext";
import { useUserSafe } from "@/lib/hooks/useClerkSafe";
import { Scale, ChevronDown } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function TopBar() {
  const [showAttorney, setShowAttorney] = useState(false);
  const { stepStatuses, percentage } = useProgress();
  const { user } = useUserSafe();

  const progressSegments = stepStatuses.map((s) => ({
    label: s.label,
    completed: s.status === "completed",
  }));

  return (
    <header className="h-16 bg-card border-b border-border flex items-center px-6 gap-6">
      <div className="flex-1 max-w-xl">
        <ProgressBar segments={progressSegments} percentage={percentage} />
      </div>

      <div className="relative ml-auto">
        <button
          onClick={() => setShowAttorney(!showAttorney)}
          className="flex items-center gap-2 text-sm font-medium text-navy hover:text-navy-light transition-colors"
        >
          <Scale className="w-4 h-4" />
          Attorney Services
          <ChevronDown className="w-4 h-4" />
        </button>

        {showAttorney && (
          <div className="absolute right-0 top-full mt-2 w-72 bg-card rounded-[12px] shadow-dropdown border border-border p-4 space-y-3 z-50">
            <h4 className="font-semibold text-navy text-sm">
              Attorney Review
            </h4>
            <p className="text-xs text-text-secondary">
              Get your prenup reviewed by a licensed attorney in your state.
              Includes notarization.
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-navy">$699</span>
              <span className="text-xs text-text-secondary">/ partner</span>
            </div>
            <Link
              href="/attorney"
              className="block w-full bg-navy text-white text-sm font-semibold py-2.5 rounded-full hover:bg-navy-light transition-colors text-center"
            >
              Learn More
            </Link>
          </div>
        )}
      </div>

      {/* User avatar/name */}
      {user && (
        <Link href="/profile" className="flex items-center gap-2 ml-4">
          {user.imageUrl ? (
            <img
              src={user.imageUrl}
              alt=""
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-navy text-white flex items-center justify-center text-xs font-semibold">
              {user.firstName?.[0] ?? user.emailAddresses[0]?.emailAddress[0]?.toUpperCase() ?? "U"}
            </div>
          )}
          <span className="text-sm font-medium text-navy hidden sm:inline">
            {user.firstName ?? "Account"}
          </span>
        </Link>
      )}
    </header>
  );
}
