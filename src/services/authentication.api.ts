import { createApi } from "@reduxjs/toolkit/query/react";
import {
  LoginRequestType,
  LoginResponseType,
  RefreshTokenRequestType,
  RefreshTokenResponseType,
} from "../types/rtkQuery/authenticationApi.type";
import { baseQueryWithReauth } from "../utilities/rtkQuery.utility";

export const authenticationApi = createApi({
  reducerPath: "authenticationApi",
  baseQuery: baseQueryWithReauth,
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
        body: refreshTokenDetails,
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useRefreshTokenMutation } = authenticationApi;

export default authenticationApi;
