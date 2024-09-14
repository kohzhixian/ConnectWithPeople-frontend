import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../utilities/rtkQuery.utility";
import { createMessageRequestType } from "../types/rtkQuery/messageApi.type";

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

    createMessage: builder.mutation<string, createMessageRequestType>({
      query: (messageDetails) => ({
        url: "/message/createMessage",
        body: messageDetails,
        method: "POST",
        responseHandler: (response) => response.text(), //handle plain text response
      }),
    }),
  }),
});

export const {
  useGetAllMessageByChatroomIdQuery,
  useGetLatestMsgForAllChatroomLinkedToUserQuery,
  useCreateMessageMutation,
} = messageApi;

export default messageApi;
