import { useState, type SubmitEvent } from "react";
import { createRecipeService, type Recipe } from "@/services/recipe-service";
import { Button } from "@/components/ui/button";
import {
  RecipeFormFields,
} from "./recipe-form-fields";
import {
  emptyRecipeValues,
  toRecipePayload,
  type RecipeFormErrors,
  type RecipeFormValues,
} from "./recipe-form";

type AddRecipeFormProps = {
  onSuccess: (newRecipe: Recipe) => void;
};

const requiredMessages: Record<keyof RecipeFormValues, string> = {
  name: "Name is required",
  image: "Image URL is required",
  cuisine: "Cuisine is required",
  difficulty: "Difficulty is required",
  cookTimeMinutes: "Cook time is required",
  mealType: "Add at least one meal type",
  tags: "Add at least one tag",
  ingredients: "Add at least one ingredient",
  instructions: "Add at least one instruction",
};

const requiredFields = Object.keys(requiredMessages) as Array<keyof RecipeFormValues>;

export function AddRecipeForm({ onSuccess }: AddRecipeFormProps) {
  const [values, setValues] = useState<RecipeFormValues>(emptyRecipeValues);
  const [errors, setErrors] = useState<RecipeFormErrors>({});
  const [submitError, setSubmitError] = useState("");
  const [busy, setBusy] = useState(false);

  function handleFieldChange(field: keyof RecipeFormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function validate() {
    const nextErrors: RecipeFormErrors = {};
    for (const field of requiredFields) {
      if (values[field].trim() === "") nextErrors[field] = requiredMessages[field];
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError("");
    if (!validate()) return;

    setBusy(true);
    try {
      const newRecipe = await createRecipeService(toRecipePayload(values));
      onSuccess(newRecipe);
    } catch (error) {
      setSubmitError(
        typeof error === "object" && error !== null && "response" in error
          ? ((error as { response?: { data?: { message?: string } } }).response?.data
              ?.message || "Unable to create recipe.")
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
        {busy ? "Saving…" : "Add recipe"}
      </Button>
    </form>
  );
}
