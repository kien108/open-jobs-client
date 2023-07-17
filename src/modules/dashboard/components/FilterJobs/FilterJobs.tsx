import {
   Button,
   Checkbox,
   DateRangePicker,
   Input,
   SearchIcon,
   Select,
} from "../../../../libs/components";
import { Col, Row, Spin } from "antd";
import { debounce } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";

import { useDebounce } from "../../../../libs/common";
import {
   useGetMajorsQuery,
   useGetProvincesQuery,
   useGetAllSkillsQuery,
   useGetSpecializationsQuery,
} from "../../services";
import moment from "moment";
import { EJobLevels, EJobStatus, EJobTypes, EWorkPlace } from "../../../../types";
import { Container } from "./styles";
import { convertEnumToArrayWithoutNumber, convertPrice } from "../../utils";

const formatDate = "DD/MM/YYYY";

enum EJobState {
   NEW = "Mới",
   REJECTED = "Từ chối",
   APPROVED = "Đồng ý",
   HIDDEN = "Ẩn",
}

const FilterCompany = () => {
   const { t } = useTranslation();

   const [searchParams, setSearchParams] = useSearchParams();
   const [options, setOptions] = useState<any>([]);
   const [provinces, setProvinces] = useState<any>([]);
   const [majors, setMajors] = useState<any>([]);
   const [skills, setSkills] = useState<any>([]);
   const [searchLocation, setSearchLocation] = useState<any>("");

   const [checked, setChecked] = useState<boolean>(false);

   const searchProvinceDebounce = useDebounce(searchLocation, 300);

   const defaultValues = {
      keyword: searchParams.get("keyword"),
      company: searchParams.get("company"),
      majorId: searchParams.get("majorId"),
      skillId: "",
      dates: searchParams.get("dates"),
      address: searchParams.get("address"),
      jobLevel: searchParams.get("jobLevel"),
      jobType: searchParams.get("jobType"),
      workplace: searchParams.get("workplace"),
      minSalary: searchParams.get("minSalary"),
      maxSalary: searchParams.get("maxSalary"),
      jobStatus: searchParams.get("jobStatus"),
   };

   const form = useForm({ defaultValues });

   const {
      data: dataSkills,
      isLoading: loadingSkills,
      isFetching: fetchingSkills,
   } = useGetAllSkillsQuery(
      {},
      {
         refetchOnMountOrArgChange: true,
      }
   );

   const {
      data: dataProvinces,
      isLoading: loadingProvince,
      isFetching: fetchingProvinces,
   } = useGetProvincesQuery(
      { keyword: searchProvinceDebounce },
      { refetchOnMountOrArgChange: true }
   );

   const setValueToSearchParams = (name: string, value: string) => {
      if (value) {
         searchParams.set(name, value);
         setSearchParams(searchParams);
      } else {
         searchParams.delete(name);
         setSearchParams(searchParams);
      }
   };

   const handleOnChange = debounce(setValueToSearchParams, 500);

   useEffect(() => {
      const options = (dataSkills ?? [])?.map((item: any) => ({
         key: +item.id,
         label: item.id,
         value: item.id,
         render: () => <span>{item?.name}</span>,
      }));

      setSkills(options || []);
   }, [dataSkills]);

   useEffect(() => {
      const options = (dataProvinces ?? []).map((item: any) => ({
         key: item.id,
         label: item.name,
         value: item.name,
         render: () => <span>{item?.name}</span>,
      }));

      setProvinces(options);
   }, [dataProvinces]);

   const handleChangeDate = (key: string, value: any) => {
      let dateFormat;
      if (value) {
         dateFormat = value?.map((item: any) => moment(item._d).format(formatDate));
         searchParams.set(key, encodeURI(dateFormat.join(" - ")));
         setSearchParams(searchParams);
      }

      if (!value || value.length === 0) {
         searchParams.delete(key);
         setSearchParams(searchParams);
      }
   };

   const jobLevels = useMemo(() => {
      return convertEnumToArrayWithoutNumber(EJobLevels)?.map((item) => ({
         key: item.id,
         label: item.value,
         value: item.key,
         render: () => item.value,
      }));
   }, []);

   const jobTypes = useMemo(() => {
      return convertEnumToArrayWithoutNumber(EJobTypes)?.map((item) => ({
         key: item.id,
         label: item.value,
         value: item.key,
         render: () => item.value,
      }));
   }, []);

   const workPlaces = useMemo(() => {
      return convertEnumToArrayWithoutNumber(EWorkPlace)?.map((item) => ({
         key: item.id,
         label: item.value,
         value: item.key,
         render: () => item.value,
      }));
   }, []);

   const statuses = useMemo(() => {
      return convertEnumToArrayWithoutNumber(EJobStatus)?.map((item) => ({
         key: item.id,
         label: item.value,
         value: item.key,
         render: () => EJobState[item.value],
      }));
   }, []);

   useEffect(() => {
      form.reset({
         ...defaultValues,
         skillId: form.getValues("skillId"),
      });

      setChecked(searchParams.get("isVerified") === "true");
   }, [searchParams.toString()]);

   return (
      <Container>
         <FormProvider {...form}>
            <Row gutter={[20, 20]} align="middle">
               <Col span={6}>
                  <Input
                     className="search"
                     title={t("companyName")}
                     placeholder="Tiêu đề"
                     icons={<SearchIcon width={20} />}
                     name="keyword"
                     onChange={(e: any) => {
                        form.setValue("keyword", e.target.value);
                        handleOnChange("keyword", e.target.value);
                     }}
                  />
               </Col>
               <Col span={6}>
                  <DateRangePicker
                     format={formatDate}
                     name="dates"
                     label={"Ngày đăng"}
                     value={
                        form.getValues("dates")
                           ? [
                                moment(form.getValues("dates")?.split("%20-%20")[0], formatDate),
                                moment(form.getValues("dates")?.split("%20-%20")[1], formatDate),
                             ]
                           : undefined
                     }
                     onChange={(value) => {
                        const dateFormat = value
                           ? value.map((item: any) => moment(item._d).format(formatDate))
                           : null;
                        form.setValue(
                           "dates",
                           dateFormat ? encodeURI(`${dateFormat[0]} - ${dateFormat[1]}`) : null
                        );
                        handleChangeDate("dates", value);
                     }}
                  />
               </Col>

               <Col span={6}>
                  <Spin spinning={false}>
                     <Select
                        name="address"
                        label="Địa chỉ"
                        required
                        options={provinces || []}
                        onChange={(value) => {
                           setValueToSearchParams("address", value);
                           form.setValue("address", value);
                        }}
                     />
                  </Spin>
               </Col>
               <Col span={6}>
                  <Spin spinning={false}>
                     <Select
                        name="jobLevel"
                        label="Vị trí"
                        required
                        options={jobLevels}
                        onChange={(value) => {
                           setValueToSearchParams("jobLevel", value);
                           form.setValue("jobLevel", value);
                        }}
                     />
                  </Spin>
               </Col>

               <Col span={6}>
                  <Spin spinning={false}>
                     <Select
                        name="jobType"
                        label="Loaị công việc"
                        required
                        options={jobTypes}
                        onChange={(value) => {
                           setValueToSearchParams("jobType", value);
                           form.setValue("jobType", value);
                        }}
                     />
                  </Spin>
               </Col>

               <Col span={6}>
                  <Spin spinning={false}>
                     <Select
                        name="workplace"
                        label="Nơi làm việc"
                        required
                        options={workPlaces}
                        onChange={(value) => {
                           setValueToSearchParams("workplace", value);
                           form.setValue("workplace", value);
                        }}
                     />
                  </Spin>
               </Col>

               {/* <Col span={6}>
               <Spin spinning={loadingMajors || fetchingMajors}>
                  <Select
                     name="majorId"
                     label="Major"
                     required
                     options={majors || []}
                     loading={loadingMajors || fetchingMajors}
                     onChange={(value) => {
                        setValueToSearchParams("majorId", value);
                        form.setValue("majorId", value);
                     }}
                  />
               </Spin>
            </Col> */}
               <Col span={6}>
                  <Select
                     required
                     name="skillId"
                     label="Kỹ năng"
                     options={skills || []}
                     loading={fetchingSkills}
                     onChange={(value) => {
                        form.setValue("skillId", value);
                        setValueToSearchParams("skillId", value);
                     }}
                  />
               </Col>

               <Col span={6}>
                  <Input
                     className="minSalary"
                     placeholder="Lương tối thiểu"
                     name="minSalary"
                     onChange={(e: any) => {
                        form.setValue("minSalary", convertPrice(e.target.value));
                        handleOnChange("minSalary", convertPrice(e.target.value));
                     }}
                     allowClear
                  />
               </Col>
               <Col span={6}>
                  <Input
                     className="maxSalary"
                     placeholder="Lương tối đa"
                     name="maxSalary"
                     onChange={(e: any) => {
                        form.setValue("maxSalary", convertPrice(e.target.value));
                        handleOnChange("maxSalary", convertPrice(e.target.value));
                     }}
                     allowClear
                  />
               </Col>
               <Col span={6}>
                  <Select
                     required
                     name="jobStatus"
                     label="Trạng thái"
                     options={statuses || []}
                     onChange={(value) => {
                        form.setValue("jobStatus", value);
                        setValueToSearchParams("jobStatus", value);
                     }}
                  />
               </Col>
            </Row>
         </FormProvider>
      </Container>
   );
};

export default FilterCompany;
