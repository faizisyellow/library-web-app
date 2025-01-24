import { Route, Routes } from "react-router";
import BaseRouter from "./base/BaseRouter";
import DashboardRouter from "./dashboard/DashboardRouter";
import NotFound from "@/pages/not-found/NotFound";
import { PrivateRoute, PublicRoute } from "@/components/private-route/PrivateRoute";
import App from "@/App";
import ClientRouter from "./client/ClientRouter";

const RootRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<App />}
      />

      {BaseRouter.map((item, index) => (
        <Route
          key={index}
          path={item.path}
          element={<PublicRoute>{item.element}</PublicRoute>}
        />
      ))}

      <Route
        path="/dashboard"
        element={<PrivateRoute roles={["ADMIN"]} />}
      >
        {DashboardRouter.map((item, index) => (
          <Route
            key={index}
            path={item.path}
            element={item.element}
          />
        ))}
      </Route>

      <Route
        path="/"
        element={<PrivateRoute roles={["USER"]} />}
      >
        {ClientRouter.map((item, index) => (
          <Route
            key={index}
            path={item.path}
            element={item.element}
          />
        ))}
      </Route>

      <Route
        path="*"
        element={<NotFound />}
      />
    </Routes>
  );
};

export default RootRouter;
