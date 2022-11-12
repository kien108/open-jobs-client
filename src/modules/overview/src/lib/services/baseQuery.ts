import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { getToken } from "../../../../../libs/common";

export const baseQuery = fetchBaseQuery({
   baseUrl: import.meta.env.VITE_API_ADMIN,
   prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
         headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
   },
});
