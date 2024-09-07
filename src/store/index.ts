import { useDispatch, useSelector, useStore } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

import dataApi from "@/api/dataApi";
import authApi from "@/api/authApi";
import userApi from "@/api/userApi";
import cartDetailsSlice from "@/components/cartDetails/cartDetailsSlice";
import searchBarSlice from "@/components/searchBar/searchBarSlice";
import productCardListSlice from "@/components/productCardList/productCardListSlice";
import authSlice from "@/slices/authSlice";

import type { Store, Action } from "@reduxjs/toolkit";
import type { TypedUseSelectorHook } from "react-redux";

const rootReducer = combineReducers({
  //apis
  [dataApi.reducerPath]: dataApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,

  //slices
  searchBarSlice,
  productCardListSlice,
  cartDetailsSlice,
  authSlice,
});

// redux store creation
export const store = configureStore({
  //reducers list
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    //middleware connection for the work of RTK query
    getDefaultMiddleware({}).concat([
      dataApi.middleware,
      authApi.middleware,
      userApi.middleware,
    ]),
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

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type AppStore = ReturnType<typeof setupStore>;
