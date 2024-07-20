import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../utilities/rtkQuery.utility";
import {
  ContactRequestBodyType,
  formattedContact,
} from "../types/rtkQuery/contactApi.type";

export const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    addContact: builder.mutation<ContactRequestBodyType, formattedContact[]>({
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
