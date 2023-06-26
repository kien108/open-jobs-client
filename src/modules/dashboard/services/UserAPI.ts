import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";
import { IResBusiness, IResCV } from "../types/Responses";

export const UserAPI = createApi({
   reducerPath: "UserAPI",
   baseQuery,
   tagTypes: ["USER", "VIEW_CV"],
   endpoints: (builder) => ({
      getProfile: builder.query({
         query: (id) => ({
            url: `/userprofile/${id}`,
         }),
         providesTags: ["USER"],
      }),
      executePay: builder.mutation({
         query: (body) => ({
            url: "/paypal/success",
            body,
            method: "POST",
         }),
         invalidatesTags: ["USER"],
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

      getBusiness: builder.query<IResBusiness, void>({
         query: () => ({
            url: `/business`,
         }),
      }),

      viewCVByCompany: builder.query({
         query: (params) => ({
            url: `cv/${params?.cvId}/view-by-company/${params.companyId}`,
         }),
         providesTags: ["VIEW_CV"],
      }),

      chargeCV: builder.mutation({
         query: (body) => ({
            url: `/cv/${body?.cvId}/charge-company/${body?.companyId}/${body?.isFree}`,
            body,
            method: "POST",
         }),
         invalidatesTags: ["VIEW_CV", "USER"],
      }),

      updatePremium: builder.mutation({
         query: (body) => ({
            url: `/company/${body?.companyId}/upgrade`,
            body,
            method: "POST",
         }),

         invalidatesTags: ["USER"],
      }),
   }),
});

export const {
   useGetProfileQuery,
   useUpdateProfileMutation,
   useUpdateCVMutation,
   useGetCVQuery,
   useExecutePayMutation,
   useGetBusinessQuery,
   useLazyGetBusinessQuery,
   useViewCVByCompanyQuery,
   useChargeCVMutation,
   useUpdatePremiumMutation,
} = UserAPI;
