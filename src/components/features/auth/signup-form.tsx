import { useState, type SubmitEvent } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@/components/context/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function getErrorMessage(error: unknown) {
  if (typeof error === "object" && error !== null && "response" in error) {
    const response = (error as { response?: { data?: { message?: string } } }).response;
    if (response?.data?.message) return response.data.message;
  }
  return "Could not reach the API. Check that the backend server is running.";
}

export function SignupForm() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setBusy(true);

    try {
      const currentUser = await signup(name, email, password);
      navigate(currentUser.role === "ADMIN" ? "/admin" : "/user", { replace: true });
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5" noValidate>
      <div>
        <Label htmlFor="signup-name">Name</Label>
        <Input
          id="signup-name"
          autoComplete="name"
          required
          minLength={2}
          placeholder="Your name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="signup-email">Email</Label>
        <Input
          id="signup-email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="signup-password">Password</Label>
        <Input
          id="signup-password"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          placeholder="At least 8 characters"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <p className="mt-1.5 text-xs text-ink-faint">
          Use at least 8 characters, including one uppercase letter and one number.
        </p>
      </div>

      {error && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </p>
      )}

      <Button
        type="submit"
        disabled={busy}
        className="mt-1 w-full py-3 disabled:cursor-wait"
      >
        {busy ? "Creating your account…" : "Create account"}
      </Button>
    </form>
  );
}
