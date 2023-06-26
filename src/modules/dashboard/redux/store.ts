import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { AuthAPI, CVAPI, JobAPI, PayAPI, UserAPI } from "../services";

const rootReducer = combineReducers({
   [AuthAPI.reducerPath]: AuthAPI.reducer,
   [UserAPI.reducerPath]: UserAPI.reducer,
   [JobAPI.reducerPath]: JobAPI.reducer,
   [PayAPI.reducerPath]: PayAPI.reducer,
   [CVAPI.reducerPath]: CVAPI.reducer,
});
export const store = configureStore({
   reducer: rootReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false })
         .concat(UserAPI.middleware)
         .concat(JobAPI.middleware)
         .concat(PayAPI.middleware)
         .concat(CVAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
