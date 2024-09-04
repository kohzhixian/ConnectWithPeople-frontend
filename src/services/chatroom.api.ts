import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../utilities/rtkQuery.utility";

export const chatroomApi = createApi({
  reducerPath: "chatroomApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getChatroomsByUserId: builder.query({
      query: () => "/chatroom/getAllChatroomByUserId",
    }),
  }),
});
export const { useGetChatroomsByUserIdQuery } = chatroomApi;

export default chatroomApi;
