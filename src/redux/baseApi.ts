import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBseQuery";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery(),
  endpoints: () => ({}),
});
