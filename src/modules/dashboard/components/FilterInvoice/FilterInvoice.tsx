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
import { Container } from "./styles";
import { convertEnumToArrayWithoutNumber, convertPrice } from "../../utils";
import { EServiceType, EServiceTypeTranslate } from "../../pages/Invoice/Invoice";

const formatDate = "DD/MM/YYYY";

const FilterInvoice = () => {
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
      dates: searchParams.get("dates"),
      serviceType: searchParams.get("serviceType"),
   };

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
         label: EServiceType.COIN_IN,
         value: EServiceType.COIN_IN,
         render: () => EServiceTypeTranslate.COIN_IN,
      },
      {
         key: uuidv4(),
         label: EServiceType.JOB_POST,
         value: EServiceType.JOB_POST,
         render: () => EServiceTypeTranslate.JOB_POST,
      },

      {
         key: uuidv4(),
         label: EServiceType.REFUND,
         value: EServiceType.REFUND,
         render: () => EServiceTypeTranslate.REFUND,
      },

      {
         key: uuidv4(),
         label: EServiceType.UPDATE_JOB,
         value: EServiceType.UPDATE_JOB,
         render: () => EServiceTypeTranslate.UPDATE_JOB,
      },

      {
         key: uuidv4(),
         label: EServiceType.UPGRADE_MEMBERSHIP,
         value: EServiceType.UPGRADE_MEMBERSHIP,
         render: () => EServiceTypeTranslate.UPGRADE_MEMBERSHIP,
      },

      {
         key: uuidv4(),
         label: EServiceType.VIEW_CV,
         value: EServiceType.VIEW_CV,
         render: () => EServiceTypeTranslate.VIEW_CV,
      },
   ];

   useEffect(() => {
      form.reset(defaultValues);
   }, [searchParams.toString()]);

   return (
      <Container>
         <FormProvider {...form}>
            <Row gutter={[20, 20]} align="middle">
               <Col span={12}>
                  <DateRangePicker
                     format={formatDate}
                     name="dates"
                     label={"Ngày giao dịch"}
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

               <Col span={8}>
                  <Select
                     required
                     name="serviceType"
                     label="Loại dịch vụ"
                     options={statuses || []}
                     onChange={(value) => {
                        form.setValue("serviceType", value);
                        setValueToSearchParams("serviceType", value);
                     }}
                  />
               </Col>
            </Row>
         </FormProvider>
      </Container>
   );
};

export default FilterInvoice;
