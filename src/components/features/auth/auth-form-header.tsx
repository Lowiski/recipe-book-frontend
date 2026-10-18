type AuthFormHeaderProps = {
  title: string;
  description: string;
};

export function AuthFormHeader({ title, description }: AuthFormHeaderProps) {
  return (
    <header className="mb-7">
      <h1 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
        {title}
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{description}</p>
    </header>
  );
}
