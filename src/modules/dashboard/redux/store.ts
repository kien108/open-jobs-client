import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { AuthAPI, JobAPI, UserAPI } from "../services";

const rootReducer = combineReducers({
   [AuthAPI.reducerPath]: AuthAPI.reducer,
   [UserAPI.reducerPath]: UserAPI.reducer,
   [JobAPI.reducerPath]: JobAPI.reducer,
});
export const store = configureStore({
   reducer: rootReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(UserAPI.middleware).concat(JobAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
