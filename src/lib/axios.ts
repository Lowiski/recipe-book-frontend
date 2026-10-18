import axios from "axios";

// Vite exposes VITE_-prefixed variables from the frontend .env file.
const baseURL = import.meta.env.VITE_API_BASE_URL;

if (!baseURL) {
  throw new Error(
    "Set VITE_API_BASE_URL in the frontend .env file (e.g. http://localhost:7000/api).",
  );
}

// One Axios client shared by every service. withCredentials makes the
// browser store and send the API's HttpOnly cookies.
export const http = axios.create({
  baseURL,
  withCredentials: true,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
});

// CSRF token kept in memory only; it proves the write request comes from
// the same browser session that fetched the token.
let csrfToken: string | null = null;

// Concurrent 401s share a single refresh: the API consumes the old
// refresh token during rotation, so parallel refreshes would fail.
let refreshPromise: Promise<void> | null = null;

const writeMethods = ["post", "put", "patch", "delete"];

const authEndpoints = [
  "/auth/v1/login",
  "/auth/v1/signup",
  "/auth/v1/refresh-token",
  "/auth/v1/logout",
];

function isAuthEndpoint(url = "") {
  return authEndpoints.includes(url);
}

export function clearCsrfToken() {
  csrfToken = null;
}

export async function ensureCsrfToken() {
  if (csrfToken) return;

  // Plain axios on purpose: this client's interceptors must not run
  // while fetching the token itself.
  const response = await axios.get(`${baseURL}/auth/v1/csrf-token`, {
    withCredentials: true,
  });
  csrfToken = response.data.data.csrfToken as string;
}

async function refreshSession() {
  await http.post("/auth/v1/refresh-token", {});
  // Cookies changed, so the old CSRF token is stale.
  await ensureCsrfToken();
}

// Attach the CSRF header to every request that can change data.
http.interceptors.request.use(async (config) => {
  const method = config.method?.toLowerCase() || "get";

  if (writeMethods.includes(method)) {
    await ensureCsrfToken();
    config.headers.set("x-csrf-token", csrfToken);
  }

  return config;
});

http.interceptors.response.use(
  // A successful auth request rotates cookies and invalidates the token.
  (response) => {
    if (isAuthEndpoint(response.config.url)) clearCsrfToken();
    return response;
  },
  async (error) => {
    const request = error.config;

    // Refresh once on 401 only; auth endpoints are excluded to avoid loops.
    if (!request || error.response?.status !== 401) throw error;
    if (request._retry || isAuthEndpoint(request.url)) throw error;

    request._retry = true;

    try {
      if (!refreshPromise) {
        refreshPromise = refreshSession().finally(() => {
          refreshPromise = null;
        });
      }
      await refreshPromise;
    } catch (refreshError) {
      clearCsrfToken();
      // AuthProvider listens for this and signs the visitor out.
      window.dispatchEvent(new Event("auth:expired"));
      throw refreshError;
    }

    // Retry the original request with the refreshed cookies.
    return http(request);
  },
);
