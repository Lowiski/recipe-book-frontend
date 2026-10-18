import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/components/context/use-auth";

// Guards the routes behind it. The API still enforces authentication and
// roles; this only keeps the UI out of pages the visitor cannot use.
export function ProtectedRoute({ role }: { role: "USER" | "ADMIN" }) {
  const { user, ready } = useAuth();

  // Wait for the session check so a signed-in user is not bounced to login.
  if (!ready) return <LoadingScreen />;
  if (!user) return <Navigate to="/auth/login" replace />;
  if (user.role !== role) {
    return <Navigate to={user.role === "ADMIN" ? "/admin" : "/user"} replace />;
  }
  return <Outlet />;
}

// "/" and unknown URLs land on the right home for the current session.
export function HomeRedirect() {
  const { user, ready } = useAuth();
  if (!ready) return <LoadingScreen />;
  if (!user) return <Navigate to="/auth/login" replace />;
  return <Navigate to={user.role === "ADMIN" ? "/admin" : "/user"} replace />;
}

function LoadingScreen() {
  return (
    <div className="flex min-h-svh items-center justify-center bg-parchment">
      <div className="flex flex-col items-center gap-4 text-ink-soft">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-flame-soft border-t-flame" />
        <p className="text-sm">Warming up the kitchen…</p>
      </div>
    </div>
  );
}
