import { createApi } from "@reduxjs/toolkit/query/react";
import { AddContactReqBodyType } from "../types/rtkQuery/contactApi.type";
import { baseQueryWithReauth } from "../utilities/rtkQuery.utility";

export const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    addContact: builder.mutation<string, AddContactReqBodyType>({
      query: (addContactDetails) => ({
        url: "/contact/addContact",
        body: addContactDetails,
        method: "POST",
      }),
    }),

    getContactByUserId: builder.query({
      query: () => "/contact/getContactByUserId",
    }),
  }),
});

export const { useAddContactMutation, useGetContactByUserIdQuery } = contactApi;

export default contactApi;
