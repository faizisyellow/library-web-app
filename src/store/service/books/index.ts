import defaultBaseQuery from "@/config";
import { createApi } from "@reduxjs/toolkit/query/react";
import { EditBookRequest, GetBooksResponse } from "./type";

export const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery: defaultBaseQuery,
  refetchOnMountOrArgChange: true,
  tagTypes: ["Books"],
  endpoints: (builder) => ({
    getBooks: builder.query<GetBooksResponse, void>({
      query: () => ({
        url: "books",
        method: "GET",
      }),
      providesTags: ["Books"],
    }),
    createBooks: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "books",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Books"],
    }),
    editBooks: builder.mutation<any, EditBookRequest>({
      query: ({ data, id }) => ({
        url: `books/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Books"],
    }),
    deleteBooks: builder.mutation<any, string>({
      query: (id) => ({
        url: `books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),
  }),
});

export const { useGetBooksQuery, useCreateBooksMutation, useEditBooksMutation, useDeleteBooksMutation } = booksApi;
