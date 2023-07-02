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
   useChargeCVMutation,
   useGetBusinessQuery,
   useGetCVQuery,
   useGetMajorsQuery,
   useGetProfileQuery,
   useGetSkillsQuery,
   useGetSpecializationsQuery,
   useLazyGetBusinessQuery,
   useRejectJobCvMutation,
   useUpdateCVMutation,
   useViewCVByCompanyQuery,
} from "../../services";

import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { Col, Divider, Row, Skeleton, Spin } from "antd";
import { MdEmail, MdOutlineNavigateNext } from "react-icons/md";
import { BsArrowLeft, BsFillPersonFill, BsPlusLg } from "react-icons/bs";

import { AiFillPhone } from "react-icons/ai";
import { ColumnsType } from "antd/es/table";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ExperienceValue } from "../../types/JobModel";
import { JobDetail } from "../JobDetail";
import { EJobStatus } from "../../../../types";
import { spawn } from "child_process";
import { Payment } from "../../container/Header/components";

type FormType = {
   listSkill: any;
};

const CVDetail = () => {
   const { id } = useParams();
   const tableInstance = Table.useTable();
   const navigate = useNavigate();
   const { user: accountData } = useCommonSelector((state: RootState) => state.user);

   const [searchParams] = useSearchParams();
   const {
      isOpen: openModalCharge,
      handleOpen: handleOpenCharge,
      handleClose: handleCloseCharge,
   } = useModal();

   const {
      isOpen: openModalViewFree,
      handleOpen: handleOpenViewFree,
      handleClose: handleCloseViewFree,
   } = useModal();

   const {
      isOpen: openModalPayConfirm,
      handleOpen: handleOpenPayConfirm,
      handleClose: handleClosePayConfirm,
   } = useModal();

   const {
      isOpen: openModalPay,
      handleOpen: handleOpenPay,
      handleClose: handleClosePay,
   } = useModal();

   const { t } = useTranslation();

   const {
      data: user,
      isLoading,
      isFetching,
   } = useViewCVByCompanyQuery(
      {
         cvId: id,
         companyId: accountData?.companyId,
      },
      { skip: !id, refetchOnMountOrArgChange: true }
   );

   const [getBusiness, { data: dataBusiness, isFetching: fetchingBusiness }] =
      useLazyGetBusinessQuery();

   const [acceptCV, { isLoading: loadingAccept }] = useAcceptCVMutation();
   const [rejectCV, { isLoading: loadingReject }] = useRejectJobCvMutation();
   const [chargeCV, { isLoading: loadingChargeCV }] = useChargeCVMutation();

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
      },
      {
         title: t("Exp"),
         dataIndex: "experience",
         key: "experience",
         width: "45%",
         render: (value) => (value ? <span>{`${value} năm`}</span> : "-"),
      },
   ];

   const onSubmit = (data: any) => {
      acceptCV({ jobId: id, cvId: id })
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
      rejectCV({ jobId: id, cvId: id })
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

      const listSkill = user?.user?.cv?.skills?.map((item: any) => ({
         name: item?.skill?.name,
         experience: item?.yoe,
      }));

      setValue("listSkill", listSkill);
   }, [user]);

   const handleCharge = () => {
      if (accountData?.company?.accountBalance >= (dataBusiness?.baseCvViewPrice ?? 0)) {
         const payload = {
            companyId: accountData?.companyId,
            cvId: id,
            isFree: accountData?.company?.amountOfFreeCvViews > 0,
         };
         chargeCV(payload)
            .unwrap()
            .then((res) => {
               openNotification({
                  type: "success",
                  message: "Thanh toán thành công!",
               });
            })
            .catch((err) => {
               openNotification({
                  type: "error",
                  message: "Thanh toán thất bại!",
               });
            });

         if (accountData?.company?.amountOfFreeCvViews > 0) {
            handleCloseViewFree();
         } else {
            handleCloseCharge();
         }
      } else {
         handleOpenPayConfirm();
      }
   };

   return (
      <Spin spinning={isLoading || isFetching}>
         <BtnFunction className="btn-back" onClick={() => navigate(-1)}>
            <BsArrowLeft size={23} />
         </BtnFunction>
         <Container>
            <FormProvider {...form}>
               <Row gutter={[40, 40]}>
                  <Col span={11}>
                     <div className="container">
                        <div className="general-information">
                           <Avatar
                              size="150"
                              round={true}
                              color={"rgb(66, 66, 66)"}
                              src={user?.user?.avatarUrl}
                              fgColor="white"
                              maxInitials={2}
                              name={`${user?.user?.firstName} ${user?.user?.lastName}`}
                           />
                           <div className="cv-item">
                              <span className="title">Tiêu đề</span>
                              <span>{user?.user?.cv?.title}</span>
                           </div>

                           <div
                              className={`right ${user?.chargedToView ? "" : "hidden"}`}
                              onClick={() => {
                                 if (user?.chargedToView) return;

                                 if (accountData?.company?.amountOfFreeCvViews > 0) {
                                    handleOpenViewFree();
                                 } else {
                                    getBusiness();
                                    handleOpenCharge();
                                 }
                              }}
                           >
                              <div className="item">
                                 <BsFillPersonFill size={17} />
                                 <span>{`${user?.user?.firstName.toUpperCase()} ${user?.user?.lastName.toUpperCase()}`}</span>
                              </div>
                              <div className="item">
                                 <MdEmail size={17} />
                                 <span>{user?.user?.email}</span>
                              </div>
                              <div className="item">
                                 <AiFillPhone size={17} />
                                 <span>{user?.user?.phone}</span>
                              </div>
                           </div>
                        </div>
                        <div className="extraInformation">
                           <div className="cv-item">
                              <span className="title">Giới thiệu bản thân</span>
                              {Parser(`${user?.user?.cv?.objective}`)}
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
                                    <span className="title">Chuyên ngành</span>
                                    <span>{user?.user?.cv?.major?.name}</span>
                                 </div>
                              </Col>
                              <Col span={12}>
                                 <div className="cv-item">
                                    <span className="title">Chuyên môn</span>
                                    <span>{user?.user?.cv?.specialization?.name}</span>
                                 </div>
                              </Col>
                           </Row>

                           <div className="cv-item" style={{ marginTop: "20px" }}>
                              <span className="title">Kỹ năng</span>
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
                              <span className="title">Kinh nghiệm</span>
                              {Parser(`${user?.user?.cv?.experience}`)}
                           </div>
                        </div>
                        <div className="objective">
                           <div className="cv-item">
                              <span className="title">Chứng chỉ</span>
                              {Parser(`${user?.user?.cv?.certificate}`)}
                           </div>
                        </div>
                     </div>
                  </Col>
               </Row>
            </FormProvider>

            {searchParams.get("status") === EJobStatus.NEW && (
               <GroupButton>
                  <Button
                     height={50}
                     key="back"
                     border="outline"
                     onClick={handleRejectJobCv}
                     loading={loadingReject}
                  >
                     {t("Reject")}
                  </Button>
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
               </GroupButton>
            )}

            <Modal
               visible={openModalViewFree}
               type="confirm"
               confirmIcon="?"
               title={
                  <span>
                     Bạn còn{" "}
                     <span
                        style={{ color: "#074ABD" }}
                     >{` ${accountData?.company?.amountOfFreeCvViews} lượt`}</span>{" "}
                     xem hồ sơ miễn phí ở tháng này. Bạn có muốn sủ dụng không ?
                  </span>
               }
               onCancel={handleCloseViewFree}
               destroyOnClose
            >
               <GroupButton>
                  <Button height={50} onClick={handleCharge}>
                     Đồng ý
                  </Button>
                  <Button border="outline" height={50} onClick={handleCloseViewFree}>
                     Hủy
                  </Button>
               </GroupButton>
            </Modal>

            <Modal
               visible={openModalCharge}
               type="confirm"
               confirmIcon="?"
               title={
                  fetchingBusiness ? (
                     <Skeleton active />
                  ) : (
                     <span>
                        Bạn có muốn sủ dụng{" "}
                        <span
                           style={{ color: "#074ABD" }}
                        >{` ${dataBusiness?.baseCvViewPrice} coins `}</span>{" "}
                        để xem thông tin hồ sơ này không ?
                     </span>
                  )
               }
               onCancel={handleCloseCharge}
               destroyOnClose
            >
               <GroupButton>
                  <Button height={50} onClick={handleCharge}>
                     Đồng ý
                  </Button>
                  <Button border="outline" height={50} onClick={handleCloseCharge}>
                     Hủy
                  </Button>
               </GroupButton>
            </Modal>

            <Modal
               visible={openModalPayConfirm}
               type="confirm"
               confirmIcon="!"
               title={
                  "Số dư tài khoản không đủ để thực hiện giao dịch! Bạn có muốn nạp tiền không?"
               }
               onCancel={() => {
                  handleCloseCharge();
                  handleClosePayConfirm();
               }}
               destroyOnClose
            >
               <GroupButton>
                  <Button height={50} onClick={handleOpenPay}>
                     Nạp tiền ngay
                  </Button>
                  <Button
                     border="outline"
                     height={50}
                     onClick={() => {
                        handleCloseCharge();
                        handleClosePayConfirm();
                     }}
                  >
                     Hủy bỏ
                  </Button>
               </GroupButton>
            </Modal>

            <Modal
               visible={openModalPay}
               onCancel={() => {
                  handleCloseCharge();
                  handleClosePayConfirm();
                  handleClosePay();
               }}
               width="1200px"
            >
               <Payment />
            </Modal>
         </Container>
      </Spin>
   );
};

export default CVDetail;
