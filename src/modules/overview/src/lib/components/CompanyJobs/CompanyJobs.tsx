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
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

interface IProps {
   id: string;
}
const CompanyJobs: FC<IProps> = ({ id }) => {
   const tableInstance = Table.useTable();
   const { t } = useTranslation();
   const [searchParams, setSearParams] = useSearchParams();

   const {
      data: jobs,
      isLoading: loadingJobs,
      isFetching: fetchingJobs,
      refetch,
   } = useGetJobCompanyQuery(
      { id, ...tableInstance.params, jobStatus: "APPROVED" },
      { skip: !id, refetchOnMountOrArgChange: true }
   );

   const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

   useEffect(() => {
      jobs && jobs?.listJob[0] && setSelectedId(jobs?.listJob[0]?.id);
   }, [jobs]);

   useEffect(() => {
      console.log({ he: searchParams.get("applied") });
      if (searchParams.get("applied") === "true") {
         refetch();
         searchParams.delete("applied");
         setSearParams(searchParams);
      }
   }, [searchParams.get("applied")]);
   return (
      <Spin spinning={loadingJobs || fetchingJobs}>
         <Container>
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
                        <div className="job-detail">
                           <JobDetail id={selectedId} isCompany={true} />
                        </div>
                     </Col>
                  </Row>
               </Content>
            ) : (
               <span className="no-results">{"Không có tin tuyển dụng nào"}</span>
            )}
         </Container>
      </Spin>
   );
};

export default CompanyJobs;
