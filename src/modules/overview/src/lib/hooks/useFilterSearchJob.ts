import moment from "moment";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { revertPrice } from "../utils";

interface Param {
   keyword?: string;
   address?: string;
   skillId?: string;
   startDate?: string;
   endDate?: string;
   jobLevel?: string;
   jobType?: string;
   workplace?: string;
   minSalary?: string;
   maxSalary?: string;
   status?: string;
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
      searchParams.get("address")
         ? setParams((prev) => ({
              ...prev,
              address: searchParams.get("address")!.trim() ?? "",
           }))
         : setParams((prev) => {
              delete prev.address;
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
              workplace: searchParams.get("workplace")!.trim() ?? "",
           }))
         : setParams((prev) => {
              delete prev.workplace;
              return { ...prev };
           });

      searchParams.get("minSalary")
         ? setParams((prev) => ({
              ...prev,
              minSalary: revertPrice(searchParams.get("minSalary")) || "",
           }))
         : setParams((prev) => {
              delete prev.minSalary;
              return { ...prev };
           });

      searchParams.get("maxSalary")
         ? setParams((prev) => ({
              ...prev,
              maxSalary: revertPrice(searchParams.get("maxSalary")) || "",
           }))
         : setParams((prev) => {
              delete prev.maxSalary;
              return { ...prev };
           });

      searchParams.get("status")
         ? setParams((prev) => ({
              ...prev,
              status: searchParams.get("status") || "",
           }))
         : setParams((prev) => {
              delete prev.status;
              return { ...prev };
           });
   }, [searchParams.toString()]);

   return params;
};

export default useFilterSearchJob;
