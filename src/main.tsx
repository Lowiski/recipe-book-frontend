import "@/styles/global.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { AuthProvider } from "@/components/context/auth-context";
import { HomeRedirect, ProtectedRoute } from "@/components/context/protected-route";
import AuthLayout from "@/pages/auth/layout";
import LoginPage from "@/pages/auth/login";
import SignupPage from "@/pages/auth/signup";
import UserHomePage from "@/pages/user/home";
import RecipePage from "@/pages/user/recipe";
import AdminPage from "@/pages/admin/home";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeRedirect />} />

        
        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<Navigate to="login" replace />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
        </Route>

        
        <Route element={<ProtectedRoute role="USER" />}>
          <Route path="/user" element={<UserHomePage />} />
          <Route path="/recipe/:id" element={<RecipePage />} />
        </Route>

        
        <Route element={<ProtectedRoute role="ADMIN" />}>
          <Route path="/admin" element={<AdminPage />} />
        </Route>

        <Route path="*" element={<HomeRedirect />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>,
);
