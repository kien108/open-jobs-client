import moment from "moment";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

interface Param {
   what?: string;
   where?: string;
}

const useFilterUoM = () => {
   const [searchParams] = useSearchParams();
   const [params, setParams] = useState<Param>({});

   useEffect(() => {
      searchParams.get("what")
         ? setParams((prev) => ({
              ...prev,
              what: searchParams.get("what")!.trim() ?? "",
           }))
         : setParams((prev) => {
              delete prev.what;
              return { ...prev };
           });
      searchParams.get("where")
         ? setParams((prev) => ({
              ...prev,
              where: searchParams.get("where")!.trim() ?? "",
           }))
         : setParams((prev) => {
              delete prev.where;
              return { ...prev };
           });
   }, [searchParams]);

   return params;
};

export default useFilterUoM;
