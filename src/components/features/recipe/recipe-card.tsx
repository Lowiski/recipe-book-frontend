import { Link } from "react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import { RecipeMeta } from "@/components/common/recipe-meta";

type RecipeCardProps = {
  id: string;
  image: string;
  name: string;
  cuisine: string;
  mealType: string[];
  difficulty: "Easy" | "Medium" | "Hard";
  cookTimeMinutes: number;
  tags: string[];
  onDelete: (id: string) => void;
};

export function RecipeCard({
  id,
  image,
  name,
  cuisine,
  mealType,
  difficulty,
  cookTimeMinutes,
  tags,
  onDelete,
}: RecipeCardProps) {
  const difficultyTone = difficulty === "Easy" ? "sage" : difficulty === "Medium" ? "flame" : "stone";

  return (
    <Card className="group flex flex-col overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-ink/10">
      <div className="relative aspect-[16/10] overflow-hidden bg-parchment-deep">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3">
          <Tag tone={difficultyTone as "sage" | "flame" | "stone"} className="bg-white/90 backdrop-blur">
            {difficulty}
          </Tag>
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <p className="text-[11px] font-semibold tracking-wider text-flame uppercase">{cuisine}</p>
          <h3 className="font-display mt-1 text-lg leading-snug font-semibold tracking-tight text-ink">
            {name}
          </h3>
        </div>

        <RecipeMeta
          cuisine={cuisine}
          mealType={mealType}
          difficulty={difficulty}
          cookTimeMinutes={cookTimeMinutes}
        />

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        )}

        <div className="mt-auto grid grid-cols-2 gap-2 pt-1">
          <Link to={`/recipe/${id}`} className="contents">
            <Button className="w-full">View recipe</Button>
          </Link>
          <Button variant="danger" className="w-full" onClick={() => onDelete(id)}>
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
}
