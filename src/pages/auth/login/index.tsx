import { Link } from "react-router";
import { AuthFormHeader } from "@/components/features/auth/auth-form-header";
import { LoginForm } from "@/components/features/auth/login-form";
import { Card } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <Card className="p-6 shadow-xl shadow-ink/5 sm:p-8">
      <AuthFormHeader
        title="Welcome back"
        description="Sign in to open your recipe book and pick up where you left off."
      />

      <LoginForm />

      <p className="mt-7 text-center text-sm text-ink-soft">
        New to Recipe Book?{" "}
        <Link
          to="/auth/signup"
          className="font-semibold text-flame underline decoration-flame/30 underline-offset-4 hover:decoration-flame"
        >
          Create an account
        </Link>
      </p>
    </Card>
  );
}
