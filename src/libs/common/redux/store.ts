import { combineReducers, configureStore } from "@reduxjs/toolkit";
import user from "./slices/userSlices";
import { AdminAPI } from "../services";
import { createDispatchHook, createSelectorHook } from "react-redux";
import lang from "../redux/slices/langSlice";
import { createContext } from "react";

const rootReducer = combineReducers({
   user,
   lang,
});
export const store = configureStore({
   reducer: rootReducer,
});

const apiRootReducer = combineReducers({
   [AdminAPI.reducerPath]: AdminAPI.reducer,
});

export const apiStore = configureStore({
   reducer: apiRootReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false,
      }).concat(AdminAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export const CommonContext = createContext(null as any);
export const useCommonDispatch = createDispatchHook(CommonContext);
export const useCommonSelector = createSelectorHook(CommonContext);

// export type AppDispatch = typeof store.dispatch;

// export const useCommonDispatch: () => AppDispatch = useDispatch;
// export const useCommonSelector: TypedUseSelectorHook<RootState> = useSelector;
