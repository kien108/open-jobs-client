import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const JobAPI = createApi({
   reducerPath: "JobAPI",
   tagTypes: ["JOBS", "COMPANY_JOBS", "CV_APPLIED", "CV_MATCHED"],
   baseQuery,
   endpoints: (builder) => ({
      getJobs: builder.query({
         query: (params) => ({
            url: "/job/search",
            params,
         }),
         providesTags: ["JOBS"],
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
      getJobCompany: builder.query({
         query: (id) => ({
            url: `/job/by-company/${id}`,
         }),
         providesTags: ["COMPANY_JOBS"],
      }),
      createJob: builder.mutation({
         query: (body) => ({
            url: "/job/create",
            body,
            method: "POST",
         }),
         invalidatesTags: ["COMPANY_JOBS"],
      }),
      deleteJob: builder.mutation({
         query: (id) => ({
            url: `/job/delete/${id}`,
            method: "DELETE",
         }),
         invalidatesTags: ["COMPANY_JOBS"],
      }),
      getCvMatched: builder.query({
         query: ({ id, ...params }) => ({
            url: `/cv/match-with-job/${id}`,
            params,
         }),
      }),
      getCvApplied: builder.query({
         query: ({ id, ...params }) => ({
            url: `/cv/applied-job/${id}`,
            params,
         }),
         providesTags: ["CV_APPLIED"],
      }),
      rejectCV: builder.mutation({
         query: ({ cvId, jobId }) => ({
            url: `/cv/${cvId}/remove-application/${jobId}`,
            method: "DELETE",
         }),
         invalidatesTags: ["CV_APPLIED"],
      }),
   }),
});

export const {
   useGetJobsQuery,
   useGetJobByIdQuery,
   useGetProvincesQuery,
   useGetMajorsQuery,
   useGetSpecializationsQuery,
   useGetSkillsQuery,
   useCreateJobMutation,
   useGetJobCompanyQuery,
   useDeleteJobMutation,
   useGetCvMatchedQuery,
   useGetCvAppliedQuery,
   useRejectCVMutation,
} = JobAPI;
