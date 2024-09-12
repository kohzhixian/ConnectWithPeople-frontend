import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../utilities/rtkQuery.utility";

export const chatroomApi = createApi({
  reducerPath: "chatroomApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getChatroomsByUserId: builder.query({
      query: () => "/chatroom/getAllChatroomByUserId",
    }),

    getChatroomDetailsById: builder.query({
      query: (chatroomId: string) => ({
        url: "/chatroom/getChatroomDetailsById",
        params: { chatroomId: chatroomId },
      }),
    }),
  }),
});
export const { useGetChatroomsByUserIdQuery, useGetChatroomDetailsByIdQuery } =
  chatroomApi;

export default chatroomApi;
