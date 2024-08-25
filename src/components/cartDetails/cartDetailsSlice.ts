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
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://dummyjson.com/carts/user/${id}`);
      if (!response.ok) {
        // If the response is not ok, throw an error
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      return data;
    } catch (error) {
      // Use rejectWithValue to return a custom error message
      return rejectWithValue(JSON.stringify(error));
    }
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
