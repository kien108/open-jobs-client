import React, { FC } from "react";
import { IResCompany } from "../../types";
import { Container } from "./styles";
import { Col, Row } from "antd";
import Parser from "html-react-parser";
import { useNavigate } from "react-router-dom";

interface IProps {
   data?: IResCompany;
}
const CompanySlide: FC<IProps> = ({ data }) => {
   const navigate = useNavigate();

   return (
      <Container className="left">
         <Row gutter={[25, 25]}>
            <Col span={12}>
               <div className="img">
                  <img src={data?.logoUrl} alt="logo" />
               </div>
            </Col>

            <Col span={12} className="content">
               <span className="title" onClick={() => navigate(`/overview/companies/${data?.id}`)}>
                  {data?.name}
               </span>

               <p className="des">{Parser(data?.description ?? "")}</p>

               <span className="address">{data?.address}</span>
            </Col>
         </Row>
      </Container>
   );
};

export default CompanySlide;
