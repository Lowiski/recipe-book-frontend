// Decorative brand panel shown beside the auth forms on wide screens.
export function BrandPanel() {
  return (
    <div className="auth-backdrop relative hidden w-full overflow-hidden lg:flex lg:w-[46%] lg:flex-col lg:justify-between lg:p-12">
      <div className="relative z-10">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-2xl backdrop-blur">
            🍲
          </span>
          <span className="font-display text-2xl font-semibold text-parchment">Recipe Book</span>
        </div>
      </div>

      <div className="relative z-10">
        <p className="font-display text-4xl leading-tight font-semibold text-parchment xl:text-5xl">
          Every favorite meal,
          <br />
          <span className="text-amber-300">one warm place.</span>
        </p>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-parchment/70">
          Save family classics, weeknight experiments, and everything in between.
          Organize ingredients, track cook times, and rediscover what you love to make.
        </p>
      </div>

      <ul className="relative z-10 space-y-3 text-sm text-parchment/80">
        {["Personal recipe collection", "Ingredients & step-by-step instructions", "Admin dashboard across all accounts"].map(
          (feature) => (
            <li key={feature} className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
              {feature}
            </li>
          ),
        )}
      </ul>

      {/* Soft blurred orbs add depth behind the content. */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-flame/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-saffron/20 blur-3xl" />
    </div>
  );
}
