import Overview from "@/pages/dashboard/overview/Overview";

const DashboardRouter = [
  {
    index: true,
    element: <Overview />,
  },
  {
    path: "books",
    element: <p>books</p>,
  },
];

export default DashboardRouter;
