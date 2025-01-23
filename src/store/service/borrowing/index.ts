import defaultBaseQuery from "@/config";
import { createApi } from "@reduxjs/toolkit/query/react";
import { CreateBorrowBookRequest, GetBorrowBooksResponse, ReturnBorrowBookRequest } from "./type";

export const borrowingApi = createApi({
  reducerPath: "borrowingApi",
  baseQuery: defaultBaseQuery,
  refetchOnMountOrArgChange: true,
  tagTypes: ["Borrowing"],
  endpoints: (builder) => ({
    getBorrowBooks: builder.query<GetBorrowBooksResponse, void>({
      query: () => ({
        url: "borrow-book",
        method: "GET",
      }),
      providesTags: ["Borrowing"],
    }),
    createBorrowBook: builder.mutation<void, CreateBorrowBookRequest>({
      query: (payload) => ({
        url: "borrow-book",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Borrowing"],
    }),
    returnBorrowBook: builder.mutation<void, ReturnBorrowBookRequest>({
      query: (payload) => ({
        url: "borrow-book/return-book",
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Borrowing"],
    }),
  }),
});

export const { useCreateBorrowBookMutation, useGetBorrowBooksQuery, useReturnBorrowBookMutation } = borrowingApi;
