import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { useAuth } from "@/components/context/use-auth";
import {
  deleteRecipeService,
  getRecipesService,
  type Recipe,
} from "@/services/recipe-service";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { RecipeCard } from "./recipe-card";
import { AddRecipeForm } from "./add-recipe-form";

// Owns the personal collection: fetching, adding, and deleting recipes.
export function RecipeCollection() {
  const { user, ready } = useAuth();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(function fetchRecipes() {
    if (!ready || !user) return;

    let active = true;

    async function loadRecipes() {
      try {
        const result = await getRecipesService();
        if (active) {
          setRecipes(result);
          setError("");
        }
      } catch {
        if (active) setError("Unable to load recipes. Please try again.");
      } finally {
        if (active) setLoading(false);
      }
    }

    loadRecipes();

    // Ignore late responses after sign-out or unmount.
    return function cleanup() {
      active = false;
    };
  }, [ready, user]);

  async function handleDelete(id: string) {
    if (!window.confirm("Delete this recipe? This cannot be undone.")) return;
    try {
      await deleteRecipeService(id);
      setRecipes((current) => current.filter((recipe) => recipe.id !== id));
    } catch {
      setError("Unable to delete this recipe. Please try again.");
    }
  }

  function handleCreated(newRecipe: Recipe) {
    setRecipes((current) => [newRecipe, ...current]);
    setOpen(false);
  }

  if (!ready) return null;
  if (!user) return <Navigate to="/auth/login" replace />;

  return (
    <>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
            Your recipes
          </h2>
          <p className="mt-1 text-sm text-ink-soft">
            {recipes.length} saved {recipes.length === 1 ? "recipe" : "recipes"} in your book
          </p>
        </div>
        <Button onClick={() => setOpen(true)}>+ Add recipe</Button>
      </div>

      {error && (
        <p role="alert" className="mb-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </p>
      )}

      {loading ? (
        <Spinner label="Fetching your recipes…" />
      ) : recipes.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-ink/20 bg-white/60 px-6 py-20 text-center">
          <span className="text-4xl">📖</span>
          <h3 className="font-display mt-4 text-xl font-semibold text-ink">
            A fresh page for your favorites
          </h3>
          <p className="mx-auto mt-2 max-w-sm text-sm text-ink-soft">
            Save a family classic or jot down something new you have been wanting to try.
          </p>
          <Button className="mt-6" onClick={() => setOpen(true)}>
            Add your first recipe
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} {...recipe} onDelete={handleDelete} />
          ))}
        </div>
      )}

      <Modal open={open} onClose={() => setOpen(false)} title="Add a new recipe">
        <AddRecipeForm onSuccess={handleCreated} />
      </Modal>
    </>
  );
}
