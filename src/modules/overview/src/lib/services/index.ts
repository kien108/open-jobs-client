import { UserAPI } from "./UserAPI";
export { AuthAPI, useLoginMutation } from "./AuthAPI";
export {
   JobAPI,
   useLazyGetJobsQuery,
   useGetJobByIdQuery,
   useGetProvincesQuery,
   useGetMajorsQuery,
   useGetSpecializationsQuery,
   useGetSkillsQuery,
   useApplyJobMutation,
} from "./JobAPI";

export {
   UserAPI,
   useGetProfileQuery,
   useUpdateProfileMutation,
   useUpdateCVMutation,
   useGetCVQuery,
   useGetDistrictsQuery,
} from "./UserAPI";

export {
   CompanyAPI,
   useGetJobCompanyQuery,
   useGetCompaniesQuery,
   useGetCompanyByIdQuery,
} from "./CompanyAPI";
