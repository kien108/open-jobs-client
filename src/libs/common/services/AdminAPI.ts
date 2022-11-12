import { baseQueryWithReAuth } from "./baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const AdminAPI = createApi({
   reducerPath: "AdminAPI",
   baseQuery: baseQueryWithReAuth,
   endpoints: (builder) => ({
      getAdminById: builder.query<any, string>({
         query: (id) => ({
            url: `/adminuser/${id}`,
         }),
      }),
   }),
});

export const { useGetAdminByIdQuery } = AdminAPI;
