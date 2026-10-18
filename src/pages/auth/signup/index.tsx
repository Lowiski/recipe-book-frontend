import { Link } from "react-router";
import { AuthFormHeader } from "@/components/features/auth/auth-form-header";
import { SignupForm } from "@/components/features/auth/signup-form";
import { Card } from "@/components/ui/card";

export default function SignupPage() {
  return (
    <Card className="p-6 shadow-xl shadow-ink/5 sm:p-8">
      <AuthFormHeader
        title="Create your account"
        description="Start your personal cookbook — it only takes a minute."
      />

      <SignupForm />

      <p className="mt-7 text-center text-sm text-ink-soft">
        Already have an account?{" "}
        <Link
          to="/auth/login"
          className="font-semibold text-flame underline decoration-flame/30 underline-offset-4 hover:decoration-flame"
        >
          Sign in
        </Link>
      </p>
    </Card>
  );
}
