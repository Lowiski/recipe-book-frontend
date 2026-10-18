import { Navbar } from "@/components/common/navbar";
import { RecipeCollection } from "@/components/features/recipe/recipe-collection";
import { Section } from "@/components/ui/section";

export default function UserHomePage() {
  return (
    <div className="min-h-svh">
      <Navbar />
      <Section>
        <RecipeCollection />
      </Section>
    </div>
  );
}
