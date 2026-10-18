type SpinnerProps = {
  label?: string;
};

export function Spinner({ label = "Loading…" }: SpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-14 text-ink-soft">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-flame-soft border-t-flame" />
      <p className="text-sm">{label}</p>
    </div>
  );
}
