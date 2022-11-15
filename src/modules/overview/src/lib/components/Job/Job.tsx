import React, { FC } from "react";
import { BtnFunction, Container } from "./styles";
import { Tag2 } from "../../../../../../libs/components";

import { BsThreeDotsVertical } from "react-icons/bs";
import moment from "moment";

interface IProps {
   item: any;
   handleClick: (id: string) => void;
   className: any;
}
const Job: FC<IProps> = ({ item, handleClick, className }) => {
   console.log(item);

   return (
      <Container onClick={() => handleClick(item?.id)} className={className}>
         <div className="header">
            <div className="left">
               <span className="job-title">{item?.title}</span>
               <span className="company">{item?.company?.name}</span>
               <span className="location">{item?.company?.address}</span>
            </div>
            <BtnFunction className="btn-more">
               <BsThreeDotsVertical size={20} color="black" />
            </BtnFunction>
         </div>

         <div className="skills">
            {item?.jobSkills?.map((skill: any) => (
               <Tag2 className={`skill ${skill?.skill?.isVerified ? "" : "invalid"}`}>
                  {skill?.skill?.name}
               </Tag2>
            ))}
         </div>

         <div className="footer">
            <span className="time">{moment(item?.createdAt, "YYYY-MM-DD").fromNow()}</span>
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
