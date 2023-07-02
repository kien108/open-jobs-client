import React, { FC } from "react";
import { IResSuggesJob } from "../../types";
import { Container } from "./styles";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { GrLocation } from "react-icons/gr";
import { MdOutlineWorkOutline } from "react-icons/md";
import moment from "moment";
import { convertPrice } from "../../utils";
import { Tooltip } from "antd";
import { useNavigate } from "react-router-dom";

interface IProps {
   data?: IResSuggesJob;
}
const RelativeJobItem: FC<IProps> = ({ data }) => {
   const navigate = useNavigate();

   const checkDiffTime = (time) => {
      const now = moment();
      const diffInMs = now.diff(moment(time));
      const diffInDays = moment.duration(diffInMs).asDays();

      return diffInDays <= 5;
   };

   return (
      <Container>
         <span className="date">
            {data?.createdAt ? moment(data?.createdAt).format("HH:mm, DD/MM/YYYY") : "--"}
         </span>
         <div
            className={`badge ${
               data?.isApplied ? "applied" : checkDiffTime(data?.createdAt) ? "new" : "hidden"
            }`}
         >
            {data?.isApplied ? "Đã ứng tuyển" : checkDiffTime(data?.createdAt) ? "Mới" : "hidden"}
         </div>

         <span
            className="relative-title"
            onClick={() => navigate(`/overview/job-detail/${data?.id}`)}
         >
            {data?.title}
         </span>

         <div className="relative-company">
            <div
               className="img"
               onClick={() => navigate(`/overview/companies/${data?.company?.id}`)}
            >
               <img src={data?.company?.logoUrl} alt="" />
            </div>

            <span
               className="name"
               onClick={() => navigate(`/overview/companies/${data?.company?.id}`)}
            >
               {data?.company?.name}
            </span>
         </div>

         <div className="salary">
            <RiMoneyDollarCircleLine size={17} />

            <span className="value">
               {data?.salaryInfo?.isSalaryNegotiable
                  ? "Mức lương thỏa thuận"
                  : `${convertPrice(data?.salaryInfo?.minSalary)} - ${convertPrice(
                       data?.salaryInfo?.maxSalary
                    )} (${data?.salaryInfo?.salaryType})`}
            </span>
         </div>

         <div className="workplace">
            <div className="item">
               <MdOutlineWorkOutline size={17} />
               <span>{data?.workPlace}</span>
            </div>
            <div className="item">
               <GrLocation size={17} />
               <span>{data?.company?.address}</span>
            </div>
         </div>

         <div className="skills">
            {data?.jobSkills?.map((item: any) =>
               item?.skill?.isVerified ? (
                  <div className="skill">{item?.skill?.name}</div>
               ) : (
                  <Tooltip title="Chưa kiểm duyệt" placement="bottom">
                     <div className="skill invalid">{item?.skill?.name}</div>
                  </Tooltip>
               )
            )}
         </div>
      </Container>
   );
};

export default RelativeJobItem;
