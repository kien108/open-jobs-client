export { AuthAPI, useLoginMutation } from "./AuthAPI";

export {
   UserAPI,
   useGetProfileQuery,
   useUpdateProfileMutation,
   useUpdateCVMutation,
   useGetCVQuery,
} from "./UserAPI";

export {
   JobAPI,
   useGetJobsQuery,
   useGetJobByIdQuery,
   useGetProvincesQuery,
   useGetMajorsQuery,
   useGetSpecializationsQuery,
   useGetSkillsQuery,
   useCreateJobMutation,
   useDeleteJobMutation,
   useGetCvMatchedQuery,
   useGetCvAppliedQuery,
   useRejectCVMutation,
   useAcceptCVMutation,
   useRejectJobCvMutation,
   useGetListDistrictsQuery,
   useExportCVsMutation,
   useLazyDownloadExportQuery,
   useRenewalJobMutation,
   useGetAllSkillsQuery,
   useUpdateJobMutation,
} from "./JobAPIDashBoard";
