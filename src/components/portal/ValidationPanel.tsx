"use client";

import { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import {
  AlertCircle,
  AlertTriangle,
  Info,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Shield,
  Loader2,
} from "lucide-react";
import type { ValidationSummary, ValidationResult } from "@/legal/validators";

// ---------------------------------------------------------------------------
// Severity display config
// ---------------------------------------------------------------------------

const SEVERITY_CONFIG = {
  error: {
    icon: AlertCircle,
    iconColor: "text-red-500",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    label: "Error",
  },
  warning: {
    icon: AlertTriangle,
    iconColor: "text-amber-500",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    label: "Warning",
  },
  info: {
    icon: Info,
    iconColor: "text-blue-500",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    label: "Info",
  },
};

// ---------------------------------------------------------------------------
// Single validation item
// ---------------------------------------------------------------------------

function ValidationItem({ item }: { item: ValidationResult }) {
  const config = SEVERITY_CONFIG[item.severity];
  const Icon = config.icon;

  return (
    <div
      className={`rounded-lg ${config.bgColor} border ${config.borderColor} p-3`}
    >
      <div className="flex items-start gap-2.5">
        <Icon className={`w-4 h-4 ${config.iconColor} mt-0.5 shrink-0`} />
        <div className="flex-1 min-w-0">
          <p className="text-sm text-navy/90">{item.message}</p>
          {item.stateSpecific && (
            <span className="inline-block mt-1 text-xs bg-white/60 text-navy/50 px-2 py-0.5 rounded-full">
              State-specific
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main ValidationPanel
// ---------------------------------------------------------------------------

interface ValidationPanelProps {
  /** If provided, renders this validation data. Otherwise fetches from API. */
  validation?: ValidationSummary | null;
  /** Whether to auto-fetch from the API on mount */
  autoFetch?: boolean;
  /** Compact mode — collapsed by default */
  compact?: boolean;
}

export default function ValidationPanel({
  validation: externalValidation,
  autoFetch = false,
  compact = false,
}: ValidationPanelProps) {
  const [validation, setValidation] = useState<ValidationSummary | null>(
    externalValidation ?? null
  );
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(!compact);

  // Sync external validation
  useEffect(() => {
    if (externalValidation !== undefined) {
      setValidation(externalValidation);
    }
  }, [externalValidation]);

  // Auto-fetch from API
  useEffect(() => {
    if (!autoFetch || externalValidation) return;

    let cancelled = false;
    async function fetch_() {
      setLoading(true);
      try {
        const res = await fetch("/api/validate");
        if (res.ok) {
          const data = await res.json();
          if (!cancelled) setValidation(data);
        }
      } catch {
        // Silently fail
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetch_();
    return () => {
      cancelled = true;
    };
  }, [autoFetch, externalValidation]);

  if (loading) {
    return (
      <Card>
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <Loader2 className="w-4 h-4 animate-spin" />
          Running legal validation...
        </div>
      </Card>
    );
  }

  if (!validation) return null;

  const totalIssues = validation.all.length;

  return (
    <Card>
      {/* Header */}
      <button
        onClick={() => setExpanded((e) => !e)}
        className="flex items-center justify-between w-full text-left"
      >
        <div className="flex items-center gap-3">
          <Shield
            className={`w-5 h-5 ${
              validation.isValid ? "text-green-600" : "text-amber-500"
            }`}
          />
          <div>
            <h3 className="text-sm font-semibold text-navy">
              Legal Validation
            </h3>
            <p className="text-xs text-text-secondary mt-0.5">
              {validation.isValid ? (
                <span className="text-green-600">
                  <CheckCircle className="w-3 h-3 inline mr-1" />
                  No blocking issues found
                </span>
              ) : (
                <>
                  {validation.errors.length} error
                  {validation.errors.length !== 1 ? "s" : ""}
                  {validation.warnings.length > 0 &&
                    `, ${validation.warnings.length} warning${
                      validation.warnings.length !== 1 ? "s" : ""
                    }`}
                </>
              )}
              {validation.infos.length > 0 &&
                ` · ${validation.infos.length} note${
                  validation.infos.length !== 1 ? "s" : ""
                }`}
            </p>
          </div>
        </div>
        {totalIssues > 0 &&
          (expanded ? (
            <ChevronUp className="w-4 h-4 text-text-secondary" />
          ) : (
            <ChevronDown className="w-4 h-4 text-text-secondary" />
          ))}
      </button>

      {/* Items */}
      {expanded && totalIssues > 0 && (
        <div className="mt-4 space-y-2">
          {/* Errors first, then warnings, then infos */}
          {validation.errors.map((item, i) => (
            <ValidationItem key={`error-${i}`} item={item} />
          ))}
          {validation.warnings.map((item, i) => (
            <ValidationItem key={`warning-${i}`} item={item} />
          ))}
          {validation.infos.map((item, i) => (
            <ValidationItem key={`info-${i}`} item={item} />
          ))}
        </div>
      )}
    </Card>
  );
}
