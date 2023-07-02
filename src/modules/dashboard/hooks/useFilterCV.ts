import moment from "moment";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { revertPrice } from "../utils";

interface Params {
   keyword?: string;
   skillId?: string;
}

const useFilterSearchJob = () => {
   const [searchParams, setSearchParams] = useSearchParams();
   const [params, setParams] = useState<Params>({});

   useEffect(() => {
      searchParams.get("keyword")
         ? setParams((prev) => ({
              ...prev,
              keyword: searchParams.get("keyword")!.trim() ?? "",
           }))
         : setParams((prev) => {
              delete prev.keyword;
              return { ...prev };
           });
      searchParams.get("skillId")
         ? setParams((prev) => ({
              ...prev,
              skillId: searchParams.get("skillId") || "",
           }))
         : setParams((prev) => {
              delete prev.skillId;
              return { ...prev };
           });
   }, [searchParams.toString()]);

   return params;
};

export default useFilterSearchJob;
