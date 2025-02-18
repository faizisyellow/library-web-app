import Explore from "@/pages/explore/Explore";
import MyBorrow from "@/pages/my-borrow/MyBorrow";
import Profile from "@/pages/settings/profile/Profile";


const ClientRouter = [
  {
    path: "/explore",
    element: <Explore />,
  },
  {
    path: "/my-borrowing-book",
    element:<MyBorrow/>
  },
  {
    path: "/settings/profile",
    element:<Profile/>
  }
];

export default ClientRouter;
