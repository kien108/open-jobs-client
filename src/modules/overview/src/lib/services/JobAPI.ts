import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const JobAPI = createApi({
   reducerPath: "JobAPI",
   baseQuery,
   endpoints: (builder) => ({
      getJobs: builder.query({
         query: (params) => ({
            url: "/job/search",
            params,
         }),
      }),
      getJobById: builder.query<any, string>({
         query: (id) => ({
            url: `/job/details/${id}`,
         }),
      }),
      getProvinces: builder.query({
         query: (params) => ({
            url: "/location/search-province",
            params,
         }),
      }),
   }),
});

export const { useGetJobsQuery, useGetJobByIdQuery, useGetProvincesQuery } = JobAPI;
