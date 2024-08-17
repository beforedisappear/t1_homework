import {
  createSlice,
  createAsyncThunk,
  SerializedError,
} from "@reduxjs/toolkit";

import type { ICartResponse } from "@/types";

export interface InitialState {
  data: ICartResponse | null;
  loading: boolean;
  error: SerializedError | null;
}

const initialState: InitialState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchProductsInCartByUserId = createAsyncThunk(
  "cartForm/fetchProductsInCartByUserId",
  async (id: string) => {
    const response = await fetch(`https://dummyjson.com/carts/user/${id}`);
    return response.json();
  }
);

const cartDetailsSlice = createSlice({
  name: "cartDetails",
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

const { actions, reducer } = cartDetailsSlice;

export const {} = actions;

export default reducer;
