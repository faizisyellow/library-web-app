import defaultBaseQuery from "@/config";
import { createApi } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: defaultBaseQuery,
  refetchOnMountOrArgChange: true,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getMyBorrowBook: builder.query<any, { status?: string }>({
      query: ({ status } = {}) => ({
        url: `users/my-borrow${status ? `?status=${status}` : ""}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const { useGetMyBorrowBookQuery } = userApi;

