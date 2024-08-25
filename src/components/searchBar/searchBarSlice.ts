import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  searchValue: "",
};

const searchBarSlice = createSlice({
  name: "searchBar",
  initialState,
  reducers: {
    setSearchValue: (state, { payload }: PayloadAction<string>) => {
      state.searchValue = payload;
    },
  },
});

const { actions, reducer } = searchBarSlice;

export const { setSearchValue } = actions;

export default reducer;
