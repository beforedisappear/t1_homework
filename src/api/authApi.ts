import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { IAuthDataRequest, IAuthDataResponse } from "@/types";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com",
  }),
  endpoints: (builder) => ({
    login: builder.mutation<IAuthDataResponse, IAuthDataRequest>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;

export default authApi;
