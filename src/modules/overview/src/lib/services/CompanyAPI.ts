import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const CompanyAPI = createApi({
   reducerPath: "CompanyAPI",
   tagTypes: ["COMPANIES", "COMPANY_JOBS"],
   baseQuery,
   endpoints: (builder) => ({
      getCompanies: builder.query({
         query: (params) => ({
            url: `/companies`,
            params,
         }),
         providesTags: ["COMPANIES"],
      }),
      getCompanyById: builder.query({
         query: (id) => ({
            url: `/company/${id}`,
         }),
         providesTags: ["COMPANIES"],
      }),
      getJobCompany: builder.query({
         query: ({ id, ...params }) => ({
            url: `/job/by-company/${id}`,
            params,
         }),
         providesTags: ["COMPANY_JOBS"],
      }),
   }),
});

export const { useGetJobCompanyQuery, useGetCompaniesQuery, useGetCompanyByIdQuery } = CompanyAPI;
