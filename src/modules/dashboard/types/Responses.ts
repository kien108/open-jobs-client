export interface AuthResponse {
   id: string;
   role: string;
   "access-token": string;
   "refresh-token": string;
}

export interface IResBusiness {
   baseCvViewPrice: number;
   baseJobPricePerDay: number;
   freeCvView: number;
   freeJob: number;
   fresherWeight: number;
   highPositionWeight: number;
   id: number;
   internWeight: number;
   juniorWeight: number;
   maxTimeForFreeJobInDays: number;
   middleWeight: number;
   premiumFreeJob: number;
   premiumFreeViewCv: number;
   premiumPrice: number;
   seniorWeight: number;
}

export interface IResCV {
   active: boolean;
   additionalInfo: string;
   applyDate: string;
   certificate: string;
   chargedToView: boolean;
   education: string;
   experience: string;
   id: string;
   isApplied: boolean;
   isMatching: boolean;
   major: {
      id: number;
      name: string;
   };
   objective: string;
   point: number;
   skills: [
      {
         id: number;
         skill: {
            createdAt: string;
            createdBy: string;
            id: number;
            isVerified: boolean;
            name: string;
            updatedAt: string;
            updatedBy: string;
         };
         yoe: number;
      }
   ];
   specialization: {
      id: number;
      name: string;
   };
   status: "ACCEPTED";
   title: string;
   userId: string;
}
