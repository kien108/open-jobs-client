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
} from "./CompanyAPI";
