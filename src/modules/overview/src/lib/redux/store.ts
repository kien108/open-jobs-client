import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { AuthAPI, JobAPI } from "../services";

const rootReducer = combineReducers({
   [AuthAPI.reducerPath]: AuthAPI.reducer,
   [JobAPI.reducerPath]: JobAPI.reducer,
});
export const store = configureStore({
   reducer: rootReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(AuthAPI.middleware).concat(JobAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
