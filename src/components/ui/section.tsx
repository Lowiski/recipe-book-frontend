import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  className?: string;
};

// Shared page width and padding keep every screen aligned.
export function Section({ children, className }: SectionProps) {
  return (
    <section className={`mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8 ${className ?? ""}`}>
      {children}
    </section>
  );
}
