import React, { FC, useEffect, useRef, useState } from "react";
import {
   BtnFunction,
   Container,
   GroupButton,
   StyledBtnsHeader,
   StyledListUnits,
   StyledModalModal,
} from "./styles";
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
import { useGetProfileQuery, useUpdateCVMutation } from "../../services";

import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { Col, Divider, Row, Spin } from "antd";
import { MdEmail, MdOutlineNavigateNext } from "react-icons/md";
import { BsArrowLeft, BsFillPersonFill, BsPlusLg } from "react-icons/bs";
import { AiFillFileMarkdown } from "react-icons/ai";

import { AiFillPhone } from "react-icons/ai";
import { ColumnsType } from "antd/es/table";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { JobDetail } from "../JobDetail";
import { useReactToPrint } from "react-to-print";
import { CVDetail } from "../CVDetail";

type FormType = {
   listSkill: any;
   mode: any;
};

interface IProps {
   headerHidden?: boolean;
}
const CVTemplate1: FC<IProps> = ({ headerHidden }) => {
   // const { id, userId } = useParams();
   const { id: userId } = useCommonSelector((state: RootState) => state.user.user);
   const tableInstance = Table.useTable();
   const navigate = useNavigate();
   const cvRef = useRef(null);
   const [searchParams] = useSearchParams();

   const { t } = useTranslation();

   const { data: user, isLoading, isFetching } = useGetProfileQuery(userId, { skip: !userId });

   const [upload, { isLoading: loadingUpload }] = useUpdateCVMutation();

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
         render: (item) => <span>{item ? `${item} năm` : "-"}</span>,
      },
   ];

   const { isOpen, handleOpen, handleClose } = useModal();

   useEffect(() => {
      if (!user) return;
      const { setValue } = form;

      const listSkill = user?.cv?.skills?.map((item: any) => ({
         name: item?.skill?.name,
         experience: item?.yoe,
      }));

      setValue("listSkill", listSkill);

      setValue("mode", 1);
   }, [user]);

   const handlePrint = useReactToPrint({
      content: () => cvRef.current,
      documentTitle: "your-cv.pdf",
   });

   const handleChangeMode = () => {
      const payload = {
         ...user?.cv,
         cvType: form.watch("mode"),
      };

      upload(payload)
         .unwrap()
         .then(() => {
            openNotification({
               type: "success",
               message: t("Cập nhật mẫu hồ sơ thành công!!!"),
            });
            navigate(-1);
         })
         .catch((error) => {
            openNotification({
               type: "error",
               message: "Cập nhật mẫu hồ sơ thất bại",
            });
         });
   };
   return (
      <Spin spinning={isLoading || isFetching}>
         {!headerHidden && (
            <StyledBtnsHeader className="btns-header">
               <BtnFunction className="btn-back" onClick={() => navigate(-1)}>
                  <BsArrowLeft size={23} />
               </BtnFunction>
               <GroupButton>
                  <Button height={44} icon={<AiFillFileMarkdown size={23} />} onClick={handleOpen}>
                     Đổi mẫu hồ sơ
                  </Button>

                  <Button height={44} icon={<DownloadIcon />} onClick={handlePrint}>
                     {t("Xuất hồ sơ")}
                  </Button>
                  <Button height={44} icon={<EditIcon />} onClick={() => navigate("edit")}>
                     {t("Chỉnh sửa hồ sơ")}
                  </Button>
               </GroupButton>
            </StyledBtnsHeader>
         )}
         <Container ref={cvRef}>
            <FormProvider {...form}>
               <Row gutter={[20, 20]}>
                  <Col span={10}>
                     <div className="svg-top">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210.917 197.997">
                           <path
                              id="Path_2"
                              data-name="Path 2"
                              d="M196.706,7.21c-.248,7.327-1.677,15.149-6.846,20.359-7.492,7.547-19.671,6.928-29.6,10.736a33.893,33.893,0,0,0-18.3,17.087c-3.436,7.354-4.4,16.262-10.337,21.774-6.433,5.98-16.207,5.774-24.867,7.231s-18.531,7.34-17.651,16.069c.742,7.313,8.44,11.437,13.362,16.895,8.371,9.265,8.729,23.919,3.258,35.136S89.951,171.907,78.94,177.79c-5.114,2.736-10.544,5.087-16.29,5.815-14.049,1.787-28.716-7.561-33.019-21.046-2.681-8.4-2.131-18.612-8.715-24.482C15.362,133.128,7.5,133.664.007,135.795l-14.18,6.729v-156.7H196.744L196.582,1.78A39.758,39.758,0,0,1,196.706,7.21Z"
                              transform="translate(14.173 14.173)"
                              fill="#50a6aa"
                           ></path>
                        </svg>
                     </div>

                     <div className="svg-top-layout">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210.917 197.997">
                           <path
                              id="Path_2"
                              data-name="Path 2"
                              d="M196.706,7.21c-.248,7.327-1.677,15.149-6.846,20.359-7.492,7.547-19.671,6.928-29.6,10.736a33.893,33.893,0,0,0-18.3,17.087c-3.436,7.354-4.4,16.262-10.337,21.774-6.433,5.98-16.207,5.774-24.867,7.231s-18.531,7.34-17.651,16.069c.742,7.313,8.44,11.437,13.362,16.895,8.371,9.265,8.729,23.919,3.258,35.136S89.951,171.907,78.94,177.79c-5.114,2.736-10.544,5.087-16.29,5.815-14.049,1.787-28.716-7.561-33.019-21.046-2.681-8.4-2.131-18.612-8.715-24.482C15.362,133.128,7.5,133.664.007,135.795l-14.18,6.729v-156.7H196.744L196.582,1.78A39.758,39.758,0,0,1,196.706,7.21Z"
                              transform="translate(14.173 14.173)"
                              fill="#50a6aa"
                           ></path>
                        </svg>
                     </div>

                     <div className="avatar">
                        <Avatar
                           size="180"
                           round={true}
                           color={"rgb(66, 66, 66)"}
                           src={user?.avatarUrl}
                           fgColor="white"
                           maxInitials={2}
                           name={`${user?.firstName} ${user?.lastName}`}
                        />
                     </div>

                     <div className="general-container">
                        <div className="cv-item">
                           <span className="title">
                              <span>Thông tin liên lạc</span>
                           </span>
                        </div>
                        <div className="general-information">
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
                              <span className="title">
                                 <span>Giới thiệu bản thân</span>
                              </span>
                              {Parser(`${user?.cv?.objective}`)}
                           </div>
                        </div>
                        <div className="extraInformation">
                           <div className="cv-item">
                              <span className="title">
                                 <span>Học vấn</span>
                              </span>
                              {Parser(`${user?.cv?.education}`)}
                           </div>
                        </div>
                     </div>
                  </Col>

                  <Col span={14}>
                     <div className="header">
                        <span className="name">
                           {" "}
                           {`${user?.firstName.toUpperCase()} ${user?.lastName.toUpperCase()}`}
                        </span>

                        <div className="job-title">{user?.cv?.title}</div>
                     </div>
                     <div className="container">
                        <div className="listSkill">
                           <Row gutter={[10, 10]}>
                              <Col span={11}>
                                 <div className="cv-item p-0" style={{ padding: 0 }}>
                                    <span className="title">
                                       <span>Chuyên ngành</span>
                                    </span>
                                    <span>{user?.cv?.major?.name}</span>
                                 </div>
                              </Col>
                              <Col span={13}>
                                 <div className="cv-item p-0" style={{ padding: 0 }}>
                                    <span className="title">
                                       <span>Chuyên môn</span>
                                    </span>
                                    <span>{user?.cv?.specialization?.name}</span>
                                 </div>
                              </Col>
                           </Row>

                           <div className="cv-item p-0" style={{ marginTop: "20px" }}>
                              <span className="title">
                                 <span>Kỹ năng</span>
                              </span>
                           </div>
                           <Col span={24}>
                              <div className="skills">
                                 {form.watch("listSkill")?.map((item) => (
                                    <div className="skill">
                                       {`${item?.name} - ${item?.experience} năm`}
                                    </div>
                                 ))}
                              </div>
                              {/* <Table
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
                              /> */}
                           </Col>
                        </div>

                        <div className="objective">
                           <div className="cv-item p-0">
                              <span className="title">
                                 <span>Kinh nghiệm</span>
                              </span>
                              <span className="desc">{Parser(`${user?.cv?.experience}`)}</span>
                           </div>
                        </div>
                        <div className="objective">
                           <div className="cv-item p-0">
                              <span className="title">
                                 <span>Chứng chỉ</span>
                              </span>
                              {Parser(`${user?.cv?.certificate}`)}
                           </div>
                        </div>
                     </div>
                  </Col>
               </Row>

               <StyledModalModal
                  visible={isOpen}
                  title="Đổi mẫu hồ sơ"
                  onCancel={handleClose}
                  destroyOnClose
                  width="80%"
               >
                  <Select
                     title="Mẫu hồ sơ"
                     name="mode"
                     options={[
                        {
                           key: 1,
                           label: "1",
                           value: 1,
                           render: () => "Mẫu mặc định",
                        },
                        {
                           key: 2,
                           label: "2",
                           value: 2,
                           render: () => "Mẫu khác",
                        },
                     ]}
                  />

                  <span className="preview">Xem trước</span>

                  {form.watch("mode") === 1 ? (
                     <CVDetail headerHidden={true} />
                  ) : (
                     <CVTemplate1 headerHidden={true} />
                  )}

                  <div className="center">
                     <Button onClick={handleChangeMode} loading={loadingUpload}>
                        Cập nhật
                     </Button>
                     <Button border="outline" onClick={handleClose}>
                        Đóng
                     </Button>
                  </div>
               </StyledModalModal>
            </FormProvider>
         </Container>
      </Spin>
   );
};

export default CVTemplate1;
