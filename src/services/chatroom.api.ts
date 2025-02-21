import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../utilities/rtkQuery.utility";
import {
  CreateChatroomRequestType,
  CreateChatroomResponseType,
} from "../types/rtkQuery/chatroomApi.type";

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

    createChatroom: builder.mutation<
      CreateChatroomResponseType,
      CreateChatroomRequestType
    >({
      query: (chatroomDetails) => ({
        url: "/chatroom/createChatroom",
        body: chatroomDetails,
        method: "POST",
      }),
    }),

    getUsersInChatroom: builder.query({
      query: (chatroomId: string) => ({
        url: "/chatroom/get-users-in-chatroom",
        params: { chatroomId: chatroomId },
      }),
    }),
  }),
});
export const {
  useGetChatroomsByUserIdQuery,
  useGetChatroomDetailsByIdQuery,
  useCreateChatroomMutation,
  useLazyGetUsersInChatroomQuery,
} = chatroomApi;

export default chatroomApi;
