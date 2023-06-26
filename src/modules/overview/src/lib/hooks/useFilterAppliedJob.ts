import moment from "moment";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

interface Params {
   keyword?: string;
   startDate?: any;
   endDate?: any;
   status?: any;
   // address?: any;
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
      searchParams.get("keyword")
         ? setParams((prev) => ({
              ...prev,
              keyword: searchParams.get("keyword")!.trim() ?? "",
           }))
         : setParams((prev) => {
              delete prev.keyword;
              return { ...prev };
           });
      // searchParams.get("address")
      //    ? setParams((prev) => ({
      //         ...prev,
      //         address: searchParams.get("address")!.trim() ?? "",
      //      }))
      //    : setParams((prev) => {
      //         delete prev.address;
      //         return { ...prev };
      //      });
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

      searchParams.get("jobStatus")
         ? setParams((prev) => ({
              ...prev,
              status: searchParams.get("jobStatus")!.trim() ?? "",
           }))
         : setParams((prev) => {
              delete prev.status;
              return { ...prev };
           });
   }, [searchParams.toString()]);

   return params;
};

export default useFilterSearchJob;
