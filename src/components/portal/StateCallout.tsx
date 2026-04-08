"use client";

import { AlertTriangle, Info } from "lucide-react";

interface StateCalloutProps {
  type: "warning" | "info";
  title: string;
  children: React.ReactNode;
}

export default function StateCallout({ type, title, children }: StateCalloutProps) {
  const isWarning = type === "warning";

  return (
    <div
      className={`rounded-[12px] border p-4 ${
        isWarning
          ? "bg-warning/5 border-warning/20"
          : "bg-teal/5 border-teal/20"
      }`}
    >
      <div className="flex items-start gap-3">
        {isWarning ? (
          <AlertTriangle className="w-5 h-5 text-warning mt-0.5 shrink-0" />
        ) : (
          <Info className="w-5 h-5 text-teal mt-0.5 shrink-0" />
        )}
        <div>
          <h4
            className={`text-sm font-semibold ${
              isWarning ? "text-warning" : "text-teal"
            } mb-1`}
          >
            {title}
          </h4>
          <div className="text-sm text-navy/70 leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}
