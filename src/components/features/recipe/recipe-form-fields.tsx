import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import type { RecipeFormErrors, RecipeFormValues } from "./recipe-form";

// Shared field layout used by both the add and update recipe forms.
export function RecipeFormFields({
  values,
  errors,
  onFieldChange,
}: {
  values: RecipeFormValues;
  errors: RecipeFormErrors;
  onFieldChange: (field: keyof RecipeFormValues, value: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
      <div>
        <Label htmlFor="recipe-name" error={errors.name}>
          Name
        </Label>
        <Input
          id="recipe-name"
          placeholder="Grandma's tomato pasta"
          value={values.name}
          error={errors.name}
          onChange={(event) => onFieldChange("name", event.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="recipe-image" error={errors.image}>
          Image URL
        </Label>
        <Input
          id="recipe-image"
          type="url"
          placeholder="https://example.com/photo.jpg"
          value={values.image}
          error={errors.image}
          onChange={(event) => onFieldChange("image", event.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="recipe-cuisine" error={errors.cuisine}>
          Cuisine
        </Label>
        <Input
          id="recipe-cuisine"
          placeholder="Italian"
          value={values.cuisine}
          error={errors.cuisine}
          onChange={(event) => onFieldChange("cuisine", event.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="recipe-difficulty" error={errors.difficulty}>
          Difficulty
        </Label>
        <Select
          id="recipe-difficulty"
          value={values.difficulty}
          onChange={(event) => onFieldChange("difficulty", event.target.value)}
        >
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </Select>
      </div>

      <div>
        <Label htmlFor="recipe-cook-time" error={errors.cookTimeMinutes}>
          Cook time (minutes)
        </Label>
        <Input
          id="recipe-cook-time"
          type="number"
          min="0"
          placeholder="30"
          value={values.cookTimeMinutes}
          error={errors.cookTimeMinutes}
          onChange={(event) => onFieldChange("cookTimeMinutes", event.target.value)}
        />
      </div>

      <div className="sm:col-span-2">
        <Label htmlFor="recipe-meal-type" error={errors.mealType}>
          Meal types (one per line)
        </Label>
        <Textarea
          id="recipe-meal-type"
          rows={2}
          placeholder={"Lunch\nDinner"}
          value={values.mealType}
          error={errors.mealType}
          onChange={(event) => onFieldChange("mealType", event.target.value)}
        />
      </div>

      <div className="sm:col-span-2">
        <Label htmlFor="recipe-tags" error={errors.tags}>
          Tags (one per line)
        </Label>
        <Textarea
          id="recipe-tags"
          rows={2}
          placeholder={"Comfort food\nFamily"}
          value={values.tags}
          error={errors.tags}
          onChange={(event) => onFieldChange("tags", event.target.value)}
        />
      </div>

      <div className="sm:col-span-2">
        <Label htmlFor="recipe-ingredients" error={errors.ingredients}>
          Ingredients (one per line)
        </Label>
        <Textarea
          id="recipe-ingredients"
          rows={4}
          placeholder={"200g pasta\n3 tomatoes"}
          value={values.ingredients}
          error={errors.ingredients}
          onChange={(event) => onFieldChange("ingredients", event.target.value)}
        />
      </div>

      <div className="sm:col-span-2">
        <Label htmlFor="recipe-instructions" error={errors.instructions}>
          Instructions (one per line)
        </Label>
        <Textarea
          id="recipe-instructions"
          rows={4}
          placeholder={"Boil the pasta\nPrepare the sauce"}
          value={values.instructions}
          error={errors.instructions}
          onChange={(event) => onFieldChange("instructions", event.target.value)}
        />
      </div>
    </div>
  );
}
