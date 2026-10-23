import { clearCsrfToken, ensureCsrfToken, http } from "@/lib/axios";

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  emailVerified: string | null;
};

async function getSessionService() {
  const response = await http.get("/auth/v1/session");
  return response.data.data.user as User;
}

export async function loginService(email: string, password: string) {
  await ensureCsrfToken();
  await http.post("/auth/v1/login", { email, password });
  await ensureCsrfToken();
  return getSessionService();
}

export async function signupService(name: string, email: string, password: string) {
  await ensureCsrfToken();
  await http.post("/auth/v1/signup", { name, email, password });
  return loginService(email, password);
}

export async function logoutService() {
  await http.post("/auth/v1/logout", {});
  clearCsrfToken();
}

export async function restoreSessionService() {
  await ensureCsrfToken();
  await http.post("/auth/v1/refresh-token", {});
  await ensureCsrfToken();
  return getSessionService();
}
