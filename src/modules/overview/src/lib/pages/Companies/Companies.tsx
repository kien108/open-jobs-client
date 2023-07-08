import { Col, Divider, Image, Row, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FilterCompany } from "../../components/FilterCompany";
import { useFilterSearchJob } from "../../hooks";
import { useLazyGetCompaniesQuery } from "../../services";
import { Container } from "./styles";
import logoCompany from "../../assets/company.png";
import { AiOutlineClockCircle, AiOutlinePhone, AiOutlineSetting } from "react-icons/ai";
import { BsCalendarDay, BsPeople } from "react-icons/bs";
import { GrLocation } from "react-icons/gr";
import { useTranslation } from "react-i18next";
import { Table } from "../../../../../../libs/components";

const Companies = () => {
   const { t } = useTranslation();
   const [searchParams] = useSearchParams();
   const tableInstance = Table.useTable();

   const [companies, setCompanies] = useState([]);
   const navigate = useNavigate();
   const [
      getCompany,
      { isLoading: loadingCompany, isFetching: fetchingCompany, data: dataCompanies },
   ] = useLazyGetCompaniesQuery();

   useEffect(() => {
      getCompany({ ...tableInstance.params })
         .unwrap()
         .then((dataCompanies) => {
            setCompanies(dataCompanies?.companies || []);
         });
   }, []);

   const handleSearchCompany = (params: any) => {
      getCompany({ ...tableInstance.params, ...params })
         .unwrap()
         .then((dataCompanies) => {
            setCompanies(dataCompanies?.companies || []);
         });
   };

   console.log(dataCompanies);
   return (
      <Spin spinning={loadingCompany || fetchingCompany}>
         <Container>
            <div className="header">
               <span className="title">Tìm kiếm nơi làm việc tuyệt vời</span>

               <FilterCompany handleSearchCompany={handleSearchCompany} />
            </div>

            <div className="companies-content">
               {dataCompanies?.companies?.length === 0 ? (
                  <span className="notFound">Không có kết quả</span>
               ) : (
                  <div className="companies">
                     {companies?.map((item: any) => (
                        <>
                           <div className="company" onClick={() => navigate(`${item?.id}`)}>
                              <div className="logo">
                                 <img src={item?.logoUrl || logoCompany} alt="" />
                              </div>
                              <div className="right">
                                 <span className="name">{item?.name}</span>
                                 <div className="content">
                                    <Row gutter={[10, 10]}>
                                       <Col span={6}>
                                          <div className="item">
                                             <AiOutlineSetting size={17} />
                                             <span>{item?.companyType || "--/--"}</span>
                                          </div>
                                       </Col>
                                       <Col span={6}>
                                          <div className="item">
                                             <AiOutlinePhone size={17} />
                                             <span>{item?.phone || "--/--"}</span>
                                          </div>
                                       </Col>
                                       <Col span={6}>
                                          <div className="item">
                                             <BsPeople size={17} />
                                             <span>{item?.scope || "--/--"}</span>
                                          </div>
                                       </Col>
                                       <Col span={24}>
                                          <div className="item">
                                             <GrLocation size={17} />
                                             <span>
                                                {item?.address?.replace(",", "")
                                                   ? item?.address
                                                   : "--/--"}
                                             </span>
                                          </div>
                                       </Col>
                                    </Row>
                                 </div>
                              </div>
                           </div>
                        </>
                     ))}
                  </div>
               )}
            </div>
         </Container>
      </Spin>
   );
};

export default Companies;
