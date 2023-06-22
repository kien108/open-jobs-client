import React, { FC } from "react";
import { Container } from "./styles";
import { IResSuggesJob } from "../../types";
import { Col, Row } from "antd";
import RelativeJobItem from "./RelativeJobItem";

interface IProps {
   data: IResSuggesJob[];
}
const RelativeJobs: FC<IProps> = ({ data }) => {
   return (
      <Container>
         <Row>
            <Col span={12}>
               <RelativeJobItem />
            </Col>
         </Row>
      </Container>
   );
};

export default RelativeJobs;
