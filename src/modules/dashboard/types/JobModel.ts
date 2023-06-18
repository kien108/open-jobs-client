export enum ExperienceValue {
   ANY = "ANY",
   LESS_THAN_ONE_YEAR = "LESS THAN ONE YEAR",
   ONE_TO_THREE_YEARS = "ONE TO THREE YEARS",
   THREE_TO_FIVE_YEARS = "THREE TO FIVE YEARS",
   MORE_THAN_FIVE_YEARS = "MORE THAN FIVE YEARS",
}

export enum WorkPlace {
   ONSITE = "ONSITE",
   WORK_FROM_HOME = "WORK FROM HOME",
   HYBRID = "HYBRID",
}

export interface IResJobs {
   listJob: IJob[];
   totalElements: number;
   totalPages: number;
}

export interface IJob {
   createdAt: string;
   createdBy: string;
   description: string;
   expiredAt: string;
   hoursPerWeek: string;
   id: string;
   jobLevel: string;
   jobSkills: IJobSkill[];
   jobType: string;
   quantity: number;
   salaryInfo: {
      isSalaryNegotiable: boolean;
      maxSalary: number;
      minSalary: number;
      salaryType: string;
   };
   title: string;
   updatedAt: string;
   updatedBy: string;
   workPlace: string;
   major: {
      id: number;
      name: string;
   };
   specialization: {
      id: number;
      name: string;
   };

   jobStatus?: any;
}

export interface IJobSkill {
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
   yoe: string;
   weight: number;
}

export interface IJobRecord extends IJob {
   key: string;
}
