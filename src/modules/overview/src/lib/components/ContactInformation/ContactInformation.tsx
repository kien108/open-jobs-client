import React, { useEffect } from "react";
import { BtnFunction, Container } from "./styles";
import { BsArrowLeft } from "react-icons/bs";

import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import {
   Button,
   DatePicker,
   Input,
   openNotification,
   Select,
} from "../../../../../../libs/components";
import { Col, Row, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { useCommonSelector, RootState, useGetAdminByIdQuery } from "../../../../../../libs/common";
import { useGetProfileQuery, useUpdateProfileMutation } from "../../services";
import moment from "moment";

const ContactInformation = () => {
   const { t } = useTranslation();
   const navigate = useNavigate();

   const { id } = useCommonSelector((state: RootState) => state.user.user);

   const { data: user, isLoading, isFetching } = useGetProfileQuery(id, { skip: !id });

   const [upload, { isLoading: loadingUpload }] = useUpdateProfileMutation();

   const genders = [
      {
         key: 0,
         label: "Male",
         value: "Male",
         render: () => <span>Nam</span>,
      },
      {
         key: 0,
         label: "Female",
         value: "Female",
         render: () => <span>Nữ</span>,
      },
   ];
   const form = useForm({
      defaultValues: {
         firstName: "",
         lastName: "",
         email: "",
         phone: "",
         gender: "Male",
         dob: "",
      },
      resolver: yupResolver(
         yup.object({
            firstName: yup.string().trim().required(t("common:form.required")),
            lastName: yup.string().trim().required(t("common:form.required")),
            phone: yup.string().nullable(),
            gender: yup.string(),
            email: yup.string().email(t("common:form.email")).required(t("common:form.required")),
         })
      ),
   });

   useEffect(() => {
      form.setValue("firstName", user?.firstName);
      form.setValue("lastName", user?.lastName);
      form.setValue("email", user?.email);
      form.setValue("phone", user?.phone);
      form.setValue("gender", user?.gender || "Male");
      user?.dob && form.setValue("dob", moment(user?.dob) as any);
   }, [user]);

   const onSubmit = (data: any) => {
      console.log({ data });
      upload({ authProvider: "DATABASE", ...user, ...data })
         .unwrap()
         .then(() => {
            openNotification({
               type: "success",
               message: t("Update this profile successfully!!!"),
            });
            navigate(-1);
         })
         .catch((error) => {
            openNotification({
               type: "error",
               message: t("common:ERRORS.SERVER_ERROR"),
            });
         });
   };

   return (
      <Spin spinning={isLoading || isFetching}>
         <Container>
            <BtnFunction onClick={() => navigate(-1)}>
               <BsArrowLeft size={23} />
            </BtnFunction>
            <span className="title">Thông tin cá nhân</span>

            <FormProvider {...form}>
               <Input name="firstName" label="Tên" required />
               <Input name="lastName" label="Họ tên" required />
               <Input name="phone" label="Số điện thoại" placeholder="Nhập số điện thoại" />
               <Input name="email" label={t("email")} disabled />
               <Row gutter={[15, 15]}>
                  <Col span={12}>
                     <Select name="gender" options={genders} title={t("Giới tính")} />
                  </Col>
                  <Col span={12} className="dob">
                     <DatePicker format={"DD/MM/YYYY"} name="dob" label={t("Ngày sinh")} />
                  </Col>
               </Row>
               <Button
                  loading={loadingUpload}
                  className="btn-save"
                  onClick={(e) => {
                     e.preventDefault();
                     e.stopPropagation();
                     form.handleSubmit(onSubmit)();
                  }}
               >
                  Lưu
               </Button>
            </FormProvider>
         </Container>
      </Spin>
   );
};

export default ContactInformation;
