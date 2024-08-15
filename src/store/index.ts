import { useDispatch, useSelector, useStore } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

import type { Store, Action } from "@reduxjs/toolkit";
import type { TypedUseSelectorHook } from "react-redux";

const rootReducer = combineReducers({});

// redux store creation
export const store = configureStore({
  //reducers list
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    //middleware connection for the work of RTK query
    getDefaultMiddleware({}).concat([]),
  devTools: import.meta.env.DEV,
});

//create own type hook for correct useSelector work
export type RootState = ReturnType<typeof rootReducer>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

//create own type useDispatch hook for correct work
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

//create own type useStore hook for corret work
export const useAppStore: () => Store<RootState, Action<any>> = useStore;
