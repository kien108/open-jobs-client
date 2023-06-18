import { v4 as uuidv4 } from "uuid";

export const convertEnumToArray = (enumVariable: {
   [k: string]: string | number;
}): { id: string; key: string; value: any }[] => {
   const listValues = Object.values(enumVariable);
   return listValues.reduce((acc: any, valuesOfEnum) => {
      if (typeof enumVariable[valuesOfEnum] === "string") {
         acc.push({
            id: uuidv4(),
            key: enumVariable[valuesOfEnum],
            value: valuesOfEnum,
         });
      }
      return acc;
   }, []);
};

export const convertEnumToArrayWithoutNumber = (enumVariable: {
   [k: string]: string | number;
}): { id: string; key: string; value: any }[] => {
   return Object.keys(enumVariable).map((key) => ({ id: uuidv4(), key, value: enumVariable[key] }));
};
