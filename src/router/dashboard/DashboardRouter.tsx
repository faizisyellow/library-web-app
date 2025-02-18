import Books from "@/pages/dashboard/books/Books";
import CreateBook from "@/pages/dashboard/books/create-book/CreateBook";
import EditBook from "@/pages/dashboard/books/edit-book/EditBook";
import Borrowing from "@/pages/dashboard/borrowing/Borrowing";
import Category from "@/pages/dashboard/category/Category";
import Overview from "@/pages/dashboard/overview/Overview";
import Profile from "@/pages/settings/profile/Profile";

const DashboardRouter = [
  {
    index: true,
    path: "/dashboard",
    element: <Overview />,
  },
  {
    index: true,
    path: "/dashboard/settings/profile",
    element: <Profile />,
  },
  {
    path: "/dashboard/books",
    element: <Books />,
  },
  {
    path: "/dashboard/books/new-book",
    element: <CreateBook />,
  },
  {
    path: "/dashboard/books/:id",
    element: <EditBook />,
  },
  {
    path: "/dashboard/category",
    element: <Category />,
  },
  {
    path: "/dashboard/borrowing",
    element: <Borrowing />,
  },
];

export default DashboardRouter;
