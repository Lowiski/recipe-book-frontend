type RecipeMetaProps = {
  cuisine: string;
  mealType: string[];
  difficulty: string;
  cookTimeMinutes: number;
};

// The four recipe facts shown on cards, details, and dialogs.
export function RecipeMeta({ cuisine, mealType, difficulty, cookTimeMinutes }: RecipeMetaProps) {
  return (
    <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
      <div>
        <dt className="text-[11px] font-semibold tracking-wider text-ink-faint uppercase">Cuisine</dt>
        <dd className="mt-0.5 font-medium text-ink">{cuisine}</dd>
      </div>
      <div>
        <dt className="text-[11px] font-semibold tracking-wider text-ink-faint uppercase">Meal type</dt>
        <dd className="mt-0.5 font-medium text-ink">{mealType.join(", ")}</dd>
      </div>
      <div>
        <dt className="text-[11px] font-semibold tracking-wider text-ink-faint uppercase">Difficulty</dt>
        <dd className="mt-0.5 font-medium text-ink">{difficulty}</dd>
      </div>
      <div>
        <dt className="text-[11px] font-semibold tracking-wider text-ink-faint uppercase">Cook time</dt>
        <dd className="mt-0.5 font-medium text-ink">{cookTimeMinutes} mins</dd>
      </div>
    </dl>
  );
}
