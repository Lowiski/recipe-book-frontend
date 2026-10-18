import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "@/components/context/use-auth";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";

// Sticky top navigation shared by the user and admin areas.
export function Navbar() {
  const { user, logout } = useAuth();
  const [error, setError] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    try {
      setError("");
      setLoggingOut(true);
      await logout();
      setConfirmLogout(false);
      // The router sends the visitor to /auth/login once user becomes null.
    } catch {
      setError("Unable to sign out. Please try again.");
    } finally {
      setLoggingOut(false);
    }
  }

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-parchment/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-flame text-lg text-white shadow-sm shadow-flame/30">
            🍲
          </span>
          <span className="font-display text-xl font-semibold tracking-tight text-ink">
            Recipe Book
          </span>
        </Link>

        <div className="flex items-center gap-3">
          {error && (
            <p role="alert" className="hidden text-xs font-medium text-red-600 sm:block">
              {error}
            </p>
          )}

          {/* Account actions collapse into a menu on small screens. */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="flex cursor-pointer items-center gap-2 rounded-full border border-ink/10 bg-white py-1.5 pr-3 pl-1.5 shadow-xs transition hover:border-flame/40"
              aria-expanded={menuOpen}
              aria-haspopup="menu"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-flame-soft text-sm font-bold text-flame-dark">
                {user?.name?.charAt(0).toUpperCase() || "?"}
              </span>
              <span className="hidden max-w-28 truncate text-sm font-medium text-ink sm:block">
                {user?.name}
              </span>
            </button>

            {menuOpen && (
              <div
                role="menu"
                className="absolute right-0 mt-2 w-52 rounded-2xl border border-ink/10 bg-white p-1.5 shadow-lg shadow-ink/10"
              >
                <div className="border-b border-ink/8 px-3 py-2">
                  <p className="truncate text-sm font-semibold text-ink">{user?.name}</p>
                  <p className="truncate text-xs text-ink-faint">{user?.email}</p>
                </div>
                <Button
                  variant="ghost"
                  className="mt-1 w-full justify-start"
                  onClick={() => {
                    setMenuOpen(false);
                    setConfirmLogout(true);
                  }}
                >
                  Sign out
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Logout confirmation before the session is cleared. */}
      <Modal open={confirmLogout} onClose={() => setConfirmLogout(false)} title="Sign out">
        <p className="text-sm leading-relaxed text-ink-soft">
          Are you sure you want to log out? You will need to sign in again to access
          your recipes.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setConfirmLogout(false)}>
            Cancel
          </Button>
          <Button onClick={handleLogout} disabled={loggingOut}>
            {loggingOut ? "Signing out…" : "Yes, sign out"}
          </Button>
        </div>
      </Modal>
    </header>
  );
}
