import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-ink/10 bg-white shadow-sm shadow-ink/5",
        className,
      )}
    >
      {children}
    </div>
  );
}
