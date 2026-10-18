export type RecipeFormValues = {
  name: string;
  image: string;
  cuisine: string;
  difficulty: "Easy" | "Medium" | "Hard";
  cookTimeMinutes: string;
  mealType: string;
  tags: string;
  ingredients: string;
  instructions: string;
};

export type RecipeFormErrors = Partial<Record<keyof RecipeFormValues, string>>;

export const emptyRecipeValues: RecipeFormValues = {
  name: "",
  image: "",
  cuisine: "",
  difficulty: "Easy",
  cookTimeMinutes: "",
  mealType: "",
  tags: "",
  ingredients: "",
  instructions: "",
};

// Converts the newline-separated textarea values into the arrays the API expects.
export function toRecipePayload(values: RecipeFormValues) {
  const lines = (text: string) =>
    text
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

  return {
    name: values.name.trim(),
    image: values.image.trim(),
    cuisine: values.cuisine.trim(),
    difficulty: values.difficulty,
    cookTimeMinutes: Number(values.cookTimeMinutes),
    mealType: lines(values.mealType),
    tags: lines(values.tags),
    ingredients: lines(values.ingredients),
    instructions: lines(values.instructions),
  };
}
