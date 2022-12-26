import React, { useEffect, useRef, useState } from "react";
import { Container, ImgWrapper } from "./styles";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, EditIcon, Input, openNotification, Select } from "../../../../libs/components";

import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { Col, Divider, Row, Spin, Upload } from "antd";
import ImgCrop from "antd-img-crop";

import Company from "../../assets/company.png";
import { RootState, useCommonSelector, useDebounce } from "../../../../libs/common";
import {
   useGetListDistrictsQuery,
   useGetProfileQuery,
   useGetProvincesQuery,
   useUpdateProfileMutation,
} from "../../services";
import { EmailVariables } from "../../components/EmailVariables";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";

const FillCompany = () => {
   const { t } = useTranslation();
   const { id } = useCommonSelector((state: RootState) => state.user.user);
   const [districts, setDistricts] = useState<any>([]);
   const [provinces, setProvinces] = useState<any>([]);
   const [searchProvince, setSearchProvince] = useState<any>("");
   const [searchDistrict, setSearchDistrict] = useState<any>("");

   const searchProvinceDebounce = useDebounce(searchProvince, 300);

   const searchDistrictDebounce = useDebounce(searchDistrict, 300);

   const contentRef = useRef(undefined);
   const [fileList, setFileList] = useState<UploadFile[]>([]);

   const {
      data: user,
      isLoading: loadingProfile,
      isFetching: fetchingProfile,
   } = useGetProfileQuery(id, { skip: !id, refetchOnMountOrArgChange: true });

   const [upload, { isLoading: loadingUpload }] = useUpdateProfileMutation();

   const form = useForm({
      mode: "all",
      defaultValues: {
         name: "",
         totalEmployee: 0,
         phone: "",
         firstName: "",
         lastName: "",
         province: undefined,
         district: undefined,
         extraValue: "",
         extraAddress: "",
      },
      resolver: yupResolver(
         yup.object({
            name: yup.string().required(t("common:form.required")),
            totalEmployee: yup.number().nullable(),
            phone: yup.string().required(t("common:form.required")),
            firstName: yup.string().required(t("common:form.required")),
            lastName: yup.string().required(t("common:form.required")),
            province: yup.string().required(t("common:form.required")),
            district: yup.string().required(t("common:form.required")),
            extraAddress: yup.string(),
         })
      ),
   });

   const {
      data: dataProvinces,
      isLoading: loadingProvince,
      isFetching: fetchingProvinces,
   } = useGetProvincesQuery(
      { keyword: searchProvinceDebounce },
      { refetchOnMountOrArgChange: true }
   );

   const {
      data: dataDistricts,
      isLoading: loadingDistricts,
      isFetching: fetchingDistricts,
   } = useGetListDistrictsQuery(
      { keyword: searchDistrictDebounce, province: form.watch("province") },
      { refetchOnMountOrArgChange: true }
   );

   const onSubmit = (data: any) => {
      upload({
         authProvider: "DATABASE",
         ...user,
         company: {
            ...user.company,
            ...data,
            address: `${data?.extraAddress},${data?.district},${data?.province}`,
            logoUrl: fileList[0].url || fileList[0].thumbUrl,
         },
         firstName: data?.firstName,
         lastName: data?.lastName,
      })
         .unwrap()
         .then(() => {
            openNotification({
               type: "success",
               message: t("Update company profile successfully!!!"),
            });
         })
         .catch((error) => {
            openNotification({
               type: "error",
               message: t("common:ERRORS.SERVER_ERROR"),
            });
         });
   };

   useEffect(() => {
      if (!dataProvinces) return;

      const options = dataProvinces.map((item: any) => ({
         key: item.id,
         label: item.name,
         value: item.name,
         render: () => <span>{item?.name}</span>,
      }));

      setProvinces(options);
   }, [dataProvinces]);

   useEffect(() => {
      const options = (dataDistricts ?? []).map((item: any) => ({
         key: item.id,
         label: item.name,
         value: item.name,
         render: () => <span>{item?.name}</span>,
      }));

      setDistricts(options);
   }, [dataDistricts]);

   useEffect(() => {
      if (!user?.company) return;
      const { company } = user;
      const [extraAddress, district, province] = company?.address?.split(",") || Array(3).fill("");

      form.setValue("name", company?.name);
      form.setValue("totalEmployee", company?.totalEmployee);
      form.setValue("phone", company?.phone);
      form.setValue("firstName", user?.firstName);
      form.setValue("lastName", user?.lastName);
      district && form.setValue("district", district);
      province && form.setValue("province", province);
      extraAddress && form.setValue("extraAddress", extraAddress);

      setFileList([
         {
            uid: "-1",
            name: "image.png",
            status: "done",
            url: company?.logoUrl,
         },
      ]);
   }, [user]);

   const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
      setFileList(newFileList);
   };

   useEffect(() => {
      console.log(fileList);
   }, [fileList]);

   return (
      <Spin spinning={loadingProfile}>
         <Container>
            <Row gutter={[20, 20]}>
               <Col span={14}>
                  {/* <div className="header">
                     <span>Complete profile company</span>
                     <span>You'll need to complement profile to begin post a job</span>
                  </div> */}
                  <ImgWrapper className="wrapper">
                     <ImgWrapper className="wrapper-img">
                        <Upload
                           beforeUpload={() => false}
                           listType="picture-card"
                           fileList={fileList}
                           maxCount={1}
                           style={{
                              position: fileList.length < 1 ? "relative" : "absolute",
                           }}
                           onChange={onChange}
                        >
                           <EditIcon />
                        </Upload>
                     </ImgWrapper>
                  </ImgWrapper>
                  <FormProvider {...form}>
                     <Row gutter={[15, 15]}>
                        <Col span={24}>
                           <Input
                              required
                              name="name"
                              placeholder="Enter your company name"
                              label="Your company name"
                           />
                        </Col>
                        <Col span={12}>
                           <Input
                              type="number"
                              name="totalEmployee"
                              placeholder="Enter your company's number of employees"
                              label="Your company's number of employees"
                           />
                        </Col>
                        <Col span={12}>
                           <Input
                              required
                              name="phone"
                              placeholder="Enter your phone number"
                              label="Your phone number"
                           />
                        </Col>
                        <Col span={12}>
                           <Input
                              required
                              name="firstName"
                              placeholder="Enter your first name"
                              label="First Name"
                           />
                        </Col>
                        <Col span={12}>
                           <Input
                              required
                              name="lastName"
                              placeholder="Enter your last name"
                              label="Last Name"
                           />
                        </Col>
                        <Divider orientation="left">Address</Divider>
                        <Col span={12}>
                           <Select
                              name="province"
                              title="Province"
                              placeholder="Select province"
                              required
                              showSearch
                              onSearch={(value) => setSearchProvince(value)}
                              onSelect={(value: any) => {
                                 form.setValue("province", value);
                                 form.setValue("district", undefined);
                              }}
                              options={provinces || []}
                              loading={loadingProvince || fetchingProvinces}
                           />
                        </Col>
                        <Col span={12}>
                           <Spin spinning={loadingDistricts || fetchingDistricts}>
                              <Select
                                 required
                                 disabled={!form.watch("province")}
                                 name="district"
                                 title="District"
                                 placeholder="Please choose province first!"
                                 showSearch={true}
                                 onSearch={(value) => setSearchDistrict(value)}
                                 options={districts || []}
                                 loading={loadingDistricts || fetchingDistricts}
                              />
                           </Spin>
                        </Col>
                        <Col span={24}>
                           <Input
                              name="extraAddress"
                              placeholder="Enter your extra address"
                              label="Extra address"
                           />
                        </Col>
                        <Col span={24}>
                           <EmailVariables
                              data={user?.company?.description}
                              editorRef={contentRef}
                              name="description"
                              label="Description"
                           />
                        </Col>

                        <Button
                           className="btn-save"
                           loading={loadingUpload}
                           onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              form.handleSubmit(onSubmit)();
                           }}
                        >
                           Save and continue
                        </Button>
                     </Row>
                  </FormProvider>
               </Col>
               <Col span={10}>
                  <div className="right">
                     <img src={Company} alt="" />
                  </div>
               </Col>
            </Row>
         </Container>
      </Spin>
   );
};

export default FillCompany;
