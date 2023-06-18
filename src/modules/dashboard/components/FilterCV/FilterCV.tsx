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
   useGetAllSkillsQuery,
   useGetMajorsQuery,
   useGetProvincesQuery,
   useGetSpecializationsQuery,
} from "../../services";
import moment from "moment";
import { EJobLevels, EJobStatus, EJobTypes, EWorkPlace } from "../../../../types";
import { Container } from "./styles";
import { convertEnumToArrayWithoutNumber, convertPrice } from "../../utils";

const formatDate = "DD/MM/YYYY";

const FilterCompany = () => {
   const { t } = useTranslation();

   const [searchParams, setSearchParams] = useSearchParams();
   const [options, setOptions] = useState<any>([]);
   const [provinces, setProvinces] = useState<any>([]);
   const [majors, setMajors] = useState<any>([]);
   const [specializations, setSpecializations] = useState<any>([]);
   const [searchLocation, setSearchLocation] = useState<any>("");

   const [checked, setChecked] = useState<boolean>(false);

   const searchProvinceDebounce = useDebounce(searchLocation, 300);

   const defaultValues = {
      keyword: searchParams.get("keyword"),
      majorId: "",
      specializationId: "",
      skillIds: [],
   };

   const form = useForm({ defaultValues });

   const {
      data: dataMajors,
      isLoading: loadingMajors,
      isFetching: fetchingMajors,
   } = useGetMajorsQuery({});

   const {
      data: dataSpecializations,
      isLoading: loadingSpecializations,
      isFetching: fetchingSpecializations,
   } = useGetSpecializationsQuery(
      {},
      {
         refetchOnMountOrArgChange: true,
      }
   );

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
      const options = dataMajors?.map((item: any) => ({
         key: +item.id,
         label: item.name,
         value: item.id,
         render: () => <span>{item?.name}</span>,
      }));

      setMajors(options || []);
   }, [dataMajors]);

   useEffect(() => {
      const options = dataSpecializations?.map((item: any) => ({
         key: +item.id,
         label: item.id,
         value: item.id,
         render: () => <span>{item?.name}</span>,
      }));

      setSpecializations(options || []);
   }, [dataSpecializations]);

   useEffect(() => {
      form.reset({
         ...defaultValues,
         specializationId: form.getValues("specializationId"),
         skillIds: form.getValues("skillIds"),
         majorId: form.getValues("majorId"),
      });

      setChecked(searchParams.get("isVerified") === "true");
   }, [searchParams.toString()]);

   return (
      <Container>
         <FormProvider {...form}>
            <Row gutter={[20, 20]} align="middle">
               <Col span={14}>
                  <Input
                     className="search"
                     title={t("companyName")}
                     placeholder="Tên công ty, tiêu đề"
                     icons={<SearchIcon width={20} />}
                     name="keyword"
                     onChange={(e: any) => {
                        form.setValue("keyword", e.target.value);
                        handleOnChange("keyword", e.target.value);
                     }}
                  />
               </Col>
               {/* <Col span={12}>
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
               </Col>
               <Col span={12}>
                  <Select
                     required
                     name="specializationId"
                     label="Chuyên ngành hẹp"
                     options={specializations || []}
                     loading={loadingSpecializations || fetchingSpecializations}
                     onChange={(value) => {
                        form.setValue("specializationId", value);
                        setValueToSearchParams("specializationId", value);
                     }}
                  />
               </Col> */}

               <Col span={10}>
                  <Select
                     className="select-skill"
                     required
                     mode="multiple"
                     name="skillIds"
                     label="Kỹ năng"
                     options={(dataSkills ?? [])?.map((item: any) => ({
                        key: +item.id,
                        label: item.id,
                        value: item.id,
                        render: () => <span>{item?.name}</span>,
                     }))}
                     onChange={(value) => {
                        setValueToSearchParams("skillIds", value);
                        console.log({ value });
                        form.setValue("skillIds", value);
                     }}
                     loading={loadingSkills || fetchingSkills}
                  />
               </Col>
            </Row>
         </FormProvider>
      </Container>
   );
};

export default FilterCompany;
