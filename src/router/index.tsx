import { Route, Routes } from "react-router";
import BaseRouter from "./base/BaseRouter";
import DashboardRouter from "./dashboard/DashboardRouter";

const RootRouter = () => {
  return (
    <Routes>
      {BaseRouter.map((item, index) => (
        <Route
          key={index}
          path={item.path}
          element={item.element}
        />
      ))}

      <Route path="/dashboard">
        {DashboardRouter.map((item, index) => (
          <Route
            key={index}
            index={item.index}
            path={item.path}
            element={item.element}
          />
        ))}
      </Route>
    </Routes>
  );
};

export default RootRouter;
