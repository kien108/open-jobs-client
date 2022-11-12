import { Button, Input, SearchIcon, Select } from "../../../../../../libs/components";
import { Col, Row } from "antd";
import { debounce } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { Container, StyledOption } from "./styles";

import { v4 as uuidv4 } from "uuid";
import { useGetProvincesQuery } from "../../services";
import { useDebounce } from "../../../../../../libs/common";

const Filter = () => {
   const { t } = useTranslation();

   const [searchParams, setSearchParams] = useSearchParams();
   const [options, setOptions] = useState<any>([]);
   const [provinces, setProvinces] = useState<any>([]);
   const [searchLocation, setSearchLocation] = useState<any>("");

   const searchProvinceDebounce = useDebounce(searchLocation, 300);

   const defaultValues = useMemo(
      () => ({
         keyword: searchParams.get("keyword"),
         location: searchParams.get("location"),
      }),
      [searchParams]
   );

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

   useEffect(() => {
      console.log(dataProvinces);

      if (!dataProvinces) return;

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

      const options = dataProvinces.map((item: any) => ({
         key: item.id,
         label: item.name,
         value: item.name,
         render: () => <span>{item?.name}</span>,
      }));

      setProvinces(options);
   }, [dataProvinces]);
   return (
      <FormProvider {...form}>
         <Container>
            <Row gutter={[15, 15]}>
               <Col span={10}>
                  <Input
                     className="search"
                     height="46px"
                     subLabel={t("What")}
                     placeholder="job title, keywords or company"
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
                     name="location"
                     label="Where"
                     required
                     showSearch
                     options={provinces || []}
                     onSearch={(value) => setSearchLocation(value)}
                     onChange={(value) => handleOnChange("location", value)}
                     loading={false}
                  />
               </Col>
               <Col span={2}>
                  <Button className="btn-find" height={46}>
                     Find jobs
                  </Button>
               </Col>
            </Row>
         </Container>
      </FormProvider>
   );
};

export default Filter;
