import { v4 as uuidv4 } from "uuid";

export const convertEnumToArrayWithoutNumber = (enumVariable: {
   [k: string]: string | number;
}): { id: string; key: string; value: any }[] => {
   return Object.keys(enumVariable).map((key) => ({ id: uuidv4(), key, value: enumVariable[key] }));
};
