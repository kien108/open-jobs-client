export interface IResCVs {
   listCv: [
      {
         active: boolean;
         additionalInfo: string;
         applyDate: string;
         certificate: string;
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
         status: string;
         title: string;
         userId: string;
      }
   ];
   totalElements: number;
   totalPages: number;
}
