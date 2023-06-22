import React, { useEffect, useRef, useState } from "react";
import { BtnFunction, Container, GroupButton, StyledBtnsHeader, StyledListUnits } from "./styles";
import {
   useCommonSelector,
   RootState,
   useGetAdminByIdQuery,
   useModal,
} from "../../../../../../libs/common";
import {
   Button,
   DeleteIcon,
   DownloadIcon,
   EditIcon,
   Input,
   MinimizeIcon,
   Modal,
   openNotification,
   PlusIcon,
   Select,
   Table,
   Title,
} from "../../../../../../libs/components";

import Parser from "html-react-parser";
import Avatar from "react-avatar";
import { useGetProfileQuery } from "../../services";

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
import { JobDetail } from "../JobDetail";
import { useReactToPrint } from "react-to-print";

type FormType = {
   listSkill: any;
};

const CVDetail = () => {
   // const { id, userId } = useParams();
   const { id: userId } = useCommonSelector((state: RootState) => state.user.user);
   const tableInstance = Table.useTable();
   const navigate = useNavigate();
   const cvRef = useRef(null);
   const [searchParams] = useSearchParams();

   const { t } = useTranslation();

   const { data: user, isLoading, isFetching } = useGetProfileQuery(userId, { skip: !userId });

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
         title: "Tên kỹ năng",
         dataIndex: "name",
         key: "name",
         width: "45%",
         render: (item) => <span>{item}</span>,
      },
      {
         title: "Kinh nghiệm",
         dataIndex: "experience",
         key: "experience",
         width: "45%",
         render: (item) => <span>{item}</span>,
      },
   ];

   useEffect(() => {
      if (!user) return;
      const { setValue } = form;

      const listSkill = user?.cv?.skills?.map((item: any) => ({
         name: item?.skill?.name,
         experience: item?.yoe,
      }));

      setValue("listSkill", listSkill);
   }, [user]);

   const handlePrint = useReactToPrint({
      content: () => cvRef.current,
      documentTitle: "your-cv.pdf",
   });

   console.log({ user });

   return (
      <Spin spinning={isLoading || isFetching}>
         <StyledBtnsHeader className="btns-header">
            <BtnFunction className="btn-back" onClick={() => navigate(-1)}>
               <BsArrowLeft size={23} />
            </BtnFunction>
            <GroupButton>
               <Button height={44} icon={<DownloadIcon />} onClick={handlePrint}>
                  {t("Export your CV")}
               </Button>
               <Button height={44} icon={<EditIcon />} onClick={() => navigate("edit")}>
                  {t("Edit CV")}
               </Button>
            </GroupButton>
         </StyledBtnsHeader>
         <Container ref={cvRef}>
            <FormProvider {...form}>
               <Row gutter={[40, 40]}>
                  <Col span={11}>
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
                        <div className="extraInformation">
                           <div className="cv-item">
                              <span className="title">Education</span>
                              {Parser(`${user?.cv?.education}`)}
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
            </FormProvider>
         </Container>
      </Spin>
   );
};

export default CVDetail;
