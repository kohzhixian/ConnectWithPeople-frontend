import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../utilities/rtkQuery.utility";

export const messageApi = createApi({
  reducerPath: "message",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getAllMessageByChatroomId: builder.query({
      query: (chatroomId: string) => ({
        url: "/message/getAllMessageByChatroomId",
        params: { ChatroomId: chatroomId },
      }),
    }),

    getLatestMsgForAllChatroomLinkedToUser: builder.query({
      query: () => "/message/getLatestMsgForAllChatroomLinkedToUser",
    }),
  }),
});

export const {
  useGetAllMessageByChatroomIdQuery,
  useGetLatestMsgForAllChatroomLinkedToUserQuery,
} = messageApi;

export default messageApi;
