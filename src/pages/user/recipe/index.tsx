import { Link, useParams } from "react-router";
import { Navbar } from "@/components/common/navbar";
import { RecipeDetails } from "@/components/features/recipe/recipe-details";
import { Section } from "@/components/ui/section";

export default function RecipePage() {
  const { id } = useParams();

  return (
    <div className="min-h-svh">
      <Navbar />
      <Section>
        <Link
          to="/user"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft transition hover:text-flame"
        >
          ← Back to your recipes
        </Link>
        {id && <RecipeDetails key={id} id={id} />}
      </Section>
    </div>
  );
}
