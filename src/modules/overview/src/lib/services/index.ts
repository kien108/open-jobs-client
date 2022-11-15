import { UserAPI } from "./UserAPI";
export { AuthAPI, useLoginMutation } from "./AuthAPI";
export {
   JobAPI,
   useGetJobsQuery,
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
