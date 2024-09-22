import authApi from "@/api/authApi";
import userApi from "@/api/userApi";
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
    builder
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          state.token = payload.accessToken;
          localStorage.setItem("token", payload.accessToken);
        }
      )
      .addMatcher(userApi.endpoints.getUser.matchRejected, (state, action) => {
        //if unauthorized
        if (action.payload?.status === 401) {
          state.token = null;
          localStorage.removeItem("token");
        }
      });
  },
});

const { actions, reducer } = authSlice;

export default reducer;

export const { setAccessToken } = actions;
