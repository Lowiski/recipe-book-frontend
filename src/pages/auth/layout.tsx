import { Link, Navigate, Outlet } from "react-router";
import { useAuth } from "@/components/context/use-auth";
import { BrandPanel } from "@/components/features/auth/brand-panel";

// Split-screen auth shell: brand story on the left, form on the right.
export default function AuthLayout() {
  const { user, ready } = useAuth();

  // Already signed-in visitors skip the auth forms.
  if (ready && user) {
    return <Navigate to={user.role === "ADMIN" ? "/admin" : "/user"} replace />;
  }

  return (
    <main className="flex min-h-svh bg-white">
      <BrandPanel />

      <div className="flex min-h-svh flex-1 flex-col justify-center px-5 py-10 sm:px-10 lg:px-16">
        <div className="mx-auto w-full max-w-md">
          {/* Mobile-only brand line since the brand panel is hidden on small screens. */}
          <Link to="/" className="mb-8 flex items-center gap-2.5 lg:hidden">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-flame text-xl text-white">
              🍲
            </span>
            <span className="font-display text-xl font-semibold text-ink">Recipe Book</span>
          </Link>

          {ready && <Outlet />}
        </div>
      </div>
    </main>
  );
}
