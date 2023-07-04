export { AuthAPI, useLoginMutation } from "./AuthAPI";

export {
   UserAPI,
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
   useGetHistoryQuery,
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
   useGetJobPriceMutation,
} from "./JobAPIDashBoard";

export { PayAPI, useLazyGetPayQuery } from "./PayAPI";

export { CVAPI, useSearchCVQuery } from "./CVAPI";
