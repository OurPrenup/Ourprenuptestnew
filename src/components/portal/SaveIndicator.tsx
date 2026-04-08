"use client";

import { Check, Loader2, AlertCircle } from "lucide-react";

interface SaveIndicatorProps {
  isSaving: boolean;
  error: string | null;
}

export default function SaveIndicator({ isSaving, error }: SaveIndicatorProps) {
  if (error) {
    return (
      <span className="flex items-center gap-1.5 text-xs text-coral">
        <AlertCircle className="w-3.5 h-3.5" />
        Save failed
      </span>
    );
  }

  if (isSaving) {
    return (
      <span className="flex items-center gap-1.5 text-xs text-text-secondary">
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
        Saving...
      </span>
    );
  }

  return (
    <span className="flex items-center gap-1.5 text-xs text-green-600">
      <Check className="w-3.5 h-3.5" />
      Saved
    </span>
  );
}
