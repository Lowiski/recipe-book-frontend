import type { TableHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function Table({ className, ...props }: TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-ink/10 bg-white shadow-sm shadow-ink/5">
      <table
        className={cn(
          "w-full text-left text-sm",
          "[&_th]:px-5 [&_th]:py-3.5 [&_th]:text-xs [&_th]:font-semibold [&_th]:tracking-wider [&_th]:uppercase [&_th]:text-ink-soft",
          "[&_td]:px-5 [&_td]:py-4",
          "[&_thead]:bg-parchment-deep",
          "[&_tbody_tr]:border-t [&_tbody_tr]:border-ink/8",
          className,
        )}
        {...props}
      />
    </div>
  );
}
