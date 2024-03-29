import { Button, Input, SearchIcon, Select } from "../../../../../../libs/components";
import { Col, Row } from "antd";
import { debounce } from "lodash";
import React, { FC, useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { Container, StyledOption } from "./styles";

import { v4 as uuidv4 } from "uuid";
import { useGetProvincesQuery } from "../../services";
import { useDebounce } from "../../../../../../libs/common";

interface IProps {
   handleSearchCompany: (params: any) => void;
}
const FilterCompany: FC<IProps> = ({ handleSearchCompany }) => {
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

   const {
      data: dataProvinces,
      isLoading: loadingProvinces,
      isFetching: fetchingProvinces,
   } = useGetProvincesQuery(
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
      if (!dataProvinces) return;

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
            <Row gutter={[15, 15]} align="middle">
               <Col span={14}>
                  <Input
                     className="search"
                     height="46px"
                     label={"Tên công ty"}
                     placeholder="Tên công ty"
                     icons={<SearchIcon width={20} />}
                     name="keyword"
                     onKeyDown={(event) => {
                        if (event.key === "Enter") {
                           handleSearchCompany({
                              keyword: form.watch("keyword") ?? "",
                              location: form.watch("location") ?? "",
                           });
                        }
                     }}
                  />
               </Col>
               <Col span={6}>
                  <Select
                     name="location"
                     title={"Địa chỉ"}
                     placeholder="Địa chỉ"
                     required
                     showSearch
                     options={provinces || []}
                     onSearch={(value) => setSearchLocation(value)}
                     onChange={(value) => handleOnChange("location", value)}
                     loading={loadingProvinces || fetchingProvinces}
                  />
               </Col>
               <Col span={2} style={{ alignSelf: "flex-end" }}>
                  <Button
                     className="btn-find"
                     height={46}
                     onClick={() =>
                        handleSearchCompany({
                           keyword: form.watch("keyword") ?? "",
                           location: form.watch("location") ?? "",
                        })
                     }
                  >
                     Tìm kiếm công ty
                  </Button>
               </Col>
            </Row>
         </Container>
      </FormProvider>
   );
};

export default FilterCompany;
