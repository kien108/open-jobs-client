import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";
import { IResDetailJob, IResSuggesJob, IResSuggesionJob } from "../types";

export const JobAPI = createApi({
   reducerPath: "JobAPIOverview",
   baseQuery,
   tagTypes: ["DETAIL"],
   endpoints: (builder) => ({
      getJobs: builder.query<IResSuggesionJob, any>({
         query: (params) => ({
            url: "/job/search",
            params,
         }),
      }),
      getSuggestionJobs: builder.query<IResSuggesionJob, any>({
         query: (params) => ({
            url: "/job/suggestion",
            params,
         }),
      }),

      getJobById: builder.query<IResDetailJob, string>({
         query: (id) => ({
            url: `/job/details/${id}`,
         }),
         providesTags: ["DETAIL"],
      }),
      getProvinces: builder.query({
         query: (params) => ({
            url: "/location/search-province",
            params,
         }),
      }),
      getListDistricts: builder.query({
         query: (params) => ({
            url: "/location/search-district",
            params,
         }),
      }),
      getMajors: builder.query({
         query: (params) => ({
            url: "/majors",
            params,
         }),
      }),
      getSpecializations: builder.query({
         query: (id) => ({
            url: `/specialization/bymajor/${id}`,
         }),
      }),
      getSkills: builder.query({
         query: (id) => ({
            url: `/skill/by-specialization/${id}`,
         }),
      }),
      applyJob: builder.mutation({
         query: ({ cvId, jobId }) => ({
            url: `/cv/${cvId}/apply/${jobId}`,
            method: "POST",
         }),
         invalidatesTags: ["DETAIL"],
      }),
   }),
});

export const {
   useLazyGetJobsQuery,
   useGetJobsQuery,
   useGetJobByIdQuery,
   useGetProvincesQuery,
   useGetListDistrictsQuery,
   useGetMajorsQuery,
   useGetSpecializationsQuery,
   useGetSkillsQuery,
   useApplyJobMutation,
   useGetSuggestionJobsQuery,
} = JobAPI;
