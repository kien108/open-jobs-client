import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { useGetCompanyByIdQuery, useGetJobCompanyQuery } from "../../services";
import logoCompany from "../../assets/company.png";
import { Badge, Col, Row, Spin, Tabs } from "antd";
import { AiOutlineClockCircle, AiOutlinePhone, AiOutlineSetting } from "react-icons/ai";
import { BsCalendarDay, BsPeople } from "react-icons/bs";
import { GrLocation } from "react-icons/gr";
import { Button } from "../../../../../../libs/components";
import { Container } from "./styles";
import Parser from "html-react-parser";
import Jobs from "../Jobs/Jobs";
import { CompanyJobs } from "../../components/CompanyJobs";
import { useTranslation } from "react-i18next";

const CompanyDetail = () => {
   const { id } = useParams();
   const { t } = useTranslation();

   const {
      data: dataCompany,
      isLoading: loadingCompany,
      isFetching: fetchingCompany,
   } = useGetCompanyByIdQuery(id, { refetchOnMountOrArgChange: true, skip: !id });

   const { data: dataJobs } = useGetJobCompanyQuery(
      { id, page: 0, size: 999 },
      {
         refetchOnMountOrArgChange: true,
         skip: !id,
      }
   );

   console.log({ dataJobs });
   const items = [
      {
         label: "Thông tin công ty",
         key: "item-1",
         children: (
            <div>
               {dataCompany?.description
                  ? Parser(`${dataCompany?.description}`)
                  : "Chưa có thông tin"}
            </div>
         ),
      },
      {
         label: (
            <Badge count={dataJobs?.totalElements || 0} size="small">
               Tin tuyển dụng
            </Badge>
         ),
         key: "item-2",
         children: <CompanyJobs id={dataCompany?.id} />,
      },
   ];

   return (
      <Spin spinning={loadingCompany || fetchingCompany}>
         <Container>
            <div className="company-header">
               <div className="header">
                  <div className="logo">
                     <img src={dataCompany?.logoUrl || logoCompany} alt="" />
                  </div>
                  <div className="right">
                     <span className="name">{dataCompany?.name}</span>
                     <div className="content">
                        <Row gutter={[10, 10]}>
                           <Col span={6}>
                              <div className="item">
                                 <AiOutlineSetting size={17} />
                                 <span>{dataCompany?.companyType}</span>
                              </div>
                              <div className="item">
                                 <AiOutlinePhone size={17} />
                                 <span>{dataCompany?.phone}</span>
                              </div>
                           </Col>
                           <Col span={12}>
                              <div className="item">
                                 <BsPeople size={17} />
                                 <span>{dataCompany?.scope}</span>
                              </div>
                              <div className="item">
                                 <GrLocation size={17} />
                                 <span>{dataCompany?.address}</span>
                              </div>
                           </Col>
                        </Row>
                     </div>
                  </div>
               </div>
               <Tabs items={items} />
            </div>
         </Container>
      </Spin>
   );
};

export default CompanyDetail;
