import React, { useEffect } from "react";
import { Container } from "./styles";
import { Col, Divider, Row, Skeleton, Tooltip } from "antd";
import { Button, Tag2, openNotification } from "../../../../../../libs/components";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { GrLocation } from "react-icons/gr";
import { MdOutlineWorkOutline } from "react-icons/md";
import { BiTimeFive } from "react-icons/bi";

import Parser from "html-react-parser";
import { AiOutlinePhone, AiOutlineSetting } from "react-icons/ai";
import { BsCalendarDay, BsPeople } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { useApplyJobMutation, useGetJobByIdQuery } from "../../services";
import moment from "moment";
import { convertPrice } from "../../utils";
import { RelativeJobItem } from "../../components";
import { RootState, getToken, useCommonSelector, useModal } from "../../../../../../libs/common";

const ViewJobDetail = () => {
   const navigate = useNavigate();
   const { user } = useCommonSelector((state: RootState) => state.user);

   const { id } = useParams();

   const { data: jobDetail, isFetching: fetchingDetail } = useGetJobByIdQuery(id!, {
      skip: !id,
      refetchOnMountOrArgChange: true,
   });

   const {
      isOpen: openLogin,
      handleOpen: handleOpenLogin,
      handleClose: handleCloseLogin,
   } = useModal();

   const [applyJob, { isLoading: loadingApplyJob }] = useApplyJobMutation();

   const handelApplyJob = () => {
      const token = getToken();

      if (!token) {
         handleOpenLogin();
      } else if (user?.cv?.skills?.length === 0) {
         openNotification({
            type: "warning",
            message: "Vui lòng tạo CV trước khi ứng tuyển!",
         });
         navigate("/overview/profile/cv");
      } else {
         const body = {
            cvId: user?.cv?.id,
            jobId: jobDetail?.id,
         };

         applyJob(body)
            .unwrap()
            .then(() => {
               openNotification({
                  type: "success",
                  message: "Ứng tuyển thành công!!!",
               });
            })
            .catch((error) => {
               openNotification({
                  type: "error",
                  message: "Bạn đã ứng tuyển công việc này rồi!",
               });
            });
      }
   };

   useEffect(() => {
      scrollTo({
         top: 0,
         left: 0,
         behavior: "smooth",
      });
   }, [id]);
   return (
      <Container>
         <div className="title">Chi tiết công việc</div>

         <Row style={{ gap: "20px" }}>
            <Col span={15} className="right">
               {fetchingDetail ? (
                  <Skeleton active />
               ) : (
                  <>
                     <div className="header">
                        <span className="job-title">{jobDetail?.title}</span>
                        <div className="apply">
                           <Button
                              disabled={jobDetail?.isApplied}
                              className={`btn-apply ${jobDetail?.isApplied ? "applied" : ""}`}
                              onClick={handelApplyJob}
                              loading={loadingApplyJob}
                           >
                              {jobDetail?.isApplied ? "Đã ứng tuyển" : "Ứng tuyển ngay"}
                           </Button>
                        </div>
                     </div>

                     <Divider />

                     <div className="content">
                        <div className="skills">
                           {jobDetail?.jobSkills?.map((item: any) =>
                              item?.skill?.isVerified ? (
                                 <div className="skill">{item?.skill?.name}</div>
                              ) : (
                                 <Tooltip title="Chưa kiểm duyệt" placement="bottom">
                                    <div className="skill invalid">{item?.skill?.name}</div>
                                 </Tooltip>
                              )
                           )}
                        </div>

                        <div className="job-information">
                           <div className="item">
                              <RiMoneyDollarCircleLine size={17} />
                              <span>
                                 {jobDetail?.salaryInfo?.isSalaryNegotiable
                                    ? "Mức lương thỏa thuận"
                                    : `${convertPrice(
                                         jobDetail?.salaryInfo?.minSalary
                                      )} - ${convertPrice(jobDetail?.salaryInfo?.maxSalary)} (${
                                         jobDetail?.salaryInfo?.salaryType
                                      })`}
                              </span>
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
                              <span>
                                 {jobDetail?.createdAt
                                    ? moment(jobDetail?.createdAt, "YYYY-MM-DD").fromNow()
                                    : "--"}
                              </span>
                           </div>
                        </div>

                        <Divider />

                        <p className="description">{Parser(`${jobDetail?.description}`)}</p>
                     </div>
                  </>
               )}
            </Col>

            <Col span={"auto"} flex={"1"} className="left">
               {fetchingDetail ? (
                  <Skeleton active />
               ) : (
                  <div className="footer">
                     <div className="header">
                        <div className="logo">
                           <img src={jobDetail?.company?.logoUrl} alt="" />
                        </div>
                        <span className="name">{jobDetail?.company?.name}</span>
                     </div>
                     <div className="content">
                        <Row gutter={[10, 10]}>
                           <Col span={12}>
                              <div className="item">
                                 <AiOutlineSetting size={17} />
                                 <span>{jobDetail?.company?.companyType}</span>
                              </div>
                              <div className="item">
                                 <AiOutlinePhone size={17} />
                                 <span>{jobDetail?.company?.phone}</span>
                              </div>
                           </Col>
                           <Col span={12}>
                              <div className="item">
                                 <BsPeople size={17} />
                                 <span>{jobDetail?.company?.scope}</span>
                              </div>
                              <div className="item">
                                 <GrLocation size={17} />
                                 <span>{jobDetail?.company?.address}</span>
                              </div>
                           </Col>
                           <Col span={24}>
                              <Button
                                 className="btn-about"
                                 onClick={() =>
                                    navigate(`/overview/companies/${jobDetail?.company?.id}`)
                                 }
                                 height={42}
                                 border="outline"
                                 style={{ width: "fit-content", padding: "0 10px" }}
                              >
                                 Về chúng tôi
                              </Button>
                           </Col>
                        </Row>
                     </div>
                  </div>
               )}
            </Col>
         </Row>

         <div className="title">Việc làm tương tự dành cho bạn</div>
         {fetchingDetail ? (
            <Skeleton active />
         ) : (
            <Row gutter={[20, 20]}>
               {(jobDetail?.relevantJobs ?? [])?.map((item) => (
                  <Col span={8} key={item.id}>
                     <RelativeJobItem data={item} />
                  </Col>
               ))}
            </Row>
         )}
      </Container>
   );
};

export default ViewJobDetail;
