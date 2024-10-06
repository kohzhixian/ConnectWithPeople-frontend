import { createApi } from "@reduxjs/toolkit/query/react";
import {
  createMessageRequestType,
  MessageResponseType,
} from "../types/rtkQuery/messageApi.type";
import { baseQueryWithReauth } from "../utilities/rtkQuery.utility";

export const messageApi = createApi({
  reducerPath: "message",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getLatestMsgForAllChatroomLinkedToUser: builder.query({
      query: () => "/message/getLatestMsgForAllChatroomLinkedToUser",
    }),

    createMessage: builder.mutation<
      MessageResponseType,
      createMessageRequestType
    >({
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
  useGetLatestMsgForAllChatroomLinkedToUserQuery,
  useCreateMessageMutation,
} = messageApi;

export default messageApi;
