"use client";

import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, helperText, error, required, id, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={id} className="block text-base font-medium text-navy">
            {label}
            {required && <span className="text-coral ml-0.5">*</span>}
          </label>
        )}
        {helperText && (
          <p className="text-sm text-text-secondary">{helperText}</p>
        )}
        <input
          ref={ref}
          id={id}
          required={required}
          className={cn(
            "w-full h-12 px-4 rounded-[8px] border text-base text-navy-dark",
            "placeholder:text-text-secondary/60",
            "focus:outline-none focus:ring-2 focus:ring-navy/30 focus:border-navy",
            "transition-colors",
            error ? "border-coral" : "border-border",
            className
          )}
          {...props}
        />
        {error && <p className="text-sm text-coral">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
