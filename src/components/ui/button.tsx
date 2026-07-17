import * as React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "success";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        className={twMerge(
          clsx(
            "inline-flex items-center justify-center rounded border font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
            {
              // Variants
              "bg-primary text-primary-foreground border-primary hover:bg-blue-900 focus-visible:ring-blue-800":
                variant === "primary",
              "bg-secondary text-secondary-foreground border-border hover:bg-slate-200 focus-visible:ring-slate-300":
                variant === "secondary",
              "bg-transparent text-foreground border-border hover:bg-secondary focus-visible:ring-slate-300":
                variant === "outline",
              "bg-transparent text-foreground border-transparent hover:bg-secondary focus-visible:ring-slate-300":
                variant === "ghost",
              "bg-danger text-danger-foreground border-danger hover:bg-red-700 focus-visible:ring-red-600":
                variant === "danger",
              "bg-success text-success-foreground border-success hover:bg-green-700 focus-visible:ring-green-600":
                variant === "success",

              // Sizes
              "h-8 px-3 text-xs": size === "sm",
              "h-10 px-4 text-sm": size === "md",
              "h-12 px-6 text-base": size === "lg",
            },
            className
          )
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
