import React from "react";
import Layout from "../Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ChartOverview from "./ChartOverview";
import RecentBorrow from "./RecentBorrow";
import { Book, ChartColumnStacked, ChartSpline, Users } from "lucide-react";
import { useGetDashboardOverviewQuery } from "@/store/service/dashboard";

interface OverviewProps { }

const Overview: React.FC<OverviewProps> = ({ }) => {
  const { data } = useGetDashboardOverviewQuery();

  return (
    <Layout>
      <div className="p-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Books</CardTitle>
              <Book />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data?.data?.books ?? 0}</div>
              <p className="text-xs text-muted-foreground">Total all books</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Users</CardTitle>
              <Users />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data?.data?.users ?? 0}</div>
              <p className="text-xs text-muted-foreground">Total all users</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categories</CardTitle>
              <ChartColumnStacked />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data?.data?.categories ?? 0}</div>
              <p className="text-xs text-muted-foreground">Total all category books</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Borrow Books</CardTitle>
              <ChartSpline />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data?.data?.borrowBooks ?? 0}</div>
              <p className="text-xs text-muted-foreground">Total all user borrowing book</p>
            </CardContent>
          </Card>
        </div>

        <div className="py-8 grid grid-cols-2 gap-x-4">
          <ChartOverview data={data?.data?.chartCategoryBooksData!} />
          <RecentBorrow
            data={data?.data?.recentBorrowsBook!}
            total={data?.data?.recentBorrowsBook.length!}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Overview;
