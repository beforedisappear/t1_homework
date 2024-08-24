import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { IUser } from "@/types";
import type { RootState } from "@/store";

const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).authSlice.token;
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUser: builder.query<IUser, undefined>({
      query: () => `/auth/me`,
    }),
  }),
});

export const { useGetUserQuery } = userApi;

export default userApi;
