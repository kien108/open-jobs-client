import React, { useEffect, useRef, useState } from "react";
import { BtnFunction, Container, GroupButton, StyledListUnits } from "./styles";
import {
   useCommonSelector,
   RootState,
   useGetAdminByIdQuery,
   useModal,
} from "../../../../libs/common";
import {
   Button,
   DeleteIcon,
   Input,
   MinimizeIcon,
   Modal,
   openNotification,
   PlusIcon,
   Select,
   Table,
   Title,
} from "../../../../libs/components";

import Parser from "html-react-parser";
import Avatar from "react-avatar";
import {
   useAcceptCVMutation,
   useGetCVQuery,
   useGetMajorsQuery,
   useGetProfileQuery,
   useGetSkillsQuery,
   useGetSpecializationsQuery,
   useRejectJobCvMutation,
   useUpdateCVMutation,
} from "../../services";

import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { Col, Divider, Row, Spin } from "antd";
import { MdEmail, MdOutlineNavigateNext } from "react-icons/md";
import { BsArrowLeft, BsFillPersonFill, BsPlusLg } from "react-icons/bs";

import { AiFillPhone } from "react-icons/ai";
import { ColumnsType } from "antd/es/table";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ExperienceValue } from "../../types/JobModel";
import { JobDetail } from "../JobDetail";

type FormType = {
   listSkill: any;
};

const CVDetail = () => {
   const { id, userId } = useParams();
   const tableInstance = Table.useTable();
   const navigate = useNavigate();

   const [searchParams] = useSearchParams();

   const { t } = useTranslation();

   const { data: user, isLoading, isFetching } = useGetProfileQuery(userId, { skip: !userId });

   const [acceptCV, { isLoading: loadingAccept }] = useAcceptCVMutation();
   const [rejectCV, { isLoading: loadingReject }] = useRejectJobCvMutation();

   const form = useForm<FormType>({
      defaultValues: {},
      resolver: yupResolver(
         yup.object({
            listSkill: yup.array().of(yup.object().shape({})),
         })
      ),
   });

   const { fields, append, remove, update } = useFieldArray({
      control: form.control,
      name: "listSkill",
   });

   const columns: ColumnsType<any> = [
      {
         title: t("Name"),
         dataIndex: "name",
         key: "name",
         width: "45%",
         render: (item) => <span>{item.replaceAll("_", " ")}</span>,
      },
      {
         title: t("Exp"),
         dataIndex: "experience",
         key: "experience",
         width: "45%",
         render: (item) => <span>{item.replaceAll("_", " ")}</span>,
      },
   ];

   const onSubmit = (data: any) => {
      acceptCV({ jobId: id, cvId: user?.cv?.id })
         .unwrap()
         .then(() => {
            openNotification({
               type: "success",
               message: t("Accept CV successful!!!"),
            });
            navigate(-1);
         })
         .catch((error) => {
            openNotification({
               type: "error",
               message: "INTERNAL SERVER ERROR!!!",
            });
            navigate(-1);
         });
   };

   const handleRejectJobCv = () => {
      rejectCV({ jobId: id, cvId: user?.cv?.id })
         .unwrap()
         .then(() => {
            openNotification({
               type: "success",
               message: t("Reject CV successful!!!"),
            });
            navigate(-1);
         })
         .catch((error) => {
            openNotification({
               type: "error",
               message: "INTERNAL SERVER ERROR!!!",
            });
            navigate(-1);
         });
   };

   useEffect(() => {
      if (!user) return;
      const { setValue } = form;

      setValue("listSkill", user?.cv?.listSkill);
   }, [user]);

   return (
      <Spin spinning={isLoading || isFetching}>
         <BtnFunction className="btn-back" onClick={() => navigate(-1)}>
            <BsArrowLeft size={23} />
         </BtnFunction>
         <Container>
            <FormProvider {...form}>
               <Row gutter={[30, 30]}>
                  <Col span={8} className="job-detail">
                     <Title style={{ marginBottom: "30px", display: "block" }}>Job Post</Title>
                     <JobDetail id={id} isCompany={true} isCompare={true} />
                  </Col>
                  <Col span={16}>
                     <Row gutter={[30, 30]}>
                        <Col span={11}>
                           <Title style={{ marginBottom: "30px", display: "block" }}>CV</Title>
                           <div className="container">
                              <div className="general-information">
                                 <Avatar
                                    size="150"
                                    round={true}
                                    color={"rgb(66, 66, 66)"}
                                    src={user?.avatarUrl}
                                    fgColor="white"
                                    maxInitials={2}
                                    name={`${user?.firstName} ${user?.lastName}`}
                                 />
                                 <div className="cv-item">
                                    <span className="title">Title</span>
                                    <span>{user?.cv?.title}</span>
                                 </div>

                                 <div className="right">
                                    <div className="item">
                                       <BsFillPersonFill size={17} />
                                       <span>{`${user?.firstName.toUpperCase()} ${user?.lastName.toUpperCase()}`}</span>
                                    </div>
                                    <div className="item">
                                       <MdEmail size={17} />
                                       <span>{user?.email}</span>
                                    </div>
                                    <div className="item">
                                       <AiFillPhone size={17} />
                                       <span>{user?.phone}</span>
                                    </div>
                                 </div>
                              </div>
                              <div className="extraInformation">
                                 <div className="cv-item">
                                    <span className="title">Objective</span>
                                    {Parser(`${user?.cv?.objective}`)}
                                 </div>
                              </div>
                           </div>
                        </Col>
                        <Col span={13}>
                           <div className="container">
                              <div className="listSkill">
                                 <Row gutter={[10, 10]}>
                                    <Col span={12}>
                                       <div className="cv-item">
                                          <span className="title">Major</span>
                                          <span>{user?.cv?.major?.name}</span>
                                       </div>
                                    </Col>
                                    <Col span={12}>
                                       <div className="cv-item">
                                          <span className="title">Specialization</span>
                                          <span>{user?.cv?.specialization?.name}</span>
                                       </div>
                                    </Col>
                                 </Row>

                                 <div className="cv-item" style={{ marginTop: "20px" }}>
                                    <span className="title">SKILLS</span>
                                 </div>
                                 <Col span={24}>
                                    <Table
                                       dataSource={fields.map((item, index) => ({
                                          key: index,
                                          name: form.watch(`listSkill.[${index}].name`),
                                          experience: form.watch(`listSkill.[${index}].experience`),
                                          isVerified:
                                             form.watch(`listSkill.[${index}].isVerified`) || false,
                                       }))}
                                       tableInstance={tableInstance}
                                       columns={columns}
                                       totalPages={0}
                                       totalElements={0}
                                       showPagination={false}
                                       loading={false}
                                    />
                                 </Col>
                              </div>

                              <div className="objective">
                                 <div className="cv-item">
                                    <span className="title">Experience</span>
                                    {Parser(`${user?.cv?.experience}`)}
                                 </div>
                              </div>
                              <div className="objective">
                                 <div className="cv-item">
                                    <span className="title">Certificate</span>
                                    {Parser(`${user?.cv?.certificate}`)}
                                 </div>
                              </div>
                           </div>
                        </Col>
                     </Row>
                  </Col>
               </Row>
            </FormProvider>

            <GroupButton>
               {searchParams.get("status") !== "REJECTED" && (
                  <Button
                     height={50}
                     key="back"
                     border="outline"
                     onClick={handleRejectJobCv}
                     loading={loadingReject}
                  >
                     {t("Reject")}
                  </Button>
               )}

               {searchParams.get("status") !== "ACCEPTED" && (
                  <Button
                     height={50}
                     loading={loadingAccept}
                     onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        form.handleSubmit(onSubmit)();
                     }}
                  >
                     Accept
                  </Button>
               )}
            </GroupButton>
         </Container>
      </Spin>
   );
};

export default CVDetail;
