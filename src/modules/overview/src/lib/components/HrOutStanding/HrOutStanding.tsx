import React from "react";
import { Container } from "./styles";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import { v4 as uuidv4 } from "uuid";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { useGetCompaniesQuery } from "../../services";
import { Skeleton } from "antd";

const HrOutStanding = () => {
   const { data: dataCompanies, isFetching: fetchingCompanies } = useGetCompaniesQuery(
      {
         page: 0,
         size: 10,
      },
      { refetchOnMountOrArgChange: true }
   );

   return (
      <Container>
         <div className="wrapper">
            <span className="title">Nhà tuyển dụng nổi bật</span>

            <Swiper
               modules={[Pagination, Autoplay]}
               spaceBetween={20}
               slidesPerView={7}
               navigation
               autoplay
            >
               {fetchingCompanies ? (
                  <Skeleton active />
               ) : (
                  (dataCompanies?.companies ?? [])?.map((item) => (
                     <SwiperSlide key={uuidv4()} onClick={() => console.log({ item })}>
                        <div className="container">
                           <div className="img">
                              <img src={item?.logoUrl} alt="logo" />
                           </div>

                           <div className="name">{item?.name}</div>
                        </div>
                     </SwiperSlide>
                  ))
               )}
            </Swiper>
         </div>
      </Container>
   );
};

export default HrOutStanding;
