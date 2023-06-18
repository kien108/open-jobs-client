import {
   Button,
   DateRangePicker,
   Input,
   SearchIcon,
   Select,
} from "../../../../../../libs/components";
import { Col, Row } from "antd";
import { debounce } from "lodash";
import React, { FC, useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { Container, StyledOption } from "./styles";

import { v4 as uuidv4 } from "uuid";
import { useGetProvincesQuery, useGetSpecializationsQuery } from "../../services";
import { useDebounce } from "../../../../../../libs/common";
import moment from "moment";
import { EJobLevels, EJobTypes, EWorkPlace } from "../../../../../../types";
import { convertEnumToArrayWithoutNumber, convertPrice } from "../../utils";
import { useTranslation } from "react-i18next";

import { BsFilter } from "react-icons/bs";

interface IProps {
   handleSearchJobs?: (params: any) => void;
   setParams?: any;
}

const formatDate = "DD/MM/YYYY";

const FilterJob: FC<IProps> = ({ handleSearchJobs, setParams }) => {
   const { t } = useTranslation();

   const [searchParams, setSearchParams] = useSearchParams();
   const [options, setOptions] = useState<any>([]);
   const [provinces, setProvinces] = useState<any>([]);
   const [searchLocation, setSearchLocation] = useState<any>("");
   const [expand, setExpand] = useState<boolean>(true);

   const searchProvinceDebounce = useDebounce(searchLocation, 300);

   const defaultValues = {
      keyword: searchParams.get("keyword"),
      company: searchParams.get("company"),
      majorId: searchParams.get("majorId"),
      specializationId: "",
      dates: searchParams.get("dates"),
      address: searchParams.get("address"),
      jobLevel: searchParams.get("jobLevel"),
      jobType: searchParams.get("jobType"),
      workplace: searchParams.get("workplace"),
      minSalary: searchParams.get("minSalary"),
      maxSalary: searchParams.get("maxSalary"),
      status: searchParams.get("status"),
   };

   const { data: dataProvinces } = useGetProvincesQuery(
      { keyword: searchProvinceDebounce },
      { refetchOnMountOrArgChange: true }
   );

   const form = useForm({ defaultValues });

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

   const [specializations, setSpecializations] = useState<any>([]);

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

   useEffect(() => {
      const options = dataSpecializations?.map((item: any) => ({
         key: +item.id,
         label: item.id,
         value: item.id,
         render: () => <span>{item?.name}</span>,
      }));

      setSpecializations(options || []);
   }, [dataSpecializations]);

   return (
      <FormProvider {...form}>
         <Container>
            <Row gutter={[10, 10]} className="header">
               <Col span={9}>
                  <Input
                     className="search"
                     height="46px"
                     subLabel={t("what")}
                     placeholder={t("whatPlaceHolder")}
                     icons={<SearchIcon width={20} />}
                     name="keyword"
                     onKeyDown={(event) => {
                        if (event.key === "Enter") {
                           handleSearchJobs &&
                              handleSearchJobs({
                                 keyword: form.watch("keyword") ?? "",
                                 location: form.watch("address") ?? "",
                              });
                        }
                     }}
                  />
               </Col>
               <Col span={9}>
                  <Select
                     name="address"
                     label={t("where")}
                     required
                     showSearch
                     options={provinces || []}
                     onSearch={(value) => setSearchLocation(value)}
                     loading={false}
                  />
               </Col>
               <Col span={4}>
                  <Button
                     className="btn-find"
                     height={46}
                     onClick={() => {
                        handleSearchJobs &&
                           handleSearchJobs({
                              keyword: form.watch("keyword") ?? "",
                              location: form.watch("address") ?? "",
                           });
                     }}
                  >
                     {t("findJobs")}
                  </Button>
               </Col>
               <Col span={2}>
                  <div
                     className="btn-filter"
                     onClick={(prev) => {
                        setExpand((prev) => !prev);
                     }}
                  >
                     <BsFilter size={26} />
                     Bộ lọc
                  </div>
               </Col>
            </Row>
            {expand && (
               <Row className="filter" gutter={[10, 10]}>
                  <Col span={4}>
                     <DateRangePicker
                        className="search"
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

                  <Col span={4}>
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
                  </Col>

                  <Col span={4}>
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
                  </Col>

                  <Col span={4}>
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
                  </Col>

                  <Col span={4}>
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
                  </Col>

                  <Col span={4}>
                     <Input
                        className="search"
                        height="46px"
                        subLabel={t("Lương tối thiểu")}
                        name="minSalary"
                        onChange={(e: any) => {
                           form.setValue("minSalary", convertPrice(e.target.value));
                           handleOnChange("minSalary", convertPrice(e.target.value));
                        }}
                     />
                  </Col>
                  <Col span={4}>
                     <Input
                        className="search"
                        height="46px"
                        subLabel="Lương tối đa"
                        name="maxSalary"
                        onChange={(e: any) => {
                           form.setValue("maxSalary", convertPrice(e.target.value));
                           handleOnChange("maxSalary", convertPrice(e.target.value));
                        }}
                     />
                  </Col>
               </Row>
            )}
         </Container>
      </FormProvider>
   );
};

export default FilterJob;
