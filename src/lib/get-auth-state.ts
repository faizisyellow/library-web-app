import Cookies from "js-cookie";

export type Role = "ADMIN" | "USER" | null;

interface AuthState {
  isAuthenticated: boolean;
  role: Role;
}

const getAuthState = (): AuthState => ({
  isAuthenticated: !!Cookies.get("token"),
  role: JSON.parse(localStorage.getItem("role") || "null"),
});

export default getAuthState;
