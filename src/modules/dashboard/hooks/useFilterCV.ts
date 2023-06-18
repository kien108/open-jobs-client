import moment from "moment";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { revertPrice } from "../utils";

interface Params {
   keyword?: string;
   skill1?: string;
   skill2?: string;
   skill3?: string;
   skill4?: string;
   skill5?: string;
}

const useFilterSearchJob = () => {
   const [searchParams, setSearchParams] = useSearchParams();
   const [params, setParams] = useState<Params>({});

   useEffect(() => {
      const skills = searchParams.get("skillIds")?.split(",");

      console.log({ skills });

      searchParams.get("keyword")
         ? setParams((prev) => ({
              ...prev,
              keyword: searchParams.get("keyword")!.trim() ?? "",
           }))
         : setParams((prev) => {
              delete prev.keyword;
              return { ...prev };
           });
      skills?.[0]
         ? setParams((prev) => ({
              ...prev,
              skill1: skills?.[0],
           }))
         : setParams((prev) => {
              delete prev.skill1;
              return { ...prev };
           });

      skills?.[1]
         ? setParams((prev) => ({
              ...prev,
              skill2: skills?.[1],
           }))
         : setParams((prev) => {
              delete prev.skill2;
              return { ...prev };
           });

      skills?.[2]
         ? setParams((prev) => ({
              ...prev,
              skill3: skills?.[2],
           }))
         : setParams((prev) => {
              delete prev.skill3;
              return { ...prev };
           });

      skills?.[3]
         ? setParams((prev) => ({
              ...prev,
              skill4: skills?.[3],
           }))
         : setParams((prev) => {
              delete prev.skill4;
              return { ...prev };
           });

      skills?.[4]
         ? setParams((prev) => ({
              ...prev,
              skill5: skills?.[4],
           }))
         : setParams((prev) => {
              delete prev.skill5;
              return { ...prev };
           });
   }, [searchParams.toString()]);

   return params;
};

export default useFilterSearchJob;
