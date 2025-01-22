import Books from "@/pages/dashboard/books/Books";
import CreateBook from "@/pages/dashboard/books/create-book/CreateBook";
import EditBook from "@/pages/dashboard/books/edit-book/EditBook";
import Borrowing from "@/pages/dashboard/borrowing/Borrowing";
import Category from "@/pages/dashboard/category/Category";
import Overview from "@/pages/dashboard/overview/Overview";

const DashboardRouter = [
  {
    index: true,
    element: <Overview />,
  },
  {
    path: "books",
    element: <Books />,
  },
  {
    path: "books/new-book",
    element: <CreateBook />,
  },
  {
    path: "books/:id",
    element: <EditBook />,
  },
  {
    path: "category",
    element: <Category />,
  },
  {
    path: "borrowing",
    element: <Borrowing />,
  },
];

export default DashboardRouter;
