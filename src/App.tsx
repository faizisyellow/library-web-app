import { useEffect } from "react";
import { useNavigate } from "react-router";
import getAuthState from "./lib/get-auth-state";

function App() {
  const navigate = useNavigate();
  const { isAuthenticated, role } = getAuthState();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    switch (role) {
      case "ADMIN":
        navigate("dashboard");
        break;
      case "USER":
        navigate("explore");
        break;
      default:
        navigate("/login");
    }
  }, []);

  return null;
}

export default App;
