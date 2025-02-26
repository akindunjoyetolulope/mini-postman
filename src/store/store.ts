import { configureStore } from "@reduxjs/toolkit";
import authorizationReducer from "../slices/authorization-slice";
import headersReducer from "../slices/header-slice";
import MethodReducer from "../slices/method-slice";
import BodyReducer from "../slices/body-slice";
import UrlReducer from "../slices/url-slice";

export const store = configureStore({
  reducer: {
    authorization: authorizationReducer,
    headers: headersReducer,
    method: MethodReducer,
    body: BodyReducer,
    url: UrlReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
