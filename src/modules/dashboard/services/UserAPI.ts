import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const UserAPI = createApi({
   reducerPath: "UserAPI",
   baseQuery,
   tagTypes: ["USER"],
   endpoints: (builder) => ({
      getProfile: builder.query({
         query: (id) => ({
            url: `/userprofile/${id}`,
         }),
         providesTags: ["USER"],
      }),
      updateProfile: builder.mutation({
         query: (body) => ({
            url: `/userprofile/update`,
            body,
            method: "PATCH",
         }),
         invalidatesTags: ["USER"],
      }),
      getCV: builder.query({
         query: (id) => ({
            url: `/cv/byuserid/${id}`,
         }),
         providesTags: ["USER"],
      }),
      updateCV: builder.mutation({
         query: (body) => ({
            url: `/cv/create-update`,
            body,
            method: "POST",
         }),
         invalidatesTags: ["USER"],
      }),
   }),
});

export const { useGetProfileQuery, useUpdateProfileMutation, useUpdateCVMutation, useGetCVQuery } =
   UserAPI;
