import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  LoginRequestType,
  LoginResponseType,
} from "../types/rtkQuery/authenticationApi.type";

export const authenticationApi = createApi({
  reducerPath: "authenticationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/v1/auth",
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponseType, LoginRequestType>({
      query: (loginDetails) => ({
        url: "/login",
        method: "POST",
        body: loginDetails,
      }),
    }),
  }),
});

export const { useLoginMutation } = authenticationApi;

export default authenticationApi;
