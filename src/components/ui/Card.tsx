import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export default function Card({ className, hover, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "bg-card rounded-[12px] shadow-card p-6",
        hover && "hover:shadow-card-hover transition-shadow",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
