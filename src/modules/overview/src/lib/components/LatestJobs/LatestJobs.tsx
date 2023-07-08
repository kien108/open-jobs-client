import React, { FC } from "react";
import { Container } from "./styles";
import { useGetJobsQuery } from "../../services";
import { Col, Row, Skeleton } from "antd";

import { RelativeJobItem } from "../RelativeJobs";

const LatestJobs = () => {
   const { data: dataJobs, isFetching: fetchingJobs } = useGetJobsQuery(
      {
         page: 0,
         size: 10,
      },
      { refetchOnMountOrArgChange: true }
   );

   return (
      <Container>
         <span className="title">Công Việc Mới Nhất</span>

         {fetchingJobs ? (
            <Skeleton active />
         ) : (
            <Row gutter={[30, 30]}>
               {(dataJobs?.listJob ?? [])?.map((item) => (
                  <Col span={8} key={item?.id}>
                     <RelativeJobItem data={item} />
                  </Col>
               ))}
            </Row>
         )}
      </Container>
   );
};

export default LatestJobs;
