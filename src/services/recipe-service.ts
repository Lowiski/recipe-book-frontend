import { http } from "@/lib/axios";

export type Recipe = {
  id: string;
  image: string;
  name: string;
  cuisine: string;
  mealType: string[];
  difficulty: "Easy" | "Medium" | "Hard";
  cookTimeMinutes: number;
  tags: string[];
  ingredients: string[];
  instructions: string[];
};

export type AdminRecipe = Recipe & {
  userId: string;
  ownerName: string | null;
};

export type RecipeInput = Omit<Recipe, "id">;
export type RecipeUpdate = Partial<RecipeInput>;

export async function getRecipesService() {
  const response = await http.get("/recipes/v1/get-recipes");
  return response.data.data.recipes as Recipe[];
}

export async function getRecipeService(id: string) {
  const response = await http.get(`/recipes/v1/get-recipe/${id}`);
  return response.data.data.recipe as Recipe;
}

export async function createRecipeService(recipe: RecipeInput) {
  const response = await http.post("/recipes/v1/create-recipe", recipe);
  return response.data.data.recipe as Recipe;
}

export async function updateRecipeService(id: string, recipe: RecipeUpdate) {
  const response = await http.post(`/recipes/v1/update-recipe/${id}`, recipe);
  return response.data.data.recipe as Recipe;
}

export async function deleteRecipeService(id: string) {
  await http.post(`/recipes/v1/delete-recipe/${id}`, {});
}

export async function getAllRecipesService() {
  const response = await http.get("/recipes/v1/get-all-recipes");
  return response.data.data.recipes as AdminRecipe[];
}
