import { Col, Divider, Row, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { Filter } from "../../components";
import { Job } from "../../components/Job";
import { JobDetail } from "../../components/JobDetail";
import { useFilterSearchJob } from "../../hooks";
import { useGetJobsQuery } from "../../services";
import { Container, Content, Header } from "./styles";

const Jobs = () => {
   const {
      data: jobs,
      isLoading: loadingJobs,
      isFetching: fetchingJobs,
   } = useGetJobsQuery({ page: 0, size: 10, ...useFilterSearchJob() });

   const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

   useEffect(() => {
      jobs && jobs?.listJob?.[0] && setSelectedId(jobs?.listJob?.[0]?.id);
   }, [jobs]);
   return (
      <Spin spinning={loadingJobs || fetchingJobs}>
         <Container>
            <Header>
               <Filter />
               <div className="title-container">
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
                                 <Job item={item} handleClick={(id) => setSelectedId(id)} />
                              </Col>
                           ))}
                        </Row>
                     </Col>
                     <Col span={13}>
                        <JobDetail id={selectedId} />
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
