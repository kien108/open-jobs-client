import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";
import { IResCVs } from "../types";

export const CVAPI = createApi({
   reducerPath: "CVAPI",
   baseQuery,
   endpoints: (builder) => ({
      searchCV: builder.query<IResCVs, any>({
         query: (params) => ({
            url: "/cv",
            params,
         }),
      }),
   }),
});

export const { useSearchCVQuery } = CVAPI;
