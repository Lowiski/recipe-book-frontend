import type { SelectHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  error?: string;
};

export function Select({ className, error, children, ...props }: SelectProps) {
  return (
    <div>
      <select
        aria-invalid={error ? true : undefined}
        className={cn(
          "w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-ink shadow-xs outline-none transition",
          "focus:border-flame focus:ring-4 focus:ring-flame/10",
          error ? "border-red-400" : "border-ink/15",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      {error && <p className="mt-1.5 text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
}
