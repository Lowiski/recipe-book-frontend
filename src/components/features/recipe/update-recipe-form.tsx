import { useState, type SubmitEvent } from "react";
import { updateRecipeService, type Recipe } from "@/services/recipe-service";
import { Button } from "@/components/ui/button";
import { RecipeFormFields } from "./recipe-form-fields";
import {
  toRecipePayload,
  type RecipeFormErrors,
  type RecipeFormValues,
} from "./recipe-form";

type UpdateRecipeFormProps = {
  recipe: Recipe;
  onSuccess: (updatedRecipe: Recipe) => void;
};

// Prefill the shared form layout with the existing recipe.
function toFormValues(recipe: Recipe): RecipeFormValues {
  return {
    name: recipe.name,
    image: recipe.image,
    cuisine: recipe.cuisine,
    difficulty: recipe.difficulty,
    cookTimeMinutes: String(recipe.cookTimeMinutes),
    mealType: recipe.mealType.join("\n"),
    tags: recipe.tags.join("\n"),
    ingredients: recipe.ingredients.join("\n"),
    instructions: recipe.instructions.join("\n"),
  };
}

export function UpdateRecipeForm({ recipe, onSuccess }: UpdateRecipeFormProps) {
  const [values, setValues] = useState<RecipeFormValues>(() => toFormValues(recipe));
  const [errors, setErrors] = useState<RecipeFormErrors>({});
  const [submitError, setSubmitError] = useState("");
  const [busy, setBusy] = useState(false);

  function handleFieldChange(field: keyof RecipeFormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError("");
    setBusy(true);

    try {
      const updated = await updateRecipeService(recipe.id, toRecipePayload(values));
      onSuccess(updated);
    } catch (error) {
      setSubmitError(
        typeof error === "object" && error !== null && "response" in error
          ? ((error as { response?: { data?: { message?: string } } }).response?.data
              ?.message || "Unable to update recipe.")
          : "Unable to reach the API.",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <RecipeFormFields values={values} errors={errors} onFieldChange={handleFieldChange} />

      {submitError && (
        <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {submitError}
        </p>
      )}

      <Button type="submit" disabled={busy} className="mt-5 w-full py-3">
        {busy ? "Saving…" : "Save changes"}
      </Button>
    </form>
  );
}
