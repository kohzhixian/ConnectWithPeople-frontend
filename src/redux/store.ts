import { configureStore } from "@reduxjs/toolkit";
import { authenticationApi } from "../services/authentication.api";
import { chatroomApi } from "../services/chatroom.api";
import { contactApi } from "../services/contact.api";
import messageApi from "../services/message.api";
import { authenticationSlice } from "./reducers/authentication.reducer";
import { chatroomSlice } from "./reducers/chatroom.reducer";
import { miscSlice } from "./reducers/misc.reducer";

export const store = configureStore({
  reducer: {
    authentication: authenticationSlice.reducer,
    chatroom: chatroomSlice.reducer,
    misc: miscSlice.reducer,
    [authenticationApi.reducerPath]: authenticationApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
    [chatroomApi.reducerPath]: chatroomApi.reducer,
    [messageApi.reducerPath]: messageApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authenticationApi.middleware)
      .concat(contactApi.middleware)
      .concat(chatroomApi.middleware)
      .concat(messageApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
// setupListeners(store.dispatch)
