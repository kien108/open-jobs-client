import React, { FC } from "react";
import { BtnFunction, Container } from "./styles";
import { Tag2 } from "../../../../../../libs/components";

import { BsThreeDotsVertical } from "react-icons/bs";
import moment from "moment";
import { Tooltip } from "antd";
import { IResSuggesJob } from "../../types";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { convertPrice } from "../../utils";

interface IProps {
   item: IResSuggesJob;
   handleClick: (id: string) => void;
   className: any;
}
const Job: FC<IProps> = ({ item, handleClick, className }) => {
   const checkDiffTime = (time) => {
      const now = moment();
      const diffInMs = now.diff(moment(time));
      const diffInDays = moment.duration(diffInMs).asDays();

      return diffInDays <= 5;
   };
   return (
      <Container onClick={() => handleClick(item?.id)} className={className}>
         <div
            className={`badge ${
               item?.isApplied ? "applied" : checkDiffTime(item?.createdAt) ? "new" : "hidden"
            }`}
         >
            {item?.isApplied ? "Đã ứng tuyển" : checkDiffTime(item?.createdAt) ? "Mới" : "hidden"}
         </div>
         <div className="header">
            <div className="left">
               <span className="job-title">{item?.title}</span>
               <span className="company">{item?.company?.name}</span>
               <div className="salary">
                  <RiMoneyDollarCircleLine size={17} />

                  <span className="value">
                     {item?.salaryInfo?.isSalaryNegotiable
                        ? "Mức lương thỏa thuận"
                        : `${convertPrice(item?.salaryInfo?.minSalary)} - ${convertPrice(
                             item?.salaryInfo?.maxSalary
                          )} (${item?.salaryInfo?.salaryType})`}
                  </span>
               </div>
            </div>
            {/* <BtnFunction className="btn-more">
               <BsThreeDotsVertical size={20} color="black" />
            </BtnFunction> */}
         </div>

         <div className="skills">
            {item?.jobSkills?.map((item1: any) =>
               item1?.skill?.isVerified ? (
                  <div className="skill">{item1?.skill?.name}</div>
               ) : (
                  <Tooltip title="Chưa kiểm duyệt" placement="bottom">
                     <div className="skill invalid">{item1?.skill?.name}</div>
                  </Tooltip>
               )
            )}
         </div>

         <div className="footer">
            <span className="location">{item?.company?.address}</span>

            <span className="time">{moment(item?.createdAt).format("DD/MM/YYYY")}</span>
            {/* <span className="dot"></span>
            <div className="from">
               <span>From</span>
               <span className="author">
                  <b>kien108</b>
               </span>
            </div> */}
         </div>
      </Container>
   );
};

export default Job;
