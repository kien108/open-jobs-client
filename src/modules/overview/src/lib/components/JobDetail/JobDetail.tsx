import React, { FC } from "react";
import { Container } from "./styles";
import { Button, Tag, Tag2 } from "../../../../../../libs/components";

import { BsCalendarDay, BsPeople } from "react-icons/bs";
import { AiOutlineHeart, AiOutlineSetting, AiOutlineClockCircle } from "react-icons/ai";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { MdLocationOn, MdOutlineWorkOutline } from "react-icons/md";

import { BiTimeFive } from "react-icons/bi";

import { GrLocation } from "react-icons/gr";

import { Col, Divider, Row, Spin, Tooltip } from "antd";
import { useGetJobByIdQuery } from "../../services";
import moment from "moment";

interface IProps {
   id?: any;
}

const JobDetail: FC<IProps> = ({ id }) => {
   const {
      data: jobDetail,
      isLoading: loadingJob,
      isFetching: fetchingJob,
   } = useGetJobByIdQuery(id, { skip: !id, refetchOnMountOrArgChange: true });

   console.log(jobDetail);
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
               <div className="apply">
                  <Button className="btn-apply">Apply Job</Button>
                  <AiOutlineHeart size={38} color="black" className="save-job" />
               </div>
            </div>
            <Divider />
            <div className="content">
               <div className="skills">
                  {jobDetail?.listSkillExperience?.map((item: any) =>
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
            <p className="description">{jobDetail?.description}</p>
            <div className="footer">
               <div className="header">
                  <div className="logo">
                     <img
                        src={
                           jobDetail?.compnay?.logoUrl ||
                           "data:image/png;base64,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"
                        }
                        alt=""
                     />
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
         </Container>
      </Spin>
   );
};

export default JobDetail;
