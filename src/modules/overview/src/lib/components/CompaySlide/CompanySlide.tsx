import React, { FC } from "react";
import { IResCompany } from "../../types";
import { Container } from "./styles";
import { Col, Row } from "antd";
import Parser from "html-react-parser";

interface IProps {
   data?: IResCompany;
}
const CompanySlide: FC<IProps> = ({ data }) => {
   return (
      <Container className="left">
         <Row gutter={[25, 25]}>
            <Col span={12}>
               <div className="img">
                  <img src={data?.logoUrl} alt="logo" />
               </div>
            </Col>

            <Col span={12} className="content">
               <span className="title">{data?.name}</span>

               <p className="des">{Parser(data?.description ?? "")}</p>

               <span className="address">{data?.address}</span>
            </Col>
         </Row>
      </Container>
   );
};

export default CompanySlide;
