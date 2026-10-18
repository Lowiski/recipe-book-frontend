import type { LabelHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  children: ReactNode;
  error?: boolean | string;
};

export function Label({ className, children, error, ...props }: LabelProps) {
  return (
    <label
      className={cn(
        "mb-1.5 block text-[13px] font-semibold tracking-tight",
        error ? "text-red-600" : "text-ink",
        className,
      )}
      {...props}
    >
      {children}
    </label>
  );
}
