import { CompanyAPI } from "./../services/CompanyAPI";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { AuthAPI, JobAPI, UserAPI } from "../services";

const rootReducer = combineReducers({
   [AuthAPI.reducerPath]: AuthAPI.reducer,
   [JobAPI.reducerPath]: JobAPI.reducer,
   [UserAPI.reducerPath]: UserAPI.reducer,
   [CompanyAPI.reducerPath]: CompanyAPI.reducer,
});
export const store = configureStore({
   reducer: rootReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
         .concat(AuthAPI.middleware)
         .concat(JobAPI.middleware)
         .concat(UserAPI.middleware)
         .concat(CompanyAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
