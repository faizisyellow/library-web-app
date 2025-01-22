import getAuthState, { Role } from "@/lib/get-auth-state";
import { Navigate, Outlet } from "react-router";
import { ReactNode } from "react";

const PrivateRoute = ({ roles }: { roles?: Role[] }) => {
  const { isAuthenticated, role } = getAuthState();
  const hasRequiredRole = !roles || roles.includes(role);

  if (!isAuthenticated) return <Navigate to="/login" />;
  if (!hasRequiredRole) return <Navigate to="/" />;

  return <Outlet />;
};

const PublicRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = getAuthState();

  if (isAuthenticated) return <Navigate to="/" />;

  return <>{children}</>;
};

export { PrivateRoute, PublicRoute };
