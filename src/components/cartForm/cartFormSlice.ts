import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import type { ICartResponse } from "@/types";

interface IInitialState {
  data: ICartResponse | null;
  loading: boolean;
  error: Error | null;
}

export const fetchProductsInCartByUserId = createAsyncThunk(
  "cartForm/fetchProductsInCartByUserId",
  async () => {
    const response = await fetch("https://dummyjson.com/carts/user/6");
    return response.json();
  }
);

const initialState: IInitialState = {
  data: null,
  loading: false,
  error: null,
};

const cartFormSlice = createSlice({
  name: "cartFormSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsInCartByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsInCartByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProductsInCartByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

const { actions, reducer } = cartFormSlice;

export const {} = actions;

export default reducer;
