import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { AuthAPI } from "../services";

const rootReducer = combineReducers({
   [AuthAPI.reducerPath]: AuthAPI.reducer,
});
export const store = configureStore({
   reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
