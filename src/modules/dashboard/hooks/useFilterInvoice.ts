import moment from "moment";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { revertPrice } from "../utils";

interface Params {
   startDate?: any;
   endDate?: any;
   serviceType?: any;
}

const useFilterSearchJob = () => {
   const date = new Date();
   const firstDay = moment(new Date(date.getFullYear(), date.getMonth(), 1)).format("DD/MM/YYYY");
   const lastDay = moment(new Date(date.getFullYear(), date.getMonth() + 1, 0)).format(
      "DD/MM/YYYY"
   );

   const [searchParams, setSearchParams] = useSearchParams();
   const [params, setParams] = useState<Params>({});

   useEffect(() => {
      if (searchParams.get("dates")) {
         setSearchParams(searchParams);
      } else {
         searchParams.set("dates", encodeURI(`${firstDay} - ${lastDay}`));
      }

      setSearchParams(searchParams);
   }, []);

   useEffect(() => {
      searchParams.get("dates")
         ? setParams((prev) => ({
              ...prev,
              startDate: moment(
                 searchParams.get("dates")?.split("%20-%20")[0],
                 "DD/MM/YYYY"
              ).format("YYYY-MM-DD"),
              endDate: moment(searchParams.get("dates")?.split("%20-%20")[1], "DD/MM/YYYY")
                 .format("YYYY-MM-DD")
                 .toString(),
           }))
         : setParams((prev) => {
              delete prev.startDate;
              delete prev.endDate;
              return { ...prev };
           });

      searchParams.get("serviceType")
         ? setParams((prev) => ({
              ...prev,
              serviceType: searchParams.get("serviceType") ?? "",
           }))
         : setParams((prev) => {
              delete prev.serviceType;
              return { ...prev };
           });
   }, [searchParams.toString()]);

   return params;
};

export default useFilterSearchJob;
