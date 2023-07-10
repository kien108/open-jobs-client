import React from "react";
import { Container } from "./styles";
import { Col, Row } from "antd";
import logo from "../../../assets/img/keke.png";
import { AiOutlineInstagram, AiOutlinePhone, AiOutlineMail } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const FooterMain = () => {
   const navigate = useNavigate();

   return (
      <Container>
         <Row className="container">
            <Col span={8} push={2} className="top">
               <div className="flex col">
                  <div
                     className="img"
                     onClick={() => {
                        navigate("/overview/welcome");
                     }}
                  >
                     <img src={logo} alt="" />
                  </div>

                  <div className="flex icons">
                     <AiOutlineInstagram
                        cursor="pointer"
                        size={35}
                        onClick={() => {
                           window.open("https://www.instagram.com/kien.letrung.376258");
                        }}
                     />
                     <FaFacebook
                        size={28}
                        cursor="pointer"
                        onClick={() => {
                           window.open("https://www.facebook.com/kien.letrung.376258");
                        }}
                     />
                  </div>
               </div>
            </Col>
            <Col span={8} push={1} className="top">
               <div className="flex col">
                  <span className="title">Về OpenJobs</span>
                  <span onClick={() => navigate("/overview/welcome")}>Trang chủ</span>
                  <span onClick={() => navigate("/overview/welcome/jobs")}>Việc làm IT</span>
                  <span onClick={() => navigate("/overview/companies")}>Tìm kiếm công ty</span>
                  <span onClick={() => window.open("https://www.facebook.com/kien.letrung.376258")}>
                     Liên hệ
                  </span>
               </div>
            </Col>
            <Col span={8} className="top">
               <div className="flex col">
                  <span className="title">Liên hệ đăng tin tuyển dụng tại</span>
                  <div className="item">
                     <AiOutlinePhone size={25} />
                     <a href="tel:+0924 546 402">Hồ Chí Minh: (+84) 0924 546 402</a>
                  </div>
                  <div className="item">
                     <AiOutlinePhone size={25} />
                     <a href="tel:+0908 732 726">Hà Nội: (+84) 0908 732 726</a>
                  </div>
                  <div className="item">
                     <AiOutlineMail size={25} />
                     <a href="mailto:openjob@gmail.co">openjob@gmail.com</a>
                  </div>
               </div>
            </Col>
            <Col span={24} className="bottom">
               <div className="cpr">Coppyright &#169; OpenJobs | MST: 0312192252</div>
            </Col>
         </Row>
      </Container>
   );
};

export default FooterMain;
