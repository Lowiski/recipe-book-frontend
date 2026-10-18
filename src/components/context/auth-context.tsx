import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { AuthContext } from "./auth-state";
import type { User } from "@/services/auth-service";
import {
  loginService,
  logoutService,
  restoreSessionService,
  signupService,
} from "@/services/auth-service";

// AuthProvider owns the current user and exposes login/signup/logout.
// It sits above the router in main.tsx so every page can useAuth().
export function AuthProvider({ children }: { children: ReactNode }) {
  // null = nobody signed in (from the browser's point of view).
  const [user, setUser] = useState<User | null>(null);
  // ready=false while the initial session check is still running.
  const [ready, setReady] = useState(false);

  const login = useCallback(async (email: string, password: string) => {
    const currentUser = await loginService(email, password);
    setUser(currentUser);
    setReady(true);
    return currentUser;
  }, []);

  const signup = useCallback(async (name: string, email: string, password: string) => {
    const currentUser = await signupService(name, email, password);
    setUser(currentUser);
    setReady(true);
    return currentUser;
  }, []);

  const logout = useCallback(async () => {
    await logoutService();
    setUser(null);
  }, []);

  useEffect(() => {
    let mounted = true;

    // Fired by the Axios client when automatic refresh fails.
    function onExpired() {
      setUser(null);
    }
    window.addEventListener("auth:expired", onExpired);

    async function restoreSession() {
      try {
        const currentUser = await restoreSessionService();
        if (mounted) setUser(currentUser);
      } catch {
        // No valid cookie session: treat the visitor as signed out.
        if (mounted) setUser(null);
      } finally {
        if (mounted) setReady(true);
      }
    }

    restoreSession();

    return function cleanup() {
      mounted = false;
      window.removeEventListener("auth:expired", onExpired);
    };
  }, []);

  const value = useMemo(
    () => ({ user, ready, login, signup, logout }),
    [user, ready, login, signup, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
