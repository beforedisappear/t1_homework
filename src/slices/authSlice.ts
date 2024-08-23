import authApi from "@/api/authApi";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Token = string | null;

const initialState: { token: Token } = {
  token: null,
};

const authSlice = createSlice({
  name: "auth", //namespace of created actions
  initialState,
  reducers: {
    //actionCreators
    setAccessToken: (state, { payload }: PayloadAction<Token>) => {
      state.token = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.token;
        localStorage.setItem("token", payload.token);
      }
    );
  },
});

const { actions, reducer } = authSlice;

export default reducer;

export const { setAccessToken } = actions;
