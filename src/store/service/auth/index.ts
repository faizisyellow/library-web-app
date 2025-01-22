import defaultBaseQuery from "@/config";
import { createApi } from "@reduxjs/toolkit/query/react";
import { LoginRequest, SignupRequest } from "./type";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: defaultBaseQuery,
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    login: builder.mutation<any, LoginRequest>({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),
    signup: builder.mutation<any, SignupRequest>({
      query: (payload) => ({
        url: "auth/signup",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Auth"],
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const { useLoginMutation, useSignupMutation, useLogoutMutation } = authApi;
