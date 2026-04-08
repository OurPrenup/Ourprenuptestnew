"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "disabled" | "text";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", disabled, children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/50 rounded-full";

    const variants = {
      primary: "bg-navy text-white hover:bg-navy-light",
      secondary: "bg-transparent text-navy border border-navy hover:bg-navy/5",
      disabled: "bg-disabled text-white/60 cursor-not-allowed",
      text: "bg-transparent text-pink hover:text-coral p-0 rounded-none",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3.5 text-base",
      lg: "px-8 py-4 text-lg",
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          disabled ? variants.disabled : variants[variant],
          variant !== "text" && sizes[size],
          className
        )}
        disabled={disabled || variant === "disabled"}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
