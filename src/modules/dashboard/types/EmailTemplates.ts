export interface ITemplateItem {
   id: string;
   body: string;
   bodyDelta: string;
   isRequest: boolean;
   isTemplate: boolean;
   name: string;
   status: number;
   subject: string;
   subjectDelta: string;
}

export interface ITemplates {
   items: ITemplateItem[];
   totalElements: number;
   totalPages: number;
   totalItems: number;
}

export interface ITempVariable {
   description: string;
   id: string;
   name: string;
   marker: string;
}

export interface ITemplateContent {
   body: string;
   bodyDelta: string;
   name: string;
   status: number;
   statusBoolean: boolean;
   subject: string;
   subjectDelta: string;
   id?: string;
}
