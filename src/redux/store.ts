import { configureStore } from "@reduxjs/toolkit";
import { authenticationApi } from "../services/authentication.api";
import { authenticationSlice } from "./reducers/authentication.reducer";
import { contactApi } from "../services/contact.api";
import { chatroomApi } from "../services/chatroom.api";

export const store = configureStore({
  reducer: {
    authentication: authenticationSlice.reducer,
    [authenticationApi.reducerPath]: authenticationApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
    [chatroomApi.reducerPath]: chatroomApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authenticationApi.middleware)
      .concat(contactApi.middleware)
      .concat(chatroomApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
// setupListeners(store.dispatch)
