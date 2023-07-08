import React from "react";
import { Container } from "./styles";
import { Swiper, SwiperSlide } from "swiper/react";

import { v4 as uuidv4 } from "uuid";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { Navigation, Pagination, Autoplay } from "swiper";
import { useGetCompaniesQuery, useGetJobsQuery, useGetSuggestionJobsQuery } from "../../services";
import { Col, Row, Skeleton, Spin } from "antd";
import { CompanySlide, JobSlide } from "../../components";
import { getToken } from "../../../../../../libs/common";
import { useNavigate } from "react-router-dom";

const Slider = () => {
   const isLogin = getToken();
   const navigate = useNavigate();

   const { data: dataCompanies, isFetching: fetchingCompanies } = useGetCompaniesQuery(
      {
         page: 0,
         size: 3,
      },
      { refetchOnMountOrArgChange: true }
   );

   const { data: dataJobs, isFetching: fetchingJobs } = useGetSuggestionJobsQuery(
      {
         page: 0,
         size: 20,
      },
      { refetchOnMountOrArgChange: true }
   );

   const { data: dataJobsHot, isFetching: fetchingJobsHot } = useGetJobsQuery({
      page: 0,
      size: 12,
   });
   function splitArray(array) {
      var result = [];
      for (var i = 0; i < array?.length; i += 3) {
         result.push(array?.slice(i, i + 3));
      }
      return result;
   }

   return (
      <Container>
         <Row justify="space-between">
            <Col span={13}>
               <span className="title">
                  <span className="main">Công ty</span>
                  <span className="sub">Nổi bật</span>
               </span>
               <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  spaceBetween={50}
                  slidesPerView={1}
                  navigation
                  autoplay={{
                     delay: 5000,
                  }}
                  loop
               >
                  {fetchingCompanies ? (
                     <Skeleton active />
                  ) : (
                     (dataCompanies?.companies ?? [])?.map((item) => (
                        <SwiperSlide key={uuidv4()} onClick={() => console.log({ item })}>
                           <CompanySlide data={item} />
                        </SwiperSlide>
                     ))
                  )}
               </Swiper>
            </Col>

            {isLogin ? (
               <Col span={10}>
                  <span className="title">
                     <span className="main">Công việc</span>
                     <span className="sub">Phù hợp</span>
                  </span>

                  <Swiper
                     modules={[Navigation, Pagination, Autoplay]}
                     spaceBetween={50}
                     slidesPerView={1}
                     pagination={{ clickable: true }}
                     loop
                  >
                     {fetchingJobs ? (
                        <Skeleton active />
                     ) : (
                        splitArray(dataJobs?.listJob)?.map((item) => (
                           <SwiperSlide key={item?.id} onClick={() => console.log({ item })}>
                              <JobSlide jobs={item} />
                           </SwiperSlide>
                        ))
                     )}
                  </Swiper>
               </Col>
            ) : (
               <Col span={10}>
                  <span className="title">
                     <span className="main">Công việc</span>
                     <span className="sub">Hot</span>
                  </span>

                  <Swiper
                     modules={[Navigation, Pagination, Autoplay]}
                     spaceBetween={50}
                     slidesPerView={1}
                     pagination={{ clickable: true }}
                     loop
                     autoplay
                  >
                     {fetchingJobs ? (
                        <Skeleton active />
                     ) : (
                        splitArray(dataJobsHot?.listJob)?.map((item) => (
                           <SwiperSlide key={item?.id} onClick={() => console.log({ item })}>
                              <JobSlide jobs={item} />
                           </SwiperSlide>
                        ))
                     )}
                  </Swiper>
               </Col>
            )}
         </Row>
      </Container>
   );
};

export default Slider;
