import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const AuthAPI = createApi({
   reducerPath: "AuthAPI",
   baseQuery,
   endpoints: (builder) => ({
      login: builder.mutation({
         query: (body) => ({
            url: "/login",
            body,
            method: "POST",
         }),
      }),
      createHeadHunter: builder.mutation<any, any>({
         query: (body) => ({
            url: "/company/register",
            body,
            method: "POST",
         }),
      }),
   }),
});

export const { useLoginMutation, useCreateHeadHunterMutation } = AuthAPI;
