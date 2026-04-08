import { cn } from "@/lib/utils";

interface ProgressBarProps {
  segments: { label: string; completed: boolean }[];
  percentage?: number;
  className?: string;
}

export default function ProgressBar({ segments, percentage: overridePercentage, className }: ProgressBarProps) {
  const completedCount = segments.filter((s) => s.completed).length;
  const percentage = overridePercentage ?? Math.round((completedCount / segments.length) * 100);

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center gap-1">
        {segments.map((segment, i) => (
          <div
            key={i}
            className={cn(
              "h-1.5 flex-1 rounded-[3px] transition-colors",
              segment.completed ? "bg-navy" : "bg-disabled/40"
            )}
            title={segment.label}
          />
        ))}
      </div>
      <p className="text-right text-xs text-text-secondary mt-1">
        {percentage}% complete
      </p>
    </div>
  );
}
