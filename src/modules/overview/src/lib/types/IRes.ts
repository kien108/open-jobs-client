export interface IResCompanies {
   companies: IResCompany[];
   totalElements: number;
   totalPages: number;
}

export interface IResCompany {
   accountBalance: number;
   address: string;
   base64Images: string[];
   companyType: string;
   contractEndDate: string;
   createdAt: string;
   createdBy: string;
   description: string;
   email: string;
   id: string;
   imageUrls: string[];
   imageUrlString: string;
   isActive: boolean;
   logoUrl: string;
   memberType: string;
   name: string;
   phone: string;
   scope: number;
   totalEmployee: number;
   updatedAt: string;
   updatedBy: string;
}

export interface IResSuggesionJob {
   listJob: [
      {
         company: IResCompany;
         createdAt: string;
         description: string;
         expiredAt: string;
         hoursPerWeek: string;
         id: string;
         isApplied: boolean;
         jobLevel: string;
         jobSkills: [
            {
               id: number;
               required: boolean;
               skill: {
                  createdAt: string;
                  createdBy: string;
                  id: number;
                  isVerified: boolean;
                  name: string;
                  updatedAt: string;
                  updatedBy: string;
               };
               weight: number;
               yoe: number;
            }
         ];
         jobStatus: string;
         jobType: string;
         major: {
            id: number;
            name: string;
         };
         quantity: number;
         salary: string;
         salaryInfo: {
            isSalaryNegotiable: boolean;
            maxSalary: number;
            minSalary: number;
            salaryType: string;
         };
         specialization: {
            id: number;
            name: string;
         };
         title: string;
         workPlace: string;
      }
   ];
   listRelevantJob: [
      {
         company: IResCompany;
         createdAt: string;
         description: string;
         expiredAt: string;
         hoursPerWeek: string;
         id: string;
         isApplied: boolean;
         jobLevel: string;
         jobSkills: [
            {
               id: number;
               required: boolean;
               skill: {
                  createdAt: string;
                  createdBy: string;
                  id: number;
                  isVerified: boolean;
                  name: string;
                  updatedAt: string;
                  updatedBy: string;
               };
               weight: number;
               yoe: number;
            }
         ];
         jobStatus: string;
         jobType: string;
         major: {
            id: number;
            name: string;
         };
         quantity: number;
         salary: string;
         salaryInfo: {
            isSalaryNegotiable: boolean;
            maxSalary: number;
            minSalary: number;
            salaryType: string;
         };
         specialization: {
            id: number;
            name: string;
         };
         title: string;
         workPlace: string;
      }
   ];
   totalElements: number;
   totalPages: number;
}

export interface IResJob {
   createdAt: string;
   description: string;
   expiredAt: string;
   hoursPerWeek: string;
   id: string;
   isApplied: boolean;
   jobLevel: string;
   jobSkills: [
      {
         id: number;
         required: boolean;
         skill: {
            createdAt: string;
            createdBy: string;
            id: number;
            isVerified: boolean;
            name: string;
            updatedAt: string;
            updatedBy: string;
         };
         weight: number;
         yoe: number;
      }
   ];
   jobStatus: string;
   jobType: string;
   major: {
      id: number;
      name: string;
   };
   quantity: number;
   salary: string;
   salaryInfo: {
      isSalaryNegotiable: boolean;
      maxSalary: number;
      minSalary: number;
      salaryType: string;
   };
   specialization: {
      id: number;
      name: string;
   };
   title: string;
   workPlace: string;
}
