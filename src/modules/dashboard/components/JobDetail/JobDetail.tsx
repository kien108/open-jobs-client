import React, { FC } from "react";
import { Container } from "./styles";
import { Button, openNotification, Tag, Tag2 } from "../../../../libs/components";
import Parser from "html-react-parser";

import { BsCalendarDay, BsPeople } from "react-icons/bs";
import { AiOutlineHeart, AiOutlineSetting, AiOutlineClockCircle } from "react-icons/ai";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { MdLocationOn, MdOutlineWorkOutline } from "react-icons/md";

import { BiTimeFive } from "react-icons/bi";

import { GrLocation } from "react-icons/gr";

import { Col, Divider, Row, Spin, Tooltip } from "antd";
import { useGetJobByIdQuery, useGetProfileQuery } from "../../services";
import moment from "moment";
import { RootState, useCommonSelector } from "../../../../libs/common";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface IProps {
   id?: any;
   isCompany: boolean;
   isCompare?: boolean;
}

const JobDetail: FC<IProps> = ({ id, isCompany, isCompare = false }) => {
   const navigate = useNavigate();
   const { t } = useTranslation();
   const { user } = useCommonSelector((state: RootState) => state.user);

   const {
      data: jobDetail,
      isLoading: loadingJob,
      isFetching: fetchingJob,
   } = useGetJobByIdQuery(id, { skip: !id, refetchOnMountOrArgChange: true });

   const {
      data: dataUser,
      isLoading,
      isFetching,
   } = useGetProfileQuery(user?.id, {
      refetchOnMountOrArgChange: true,
      skip: !user?.id,
   });

   return (
      <Spin spinning={loadingJob || fetchingJob}>
         <Container>
            <div className="header">
               <div className="content">
                  <span className="job-title">{jobDetail?.title}</span>
                  <span className="company">{jobDetail?.company?.name}</span>
                  <span className="location">{jobDetail?.company?.address}</span>
                  <span className="notify">You must create an account before apply job</span>
               </div>
            </div>
            <Divider />
            <div className="content">
               <div className="skills">
                  {jobDetail?.jobSkills?.map((item: any) =>
                     item?.skill?.isVerified ? (
                        <Tag2 className={`skill`}>{item?.skill?.name}</Tag2>
                     ) : (
                        <Tooltip title="Invalidate Skill" placement="bottom">
                           <Tag2 className="skill invalid">{item?.skill?.name}</Tag2>
                        </Tooltip>
                     )
                  )}
               </div>
               <div className="job-information">
                  <div className="item">
                     <RiMoneyDollarCircleLine size={17} />
                     <span>{jobDetail?.salary}</span>
                  </div>
                  <div className="item">
                     <GrLocation size={17} />
                     <span>{jobDetail?.company?.address}</span>
                  </div>
                  <div className="item">
                     <MdOutlineWorkOutline size={17} />
                     <span>{jobDetail?.workPlace}</span>
                  </div>
                  <div className="item">
                     <BiTimeFive size={17} />
                     <span>{moment(jobDetail?.createdAt, "YYYY-MM-DD").fromNow()}</span>
                  </div>
               </div>
            </div>
            <Divider />
            {!isCompare && <p className="description">{Parser(`${jobDetail?.description}`)}</p>}

            {!isCompany && (
               <div className="footer">
                  <div className="header">
                     <div className="logo">
                        <img src={jobDetail?.company?.logoUrl} alt="" />
                     </div>
                     <div className="right">
                        <span className="name">{jobDetail?.company?.name}</span>
                        <span className="slogan">{jobDetail?.company?.name}</span>
                     </div>
                  </div>
                  <div className="content">
                     <Row gutter={[10, 10]}>
                        <Col span={8}>
                           <div className="item">
                              <AiOutlineSetting size={17} />
                              <span>Product</span>
                           </div>
                           <div className="item">
                              <BsCalendarDay size={17} />
                              <span>Thứ 2 - Thứ 6</span>
                           </div>
                           <div className="item">
                              <AiOutlineClockCircle size={17} />
                              <span>Không OT</span>
                           </div>
                        </Col>
                        <Col span={10}>
                           <div className="item">
                              <BsPeople size={17} />
                              <span>Không OT</span>
                           </div>
                           <div className="item">
                              <GrLocation size={17} />
                              <span>{jobDetail?.company?.address}</span>
                           </div>
                        </Col>
                        <Col span={5}>
                           <Button
                              onClick={() =>
                                 navigate(`/overview/companies/${jobDetail?.company?.id}`)
                              }
                              height={42}
                              border="outline"
                              style={{ width: "fit-content", padding: "0 10px" }}
                           >
                              View Company
                           </Button>
                        </Col>
                     </Row>
                  </div>
               </div>
            )}
         </Container>
      </Spin>
   );
};

export default JobDetail;
