import React, { FC } from "react";
import { StyledJobItem } from "./styles";
import { IResSuggesJob } from "../../types";
import { convertPrice } from "../../utils";
import moment from "moment";

import "moment/locale/vi";
import { useNavigate } from "react-router-dom";

interface IProps {
   data: IResSuggesJob;
}

const JobItem: FC<IProps> = ({ data }) => {
   // set the locale to Vietnamese
   const navigate = useNavigate();

   return (
      <StyledJobItem onClick={() => navigate(`/overview/job-detail/${data?.id}`)}>
         <div className="img">
            <img src={data?.company?.logoUrl} alt="logo" />
         </div>

         <div className="content">
            <span className="job-title">{data?.title}</span>

            <span className="address">{data?.company?.address}</span>

            <div className="salary">
               <span className="value">
                  {" "}
                  {data?.salaryInfo?.isSalaryNegotiable
                     ? "Mức lương thỏa thuận"
                     : `${convertPrice(data?.salaryInfo?.minSalary)} - ${convertPrice(
                          data?.salaryInfo?.maxSalary
                       )} (${data?.salaryInfo?.salaryType})`}
               </span>
               <span className="post-at">
                  {moment(data?.createdAt).format("HH:mm, DD/MM/YYYY")}
               </span>
            </div>
         </div>
      </StyledJobItem>
   );
};

export default JobItem;
