import defaultBaseQuery from "@/config";
import { createApi } from "@reduxjs/toolkit/query/react";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: defaultBaseQuery,
  refetchOnMountOrArgChange: true,
  tagTypes: ["Profile"],
  endpoints: (builder) => ({
    getProfile: builder.query<any, void>({
      query: () => ({
        url: "profiles",
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),
    updateProfile: builder.mutation<any,  FormData>({
      query: (payload) => ({
        url: "profiles",
        method: "PATCH",
        body: payload
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const { useGetProfileQuery,useUpdateProfileMutation } = profileApi;
