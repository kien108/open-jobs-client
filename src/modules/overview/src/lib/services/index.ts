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
   useGetListDistrictsQuery,
   useGetSuggestionJobsQuery,
   useGetJobsQuery,
} from "./JobAPI";

export {
   UserAPI,
   useGetProfileQuery,
   useUpdateProfileMutation,
   useUpdateCVMutation,
   useGetCVQuery,
   useGetCVAppliedByUserIdQuery,
   useCancelApplyCVMutation,
} from "./UserAPI";

export {
   CompanyAPI,
   useGetJobCompanyQuery,
   useLazyGetCompaniesQuery,
   useGetCompanyByIdQuery,
   useGetCompaniesQuery,
} from "./CompanyAPI";
