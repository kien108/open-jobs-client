import { Col, Divider, Row, Spin } from "antd";
import React, { FC, useEffect, useState } from "react";
import { Filter } from "../../components";
import { Job } from "../../components/Job";
import { JobDetail } from "../../components/JobDetail";
import { useFilterSearchJob } from "../../hooks";
import { useGetJobCompanyQuery } from "../../services";
import { Container, Content, Header } from "./styles";

import { Pagination } from "../../../../../../libs/components/Table/Pagination";
import { Table } from "../../../../../../libs/components";

interface IProps {
   id: string;
}
const CompanyJobs: FC<IProps> = ({ id }) => {
   const tableInstance = Table.useTable();
   const {
      data: jobs,
      isLoading: loadingJobs,
      isFetching: fetchingJobs,
   } = useGetJobCompanyQuery(
      { id, ...tableInstance.params },
      { skip: !id, refetchOnMountOrArgChange: true }
   );

   const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

   useEffect(() => {
      jobs && jobs?.[0] && setSelectedId(jobs?.[0]?.id);
   }, [jobs]);
   return (
      <Spin spinning={loadingJobs || fetchingJobs}>
         <Container>
            <Divider />
            {jobs?.length > 0 ? (
               <Content>
                  <Row gutter={[24, 24]}>
                     <Col span={10}>
                        <Row gutter={[15, 15]}>
                           {jobs?.map((item: any) => (
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
                        <JobDetail id={selectedId} isCompany={true} />
                     </Col>
                  </Row>
               </Content>
            ) : (
               <span className="no-results">This company don't have any jobs</span>
            )}
         </Container>
      </Spin>
   );
};

export default CompanyJobs;
