import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// const fetchUserById = createAsyncThunk(
//   "users/fetchByIdStatus",
//   async (userId: number, thunkAPI) => {
//     const response = await userAPI.fetchById(userId);
//     return response.data;
//   }
// );

const initialState = {};

const cartFormSlice = createSlice({
  name: "cartForm",
  initialState,
  reducers: {},
});

const { actions, reducer } = cartFormSlice;

export const {} = actions;

export default reducer;
