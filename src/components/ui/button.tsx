import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md";
  children: ReactNode;
};

const variants = {
  primary:
    "bg-flame text-white shadow-sm shadow-flame/25 hover:bg-flame-dark focus-visible:outline-flame",
  secondary:
    "border border-ink/15 bg-white text-ink hover:border-flame/40 hover:text-flame focus-visible:outline-flame",
  ghost: "text-ink-soft hover:bg-ink/5 hover:text-ink focus-visible:outline-ink",
  danger:
    "border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 focus-visible:outline-red-500",
};

const sizes = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2.5 text-sm",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl font-medium transition-all duration-150",
        "focus-visible:outline-2 focus-visible:outline-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-55",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
