import { Col, Divider, Image, Row, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FilterCompany } from "../../components/FilterCompany";
import { useFilterSearchJob } from "../../hooks";
import { useGetCompaniesQuery } from "../../services";
import { Container } from "./styles";
import logoCompany from "../../assets/company.png";
import { AiOutlineClockCircle, AiOutlinePhone, AiOutlineSetting } from "react-icons/ai";
import { BsCalendarDay, BsPeople } from "react-icons/bs";
import { GrLocation } from "react-icons/gr";

const Companies = () => {
   const [searchParams] = useSearchParams();
   const [companies, setCompanies] = useState([]);
   const navigate = useNavigate();
   const {
      data: dataCompanies,
      isLoading: loadingCompanies,
      isFetching: fetchingCompanies,
   } = useGetCompaniesQuery(
      { ...useFilterSearchJob(), page: 0, size: 99 },
      { refetchOnMountOrArgChange: true }
   );

   useEffect(() => {
      setCompanies(dataCompanies?.companies || []);
   }, [dataCompanies]);
   return (
      <Spin spinning={loadingCompanies || fetchingCompanies}>
         <Container>
            <div className="header">
               <span className="title">Find great places to work</span>
               <span className="sub-title">Get access to millions of company reviews</span>
               <FilterCompany />
            </div>

            <div className="companies-content">
               {searchParams.get("keyword") && (
                  <span className="search-result">
                     {`Popular companies for ${searchParams.get("keyword")}`}
                  </span>
               )}

               {dataCompanies?.companies?.length === 0 ? (
                  <span className="notFound">No Results</span>
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
                                             <span>Product</span>
                                          </div>
                                          <div className="item">
                                             <BsCalendarDay size={17} />
                                             <span>Thứ 2 - Thứ 6</span>
                                          </div>
                                          <div className="item">
                                             <AiOutlineClockCircle size={17} />
                                             <span>Không OT</span>
                                          </div>
                                       </Col>
                                       <Col span={6}>
                                          <div className="item">
                                             <AiOutlinePhone size={17} />
                                             <span>{item?.phone}</span>
                                          </div>
                                          <div className="item">
                                             <BsPeople size={17} />
                                             <span>{item?.totalEmployee}</span>
                                          </div>
                                       </Col>
                                       <Col span={8}>
                                          <div className="item">
                                             <GrLocation size={17} />
                                             <span>{item?.address}</span>
                                          </div>
                                       </Col>
                                    </Row>
                                 </div>
                              </div>
                           </div>
                           <Divider style={{ background: "rgba(0,0,0, 0.1)" }} />
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
