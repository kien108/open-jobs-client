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

import { useCommonSelector, RootState } from "../../../../libs/common";
import {
   useGetAllSkillsQuery,
   useGetMajorsQuery,
   useGetProvincesQuery,
   useGetSpecializationsQuery,
} from "../../services";
import moment from "moment";
import { EJobLevels, EJobStatus, EJobTypes, EMemberTypes, EWorkPlace } from "../../../../types";
import { Container } from "./styles";
import { convertEnumToArrayWithoutNumber, convertPrice } from "../../utils";

const formatDate = "DD/MM/YYYY";

const FilterSearchCV = () => {
   const { t } = useTranslation();
   const { user } = useCommonSelector((state: RootState) => state.user);

   const skillCount = user?.company?.memberType === EMemberTypes.DEFAULT ? 1 : 5;
   const [searchParams, setSearchParams] = useSearchParams();

   const [searchLocation, setSearchLocation] = useState<any>("");

   const [checked, setChecked] = useState<boolean>(false);

   const defaultValues = {
      keyword: searchParams.get("keyword"),
      majorId: "",
      specializationId: "",
      skillIds: [],
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
      form.reset({
         ...defaultValues,
         specializationId: form.getValues("specializationId"),
         skillIds: form.getValues("skillIds"),
         majorId: form.getValues("majorId"),
      });

      setChecked(searchParams.get("isVerified") === "true");
   }, [searchParams.toString()]);

   console.log(form.watch("skillIds"));
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

               <Col span={10}>
                  <Select
                     className="select-skill"
                     required
                     mode="multiple"
                     name="skillIds"
                     label="Kỹ năng"
                     maxTagCount={2}
                     options={(dataSkills ?? [])?.map((item: any) => ({
                        key: +item.id,
                        label: item.id,
                        value: item.id,
                        render: () => <span>{item?.name}</span>,
                     }))}
                     onChange={(value) => {
                        if (value?.length > skillCount) {
                           setValueToSearchParams(
                              "skillIds",
                              value.slice(0, value.length - 1) as any
                           );
                           form.setValue("skillIds", value.slice(0, value.length - 1) as any);
                           return;
                        }
                        setValueToSearchParams("skillIds", value);
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

export default FilterSearchCV;
