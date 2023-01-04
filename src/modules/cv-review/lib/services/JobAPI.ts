import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const JobAPI = createApi({
   reducerPath: "JobAPIOverview",
   baseQuery,
   tagTypes: ["DETAIL"],
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
   useGetJobByIdQuery,
   useGetProvincesQuery,
   useGetListDistrictsQuery,
   useGetMajorsQuery,
   useGetSpecializationsQuery,
   useGetSkillsQuery,
   useApplyJobMutation,
} = JobAPI;
