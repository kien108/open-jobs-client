import React, { FC } from "react";
import { Container } from "./styles";
import { Row } from "antd";
import { IResJob, IResSuggesJob } from "../../types";
import { convertPrice } from "../../utils";
import { useNavigate } from "react-router-dom";

interface IProps {
   jobs?: IResSuggesJob[];
}
const JobSlide: FC<IProps> = ({ jobs }) => {
   const length = jobs?.length || 0;
   const navigate = useNavigate();

   return (
      <Container className="right">
         {(jobs ?? []).map((item, idx) => (
            <div className={`content ${idx !== 2 ? "border" : ""}`}>
               <span className="sug-company">{item?.company?.name}</span>
               <span className="title" onClick={() => navigate(`/overview/job-detail/${item?.id}`)}>
                  {item?.title}
               </span>

               <span className="salary">
                  {item?.salaryInfo?.isSalaryNegotiable
                     ? "Mức lương thỏa thuận"
                     : `${convertPrice(item?.salaryInfo?.minSalary)} - ${convertPrice(
                          item?.salaryInfo?.maxSalary
                       )} (${item?.salaryInfo?.salaryType})`}
               </span>
            </div>
         ))}
      </Container>
   );
};

export default JobSlide;
