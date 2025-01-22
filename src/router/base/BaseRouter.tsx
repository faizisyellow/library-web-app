import Login from "@/pages/login/Login";
import Signup from "@/pages/sign-up/Signup";

const BaseRouter = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
];

export default BaseRouter;
