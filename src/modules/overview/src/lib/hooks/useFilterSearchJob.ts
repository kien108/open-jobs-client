import moment from "moment";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

interface Param {
   keyword?: string;
   location?: string;
}

const useFilterSearchJob = () => {
   const [searchParams] = useSearchParams();
   const [params, setParams] = useState<Param>({});

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
      searchParams.get("location")
         ? setParams((prev) => ({
              ...prev,
              location: searchParams.get("location")!.trim() ?? "",
           }))
         : setParams((prev) => {
              delete prev.location;
              return { ...prev };
           });
   }, [searchParams]);

   return params;
};

export default useFilterSearchJob;
