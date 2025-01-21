import App from "@/App";
import Login from "@/pages/login/Login";
import NotFound from "@/pages/not-found/NotFound";
import Signup from "@/pages/sign-up/Signup";

const BaseRouter = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default BaseRouter;
