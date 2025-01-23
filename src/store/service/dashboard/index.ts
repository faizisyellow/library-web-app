import defaultBaseQuery from "@/config";
import { createApi } from "@reduxjs/toolkit/query/react";
import { GetDashboardOverviewResponse } from "./type";

export const dashboardOverviewApi = createApi({
  reducerPath: "dashboardOverview",
  baseQuery: defaultBaseQuery,
  refetchOnMountOrArgChange: true,
  tagTypes: ["DashboardOverview"],
  endpoints: (builder) => ({
    getDashboardOverview: builder.query<GetDashboardOverviewResponse, void>({
      query: () => ({
        url: "dashboard",
        method: "GET",
      }),
      providesTags: ["DashboardOverview"],
    }),
  }),
});

export const { useGetDashboardOverviewQuery } = dashboardOverviewApi;
