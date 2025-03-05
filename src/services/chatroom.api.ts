import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../utilities/rtkQuery.utility";
import {
  CheckExistingChatroomResponse,
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

    checkIfChatroomExist: builder.mutation<
      CheckExistingChatroomResponse,
      number[]
    >({
      query: (phoneNumbers) => ({
        url: "/chatroom/check-if-chatroom-exist",
        body: { phoneNumbers: phoneNumbers },
        method: "POST",
      }),
    }),
  }),
});
export const {
  useGetChatroomsByUserIdQuery,
  useGetChatroomDetailsByIdQuery,
  useCreateChatroomMutation,
  useLazyGetUsersInChatroomQuery,
  useCheckIfChatroomExistMutation,
} = chatroomApi;

export default chatroomApi;
