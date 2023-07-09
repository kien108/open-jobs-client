import { baseQueryWithReAuth } from "./baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const AdminAPI = createApi({
   reducerPath: "AdminAPI",
   baseQuery: baseQueryWithReAuth,
   endpoints: (builder) => ({
      getAdminById: builder.query<any, any>({
         query: ({ id, ...params }) => ({
            url: `/userprofile/${id}`,
            params,
         }),
      }),
   }),
});

export const { useGetAdminByIdQuery } = AdminAPI;
