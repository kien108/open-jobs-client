import React, { useEffect, useState } from "react";
import { Container } from "./styles";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input, Select } from "../../../../../../libs/components";

import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { Col, Divider, Row } from "antd";

import Company from "../../assets/company.png";

const FillCompany = () => {
   const { t } = useTranslation();
   const [provinces, setProvinces] = useState<any>([]);
   const [districts, setDistricts] = useState<any>([]);
   const form = useForm({
      mode: "all",
      defaultValues: {
         name: "",
         description: "",
         derived_uoms: [{}],
         status: 2,
         province: undefined,
         district: undefined,
      },
      resolver: yupResolver(
         yup.object().shape({
            name: yup
               .string()
               .trim()
               .required(t("common:form.required"))
               .max(250, t("common:form.max", { value: 250 })),
            description: yup
               .string()
               .trim()
               .max(1000, t("common:form.max", { value: 1000 })),
            province: yup.string().required(t("common:form.required")),
            district: yup.string().required(t("common:form.required")),
         })
      ),
   });

   useEffect(() => {
      const fakeData = [
         {
            name: "HCM",
            id: "1",
         },
         {
            name: "Quan 1",
            id: "2",
         },
         {
            name: "Quan 2",
            id: "3",
         },
      ];

      const options = fakeData.map((item) => ({
         key: item.id,
         label: item.name,
         value: item.id,
         render: () => <span>{item?.name}</span>,
      }));

      setProvinces(options);
      setDistricts(options);
   }, []);

   const onSubmit = (data: any) => {
      console.log(data);
   };
   return (
      <Container>
         <Row gutter={[20, 20]}>
            <Col span={14}>
               <div className="header">
                  <span>Complete profile company</span>
                  <span>You'll need to complement profile to begin post a job</span>
               </div>
               <FormProvider {...form}>
                  <Row gutter={[15, 15]}>
                     <Col span={24}>
                        <Input
                           required
                           name="company"
                           placeholder="Enter your company name"
                           label="Your company name"
                        />
                     </Col>
                     <Col span={12}>
                        <Input
                           type="number"
                           name="employees"
                           placeholder="Enter your company's number of employees"
                           label="Your company's number of employees"
                        />
                     </Col>
                     <Col span={12}>
                        <Input
                           required
                           type="number"
                           name="name"
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
                           options={provinces || []}
                           loading={false}
                        />
                     </Col>
                     <Col span={12}>
                        <Select
                           required
                           disabled={!form.watch("province")}
                           name="district"
                           title="District"
                           placeholder="Please choose province first!"
                           showSearch={true}
                           options={districts || []}
                           loading={false}
                        />
                     </Col>
                     <Col span={24}>
                        <Input
                           name="address"
                           placeholder="Enter your extra address"
                           label="Extra address"
                        />
                     </Col>
                     <Button
                        className="btn-save"
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
   );
};

export default FillCompany;
