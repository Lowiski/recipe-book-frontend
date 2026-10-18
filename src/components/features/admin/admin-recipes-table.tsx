import { Table } from "@/components/ui/table";
import { Tag } from "@/components/ui/tag";
import type { AdminRecipe } from "@/services/recipe-service";

type AdminRecipesTableProps = {
  recipes: AdminRecipe[];
  loading: boolean;
};

// Presentational only: fetching and errors belong to AdminRecipes.
export function AdminRecipesTable({ recipes, loading }: AdminRecipesTableProps) {
  return (
    <Table>
      <caption className="sr-only">Recipes from all users</caption>
      <thead>
        <tr>
          <th scope="col">Recipe</th>
          <th scope="col">Cuisine</th>
          <th scope="col">Meal type</th>
          <th scope="col">Difficulty</th>
          <th scope="col">Cook time</th>
          <th scope="col">Owner</th>
        </tr>
      </thead>
      <tbody>
        {!loading && recipes.length === 0 && (
          <tr>
            <td colSpan={6} className="text-center text-ink-soft">
              No recipes have been created yet.
            </td>
          </tr>
        )}
        {recipes.map((recipe) => (
          <tr key={recipe.id} className="transition hover:bg-parchment/60">
            <td>
              <div className="flex min-w-48 items-center gap-3">
                <img
                  src={recipe.image}
                  alt=""
                  className="h-11 w-11 rounded-xl object-cover ring-1 ring-ink/10"
                />
                <span className="font-medium text-ink">{recipe.name}</span>
              </div>
            </td>
            <td className="text-ink-soft">{recipe.cuisine}</td>
            <td className="text-ink-soft">{recipe.mealType.join(", ")}</td>
            <td>
              <Tag tone={recipe.difficulty === "Easy" ? "sage" : "flame"}>{recipe.difficulty}</Tag>
            </td>
            <td className="text-ink-soft">{recipe.cookTimeMinutes} mins</td>
            <td>
              <div>
                <p className="font-medium text-ink">{recipe.ownerName || "Unnamed user"}</p>
                <p className="font-mono text-[11px] text-ink-faint">{recipe.userId}</p>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
