import {
   Button,
   Checkbox,
   DateRangePicker,
   Input,
   SearchIcon,
   Select,
} from "../../../../../../libs/components";
import { Col, Row, Spin } from "antd";
import { debounce } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";

import { useDebounce } from "../../../../../../libs/common";
import {
   useGetCompaniesQuery,
   useGetMajorsQuery,
   useGetProvincesQuery,
   useGetSpecializationsQuery,
} from "../../services";
import moment from "moment";
import { Container, ContainerFilterJob } from "./styles";

const formatDate = "DD/MM/YYYY";

const FilterCompany = () => {
   const { t } = useTranslation();

   const [searchParams, setSearchParams] = useSearchParams();
   const [provinces, setProvinces] = useState<any>([]);

   const defaultValues = {
      keyword: searchParams.get("keyword"),
      dates: searchParams.get("dates"),
      jobStatus: searchParams.get("jobStatus"),
      address: searchParams.get("address"),
   };

   const form = useForm({ defaultValues });

   // const { data: dataProvinces } = useGetProvincesQuery({}, { refetchOnMountOrArgChange: true });

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

   const statuses = [
      {
         key: uuidv4(),
         label: "NEW",
         value: "NEW",
         render: () => "NEW",
      },
      {
         key: uuidv4(),
         label: "HIDDEN",
         value: "HIDDEN",
         render: () => "HIDDEN",
      },
   ];

   // useEffect(() => {
   //    const options = (dataProvinces ?? []).map((item: any) => ({
   //       key: item.id,
   //       label: item.name,
   //       value: item.name,
   //       render: () => <span>{item?.name}</span>,
   //    }));

   //    setProvinces(options);
   // }, [dataProvinces]);

   return (
      <ContainerFilterJob>
         <FormProvider {...form}>
            <Row gutter={[20, 20]} align="middle">
               <Col span={24}>
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
               <Col span={8}>
                  <DateRangePicker
                     format={formatDate}
                     name="dates"
                     label={"Ngày ứng tuyển"}
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

               {/* <Col span={8}>
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
               </Col> */}

               <Col span={8}>
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
      </ContainerFilterJob>
   );
};

export default FilterCompany;
