import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type TagProps = {
  children: ReactNode;
  tone?: "flame" | "sage" | "stone";
  className?: string;
};

const tones = {
  flame: "bg-flame-soft text-flame-dark ring-flame/20",
  sage: "bg-[#eef2e6] text-sage ring-sage/20",
  stone: "bg-parchment-deep text-ink-soft ring-ink/10",
};

export function Tag({ children, tone = "stone", className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide uppercase ring-1 ring-inset",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
