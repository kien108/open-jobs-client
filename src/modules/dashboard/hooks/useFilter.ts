import moment from "moment";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { revertPrice } from "../utils";

interface Params {
   keyword?: string;
   majorId?: string;
   skillId?: string;
   startDate?: any;
   endDate?: any;
   address?: any;
   jobLevel?: any;
   jobType?: any;
   workPlace?: any;
   minSalary?: any;
   maxSalary?: any;
   jobStatus?: any;
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
      searchParams.get("majorId")
         ? setParams((prev) => ({
              ...prev,
              majorId: searchParams.get("majorId")!.trim() ?? "",
           }))
         : setParams((prev) => {
              delete prev.majorId;
              return { ...prev };
           });

      searchParams.get("skillId")
         ? setParams((prev) => ({
              ...prev,
              skillId: searchParams.get("skillId")!.trim() ?? "",
           }))
         : setParams((prev) => {
              delete prev.skillId;
              return { ...prev };
           });

      searchParams.get("address")
         ? setParams((prev) => ({
              ...prev,
              address: searchParams.get("address")!.trim() ?? "",
           }))
         : setParams((prev) => {
              delete prev.address;
              return { ...prev };
           });

      searchParams.get("jobLevel")
         ? setParams((prev) => ({
              ...prev,
              jobLevel: searchParams.get("jobLevel")!.trim() ?? "",
           }))
         : setParams((prev) => {
              delete prev.jobLevel;
              return { ...prev };
           });

      searchParams.get("jobType")
         ? setParams((prev) => ({
              ...prev,
              jobType: searchParams.get("jobType")!.trim() ?? "",
           }))
         : setParams((prev) => {
              delete prev.jobType;
              return { ...prev };
           });

      searchParams.get("workplace")
         ? setParams((prev) => ({
              ...prev,
              workPlace: searchParams.get("workplace")!.trim() ?? "",
           }))
         : setParams((prev) => {
              delete prev.workPlace;
              return { ...prev };
           });

      searchParams.get("minSalary")
         ? setParams((prev) => ({
              ...prev,
              minSalary: revertPrice(searchParams.get("minSalary")!.trim()) ?? "",
           }))
         : setParams((prev) => {
              delete prev.minSalary;
              return { ...prev };
           });

      searchParams.get("maxSalary")
         ? setParams((prev) => ({
              ...prev,
              maxSalary: revertPrice(searchParams.get("maxSalary")!.trim()) ?? "",
           }))
         : setParams((prev) => {
              delete prev.maxSalary;
              return { ...prev };
           });

      searchParams.get("jobStatus")
         ? setParams((prev) => ({
              ...prev,
              jobStatus: searchParams.get("jobStatus") ?? "",
           }))
         : setParams((prev) => {
              delete prev.jobStatus;
              return { ...prev };
           });
   }, [searchParams.toString()]);

   return params;
};

export default useFilterSearchJob;
