import { DateRangePicker, Title } from "../../../../libs/components";
import React from "react";
import { Content } from "./styles";
import Chart from "react-apexcharts";
import { useGetAnalyticCVsQuery } from "../../services";
import { RootState, useCommonSelector } from "../../../../libs/common";
import moment from "moment";
import { Col, Row, Spin } from "antd";
import { useSearchParams } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";

const formatDate = "DD/MM/YYYY";

const Analytics = () => {
   const [searchParams, setSearchParams] = useSearchParams();

   const defaultValues = {
      dates: searchParams.get("dates"),
   };

   const form = useForm({ defaultValues });

   const { companyId } = useCommonSelector((state: RootState) => state.user.user);
   const { data: dataCVs, isFetching } = useGetAnalyticCVsQuery(
      {
         companyId,
         startDate: searchParams.get("dates")
            ? moment(searchParams.get("dates")?.split("%20-%20")[0], "DD/MM/YYYY")
            : undefined,
         endDate: searchParams.get("dates")
            ? moment(searchParams.get("dates")?.split("%20-%20")[1], "DD/MM/YYYY")
            : undefined,
      },
      { skip: !companyId, refetchOnMountOrArgChange: true }
   );

   const series = [
      {
         name: "Hồ sơ ứng tuyển",
         data: (dataCVs ?? [])?.map((item) => item?.appliedCv),
      },
      {
         name: "Đồng ý",
         data: (dataCVs ?? [])?.map((item) => item?.acceptedCv),
      },
      {
         name: "Từ chối",
         data: (dataCVs ?? [])?.map((item) => item?.rejectedCv),
      },
   ];
   const options = {
      chart: {
         type: "bar",
         height: 350,
      },
      plotOptions: {
         bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded",
         },
      },
      dataLabels: {
         enabled: false,
      },
      stroke: {
         show: true,
         width: 2,
         colors: ["transparent"],
      },
      xaxis: {
         categories: (dataCVs ?? [])?.map(
            (item) =>
               `${item?.jobTitle} (${
                  item?.jobCreateAt ? moment(item?.jobCreateAt).format("DD/MM/YYYY") : "--"
               })`
         ),
      },
      yaxis: {
         title: {
            text: "Số lượng hồ sơ",
         },
      },
      fill: {
         opacity: 1,
      },
      tooltip: {
         y: {
            formatter: function (val) {
               return `${val} hồ sơ`;
            },
         },
      },
   };

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

   return (
      <Spin spinning={isFetching}>
         <div className="">
            <Title>Thống kê hồ sơ ứng tuyển</Title>

            <Content>
               <FormProvider {...form}>
                  <Row className="filter" gutter={[10, 10]}>
                     <Col span={12}>
                        <DateRangePicker
                           format={formatDate}
                           name="dates"
                           label={"Ngày đăng"}
                           value={
                              form.getValues("dates")
                                 ? [
                                      moment(
                                         form.getValues("dates")?.split("%20-%20")[0],
                                         formatDate
                                      ),
                                      moment(
                                         form.getValues("dates")?.split("%20-%20")[1],
                                         formatDate
                                      ),
                                   ]
                                 : undefined
                           }
                           onChange={(value) => {
                              const dateFormat = value
                                 ? value.map((item: any) => moment(item._d).format(formatDate))
                                 : null;
                              form.setValue(
                                 "dates",
                                 dateFormat
                                    ? encodeURI(`${dateFormat[0]} - ${dateFormat[1]}`)
                                    : null
                              );
                              handleChangeDate("dates", value);
                           }}
                        />
                     </Col>
                  </Row>
               </FormProvider>

               <Chart options={options} series={series} type="bar" height={"90%"} width={"100%"} />
            </Content>
         </div>
      </Spin>
   );
};

export default Analytics;
