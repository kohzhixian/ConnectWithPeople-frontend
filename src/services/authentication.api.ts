import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { jwtDecode } from "jwt-decode";
import { logout } from "../redux/reducers/authentication.reducer";
import {
  LoginRequestType,
  LoginResponseType,
  RefreshTokenRequestType,
  RefreshTokenResponseType,
  TokenDataType,
} from "../types/rtkQuery/authenticationApi.type";
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:4000/api/v1",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
  credentials: "include", // Ensure cookies are sent with requests
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let response = await baseQuery(args, api, extraOptions);
  const accessToken = localStorage.getItem("token");

  if (response.error && response.error.status === 401) {
    // check if the token format is correct
    let decodedAccessToken;
    if (accessToken && accessToken.split(".").length === 3) {
      decodedAccessToken = jwtDecode<TokenDataType>(String(accessToken));
    }
    //try to get new token
    const refreshResult = await baseQuery(
      {
        url: "/auth/refreshToken",
        method: "POST",
        body: {
          userId: decodedAccessToken?.userId,
        },
      },
      api,
      extraOptions
    );

    localStorage.setItem("token", String(refreshResult.data));

    if (refreshResult.data) {
      // retry the initial query
      response = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }
  return response;
};

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

export const testApi = createApi({
  reducerPath: "testApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    test: builder.query({
      query: () => "/testProtected",
    }),
  }),
});

export const { useLoginMutation, useRefreshTokenMutation } = authenticationApi;
export const { useTestQuery } = testApi;

export default authenticationApi;
