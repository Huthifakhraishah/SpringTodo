import { configureStore } from "@reduxjs/toolkit";
import { tasksApi } from "../features/tasks/tasksApi";
import { authApi } from "../features/auth/authApi";
import authMiddleware from "./authMiddleware";

export const store = configureStore({
  reducer: {
    [tasksApi.reducerPath]: tasksApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tasksApi.middleware, authMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
