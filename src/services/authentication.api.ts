import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import "core-js/stable/atob";
import {
  LoginRequestType,
  LoginResponseType,
  RefreshTokenRequestType,
  RefreshTokenResponseType,
} from "../types/rtkQuery/authenticationApi.type";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:4000/api/v1",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    console.log("token: ", token);
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
  credentials: "include", // Ensure cookies are sent with requests
});

export const authenticationApi = createApi({
  reducerPath: "authenticationApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponseType, LoginRequestType>({
      query: (loginDetails) => ({
        url: "/auth/login",
        body: loginDetails,
        method: "POST",
      }),
    }),

    refreshToken: builder.mutation<
      RefreshTokenResponseType,
      RefreshTokenRequestType
    >({
      query: (refreshTokenDetails) => ({
        url: "/auth/refreshToken",
        method: "POST",
        body: refreshTokenDetails,
      }),
    }),
  }),
});

export const testApi = createApi({
  reducerPath: "testApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    test: builder.query({
      query: () => "/testProtected",
    }),
  }),
});

export const { useLoginMutation, useRefreshTokenMutation } = authenticationApi;
export const { useTestQuery } = testApi;

export default authenticationApi;
