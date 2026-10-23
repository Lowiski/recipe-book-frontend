import { useEffect, useState } from "react";
import { getAllRecipesService, type AdminRecipe } from "@/services/recipe-service";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { AdminRecipesTable } from "./admin-recipes-table";

export function AdminRecipes() {
  const [recipes, setRecipes] = useState<AdminRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reload, setReload] = useState(0);

  useEffect(
    function fetchAllRecipes() {
      let active = true;

      async function loadRecipes() {
        setLoading(true);
        setError("");

        try {
          const rows = await getAllRecipesService();
          if (active) setRecipes(rows);
        } catch {
          if (active) setError("Unable to load recipes. Please try again.");
        } finally {
          if (active) setLoading(false);
        }
      }

      loadRecipes();

      return function cleanup() {
        active = false;
      };
    },
    [reload],
  );

  function handleRefresh() {
    setReload((current) => current + 1);
  }

  return (
    <section aria-label="All recipes">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-ink-soft">
          {loading
            ? "Loading recipes…"
            : `${recipes.length} ${recipes.length === 1 ? "recipe" : "recipes"} across all accounts`}
        </p>
        <Button variant="secondary" disabled={loading} onClick={handleRefresh}>
          ↻ Refresh
        </Button>
      </div>

      {error ? (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </p>
      ) : loading ? (
        <Spinner label="Loading all recipes…" />
      ) : (
        <AdminRecipesTable recipes={recipes} loading={loading} />
      )}
    </section>
  );
}
