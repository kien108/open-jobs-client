import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const PayAPI = createApi({
   reducerPath: "PayAPI",
   baseQuery,
   endpoints: (builder) => ({
      getPay: builder.query({
         query: (params) => ({
            url: "/paypal",
            params,
         }),
      }),
      getAnalyticCVs: builder.query({
         query: ({ companyId, ...params }) => ({
            url: `/statistics/cv/${companyId}`,
            params,
         }),
      }),
   }),
});

export const { useLazyGetPayQuery, useGetAnalyticCVsQuery } = PayAPI;
