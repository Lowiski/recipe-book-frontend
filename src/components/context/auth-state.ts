import { createContext } from "react";
import type { User } from "@/services/auth-service";

// The shared sign-in state every component can reach through useAuth().
export type AuthContextValue = {
  user: User | null;
  ready: boolean;
  login: (email: string, password: string) => Promise<User>;
  signup: (name: string, email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);
