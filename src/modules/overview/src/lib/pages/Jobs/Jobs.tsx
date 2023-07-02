import { Pagination } from "../../../../../../libs/components/Table/Pagination";
import { Table } from "../../../../../../libs/components";
import { Col, Divider, Row, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { Filter } from "../../components";
import { Job } from "../../components/Job";
import { JobDetail } from "../../components/JobDetail";
import { useFilterSearchJob } from "../../hooks";
import { useGetJobsQuery, useLazyGetJobsQuery } from "../../services";
import { Container, Content, Header } from "./styles";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getToken } from "./../../../../../../libs/common/utils/remember";

const Jobs = () => {
   const tableInstance = Table.useTable();
   const { t } = useTranslation();
   const navigate = useNavigate();
   const {
      data: jobs,
      isLoading: loadingJobs,
      isFetching: fetchingJobs,
   } = useGetJobsQuery({
      ...tableInstance.params,
      ...useFilterSearchJob(),
   });
   const [searchParams] = useSearchParams();

   const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

   useEffect(() => {
      searchParams.get("job-id")
         ? setSelectedId(searchParams.get("job-id")!)
         : setSelectedId(jobs?.listJob?.[0]?.id);
   }, [jobs]);

   // const handleSearchJobs = (params: any) => {
   //    searchJobs({ ...tableInstance.params, ...params });
   // };

   // useEffect(() => {
   //    searchJobs({ ...tableInstance.params, keyword: "", location: "" });
   // }, []);

   function paramsToObject(entries: any) {
      const result: any = {};
      for (const [key, value] of entries) {
         result[key] = value;
      }
      return result;
   }

   // useEffect(() => {
   //    const entries = searchParams.entries();
   //    const params = paramsToObject(entries);
   //    searchJobs({ ...tableInstance.params, ...params });
   // }, [searchParams.get("page")]);

   console.log({ data: jobs });
   return (
      <Spin spinning={loadingJobs || fetchingJobs}>
         <Container>
            <Header>
               {/* <Filter handleSearchJobs={handleSearchJobs} /> */}
               <div className="title-container">
                  <span
                     className="title"
                     onClick={() => {
                        if (getToken()) {
                           navigate("/overview/profile");
                        } else {
                           navigate("/auth");
                        }
                     }}
                  >
                     {t("Tạo hồ sơ")}
                  </span>
                  <span className="content">- {t("Điều đó chỉ tốn một ít thời gian")}</span>
               </div>
            </Header>
            <Divider />
            {jobs?.listJob && jobs?.listJob?.length > 0 ? (
               <Content>
                  <Row gutter={[24, 24]}>
                     <Col span={10} className="left">
                        <Row gutter={[15, 15]} className="jobs">
                           {(jobs?.listJob ?? [])?.map((item) => (
                              <Col span={24} key={item?.id}>
                                 <Job
                                    item={item}
                                    handleClick={(id) => setSelectedId(id)}
                                    className={`${selectedId === item?.id ? "active" : ""}`}
                                 />
                              </Col>
                           ))}
                        </Row>
                        <Pagination
                           className="pagi"
                           totalElements={jobs?.totalElements}
                           tableInstance={tableInstance}
                           total={jobs?.totalPages}
                        />
                     </Col>
                     <Col span={13} className="">
                        <div className="job-detail">
                           <JobDetail id={selectedId} isCompany={false} />
                        </div>
                     </Col>
                  </Row>
               </Content>
            ) : (
               <span className="no-results">{t("noResults")}</span>
            )}
         </Container>
      </Spin>
   );
};

export default Jobs;
