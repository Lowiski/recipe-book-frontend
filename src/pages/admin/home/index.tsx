import { Navbar } from "@/components/common/navbar";
import { AdminRecipes } from "@/components/features/admin/admin-recipes";
import { Section } from "@/components/ui/section";

export default function AdminPage() {
  return (
    <div className="min-h-svh">
      <Navbar />
      <Section>
        <header className="mb-8 border-b border-ink/10 pb-6">
          <p className="text-[11px] font-semibold tracking-widest text-flame uppercase">
            Administration
          </p>
          <h1 className="font-display mt-2 text-3xl font-semibold tracking-tight text-ink">
            All recipes
          </h1>
          <p className="mt-2 text-sm text-ink-soft">
            Browse every recipe saved across all accounts.
          </p>
        </header>

        <AdminRecipes />
      </Section>
    </div>
  );
}
