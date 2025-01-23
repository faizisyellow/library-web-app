import defaultBaseQuery from "@/config";
import { createApi } from "@reduxjs/toolkit/query/react";
import { CreateCategoriesRequest } from "./type";

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: defaultBaseQuery,
  refetchOnMountOrArgChange: true,
  tagTypes: ["Categories"],
  endpoints: (builder) => ({
    getCategories: builder.query<any, void>({
      query: () => ({
        url: "categories",
        method: "GET",
      }),
      providesTags: ["Categories"],
    }),
    createCategories: builder.mutation<any, CreateCategoriesRequest>({
      query: (payload) => ({
        url: "categories",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Categories"],
    }),
    deleteCategories: builder.mutation<any, string>({
      query: (id) => ({
        url: `categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const { useCreateCategoriesMutation, useGetCategoriesQuery, useDeleteCategoriesMutation } = categoriesApi;
