import React from "react";
import { Container } from "./styles";

import Avatar from "react-avatar";
import { useCommonSelector, RootState, useGetAdminByIdQuery } from "../../../../../../libs/common";

import { MdEmail, MdOutlineNavigateNext } from "react-icons/md";
import { FaCalendarCheck } from "react-icons/fa";

import { AiFillPhone, AiFillEyeInvisible } from "react-icons/ai";
import { Spin } from "antd";
import { useGetProfileQuery } from "../../services";

import Resume from "../../assets/resume.svg";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const Profile = () => {
   const { id } = useCommonSelector((state: RootState) => state.user.user);
   const navigate = useNavigate();

   // console.log(id);
   const { data: user, isLoading, isFetching } = useGetProfileQuery(id, { skip: !id });

   return (
      <Spin spinning={isLoading || isFetching}>
         <Container>
            <div className="header">
               <span className="name">{`${user?.firstName} ${user?.lastName}`}</span>
               <Avatar
                  size="80"
                  round={true}
                  color={"rgb(66, 66, 66)"}
                  fgColor="white"
                  maxInitials={2}
                  name={user?.lastName}
               />
            </div>
            <div className="profile" onClick={() => navigate("contact")}>
               <div className="items">
                  <div className="item">
                     <MdEmail size={17} />
                     <span>{user?.email}</span>
                  </div>
                  <div className="item">
                     <AiFillPhone size={17} />
                     <span>{user?.phone || "--/--"}</span>
                  </div>
                  <div className="item">
                     <FaCalendarCheck size={17} />
                     <span>{moment(user?.dob).format("MM/DD/YYYY") || "--/--"}</span>
                  </div>
               </div>

               <div className="div">
                  <MdOutlineNavigateNext size={30} />
               </div>
            </div>
            <div className="resume" onClick={() => navigate("cv")}>
               <div className="left">
                  <div className="img">
                     <img src={Resume} alt="" />
                  </div>
                  <div className="content">
                     <span className="title">Open Job CV</span>
                     <span className="time-updated">Updated today</span>
                     <div className="item">
                        <AiFillEyeInvisible size={17} />
                        <span>Private</span>
                     </div>
                  </div>
               </div>
               <div className="right">
                  <MdOutlineNavigateNext size={30} />
               </div>
            </div>
         </Container>
      </Spin>
   );
};

export default Profile;
