import { useEffect, useState } from "react";
import { getRecipeService, type Recipe } from "@/services/recipe-service";
import { RecipeMeta } from "@/components/common/recipe-meta";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import { Spinner } from "@/components/ui/spinner";
import { UpdateRecipeForm } from "./update-recipe-form";

export function RecipeDetails({ id }: { id: string }) {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function fetchRecipe() {
      let active = true;

      async function loadRecipe() {
        try {
          const result = await getRecipeService(id);
          if (active) {
            setRecipe(result);
            setError("");
          }
        } catch {
          if (active) setError("Recipe not found, or you do not have access to it.");
        } finally {
          if (active) setLoading(false);
        }
      }

      loadRecipe();

      return function cleanup() {
        active = false;
      };
    },
    [id],
  );

  function handleUpdated(updatedRecipe: Recipe) {
    setRecipe(updatedRecipe);
    setOpen(false);
  }

  if (loading) return <Spinner label="Plating your recipe…" />;

  if (error || !recipe) {
    return (
      <p role="alert" className="mt-8 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
        {error || "Recipe not found."}
      </p>
    );
  }

  return (
    <>
      <Card className="mt-6 overflow-hidden">
        <div className="relative aspect-[21/9] bg-parchment-deep">
          <img src={recipe.image} alt={recipe.name} className="h-full w-full object-cover" />
        </div>

        <div className="p-6 sm:p-10">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold tracking-wider text-flame uppercase">
                {recipe.cuisine} · {recipe.difficulty}
              </p>
              <h1 className="font-display mt-2 text-3xl leading-tight font-semibold tracking-tight text-ink sm:text-4xl">
                {recipe.name}
              </h1>
            </div>
            <Button onClick={() => setOpen(true)}>Update recipe</Button>
          </div>

          <div className="mt-8 border-y border-ink/10 py-6">
            <RecipeMeta
              cuisine={recipe.cuisine}
              mealType={recipe.mealType}
              difficulty={recipe.difficulty}
              cookTimeMinutes={recipe.cookTimeMinutes}
            />
          </div>

          {recipe.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {recipe.tags.map((tag) => (
                <Tag key={tag} tone="flame">
                  {tag}
                </Tag>
              ))}
            </div>
          )}

          <div className="mt-10 grid gap-10 lg:grid-cols-[320px_1fr]">
            <div>
              <h2 className="font-display text-lg font-semibold text-ink">Ingredients</h2>
              <ul className="mt-4 space-y-2.5">
                {recipe.ingredients.map((ingredient, index) => (
                  <li
                    key={`${ingredient}-${index}`}
                    className="flex items-start gap-3 text-sm leading-relaxed text-ink-soft"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-flame" />
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-display text-lg font-semibold text-ink">Instructions</h2>
              <ol className="mt-4 space-y-4">
                {recipe.instructions.map((instruction, index) => (
                  <li key={`${instruction}-${index}`} className="flex gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-flame-soft text-xs font-bold text-flame-dark">
                      {index + 1}
                    </span>
                    <p className="pt-0.5 text-sm leading-relaxed text-ink-soft">{instruction}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </Card>

      <Modal open={open} onClose={() => setOpen(false)} title="Update recipe">
        <UpdateRecipeForm recipe={recipe} onSuccess={handleUpdated} />
      </Modal>
    </>
  );
}
