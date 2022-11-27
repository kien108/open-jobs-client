import { Pagination } from "../../../../../../libs/components/Table/Pagination";
import { Table } from "../../../../../../libs/components";
import { Col, Divider, Row, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { Filter } from "../../components";
import { Job } from "../../components/Job";
import { JobDetail } from "../../components/JobDetail";
import { useFilterSearchJob } from "../../hooks";
import { useLazyGetJobsQuery } from "../../services";
import { Container, Content, Header } from "./styles";
import { useNavigate } from "react-router-dom";

const Jobs = () => {
   const tableInstance = Table.useTable();
   const navigate = useNavigate();
   const [searchJobs, { data: jobs, isLoading: loadingJobs, isFetching: fetchingJobs }] =
      useLazyGetJobsQuery();

   const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

   useEffect(() => {
      jobs && jobs?.listJob?.[0] && setSelectedId(jobs?.listJob?.[0]?.id);
   }, [jobs]);

   const handleSearchJobs = (params: any) => {
      searchJobs({ ...tableInstance.params, ...params });
   };

   useEffect(() => {
      searchJobs({ ...tableInstance.params, keyword: "", location: "" });
   }, []);

   useEffect(() => {
      tableInstance.setParams((prev: any) => {
         return {
            ...prev,
            size: 5,
         };
      });
   }, []);
   return (
      <Spin spinning={loadingJobs || fetchingJobs}>
         <Container>
            <Header>
               <Filter handleSearchJobs={handleSearchJobs} />
               <div className="title-container" onClick={() => navigate("/overview/profile")}>
                  <span className="title">Create your CV</span>
                  <span className="content">- It only takes a few seconds</span>
               </div>
            </Header>
            <Divider />
            {jobs?.listJob?.length > 0 ? (
               <Content>
                  <Row gutter={[24, 24]}>
                     <Col span={10}>
                        <Row gutter={[15, 15]}>
                           {jobs?.listJob?.map((item: any) => (
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
                           totalElements={jobs?.totalElements}
                           tableInstance={tableInstance}
                           total={jobs?.totalPages}
                        />
                     </Col>
                     <Col span={13}>
                        <JobDetail id={selectedId} isCompany={false} />
                     </Col>
                  </Row>
               </Content>
            ) : (
               <span className="no-results">No Results</span>
            )}
         </Container>
      </Spin>
   );
};

export default Jobs;
