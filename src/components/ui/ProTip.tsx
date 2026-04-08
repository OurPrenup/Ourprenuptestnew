import { cn } from "@/lib/utils";
import { Lightbulb } from "lucide-react";

interface ProTipProps {
  children: React.ReactNode;
  className?: string;
}

export default function ProTip({ children, className }: ProTipProps) {
  return (
    <div
      className={cn(
        "rounded-[12px] px-5 py-4",
        "bg-gradient-to-br from-[#E8DEF8] via-[#D1C4E9] to-[#E3F2FD]",
        className
      )}
    >
      <div className="flex gap-2 items-start">
        <Lightbulb className="w-5 h-5 text-navy shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-bold text-navy mb-1">Pro Tip</p>
          <div className="text-sm text-navy/80">{children}</div>
        </div>
      </div>
    </div>
  );
}
