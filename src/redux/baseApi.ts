import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBseQuery";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery(),
  // baseQuery: fetchBaseQuery({
  //   baseUrl: "abc.com",
  //   credentials: "include" //token set in cookie
  // }),
  tagTypes: ["USER"],
  endpoints: () => ({}),
});
