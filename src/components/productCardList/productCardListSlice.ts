import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = { page: 0 };

const productCardListSlice = createSlice({
  name: "productCardList",
  initialState,
  reducers: {
    setPage: (state, { payload }: PayloadAction<number>) => {
      state.page = payload;
    },
  },
});

const { actions, reducer } = productCardListSlice;

export const { setPage } = actions;

export default reducer;
