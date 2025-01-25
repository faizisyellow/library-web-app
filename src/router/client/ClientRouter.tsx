import Explore from "@/pages/explore/Explore";
import MyBorrow from "@/pages/my-borrow/MyBorrow";
import path from "path";

const ClientRouter = [
  {
    path: "/explore",
    element: <Explore />,
  },
  {
    path: "/my-borrowing-book",
    element:<MyBorrow/>
  }
];

export default ClientRouter;
