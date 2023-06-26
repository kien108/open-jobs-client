import React, { useState } from "react";
import { Container } from "./styles";
import background from "../../../../assets/vpbackground.jpg";
import logo from "../../../../assets/vp.png";
import { v4 as uuidv4 } from "uuid";
import { BsFillCheckSquareFill } from "react-icons/bs";
import { Button, openNotification } from "../../../../../../libs/components";
import { useLazyGetPayQuery } from "../../../../services";
import { RootState, useCommonSelector } from "../../../../../../libs/common";

const payments = [
   {
      vp: "10",
      price: "1$",
      cost: 1,
   },
   {
      vp: "20",
      price: "2$",
      cost: 2,
   },
   {
      vp: "50",
      price: "5$",
      cost: 5,
   },
   {
      vp: "100",
      price: "10$",
      cost: 10,
   },
   {
      vp: "200",
      price: "20$",
      cost: 20,
   },
   {
      vp: "500",
      price: "50$",
      cost: 50,
   },
];
const Payment = () => {
   const [selectedIdx, setSelectedIdx] = useState<number>();
   const { user } = useCommonSelector((state: RootState) => state.user);

   const handleGetPay = () => {
      if (!selectedIdx) return;

      window.open(`http://localhost/api/web/paypal?price=${payments[selectedIdx - 1]?.cost}`);
   };
   return (
      <Container className="payment-container">
         <div className="payment-header" style={{ backgroundImage: `url(${background})` }}>
            <h2>Trang thanh toán</h2>
         </div>

         <div className="user">
            <div className="title">
               <span className="number">1.</span>
               <span className="title">Thông tin công ty</span>
            </div>
            <div className="value">
               <div className="item">
                  <span className="id">Tên tài khoản:</span>
                  <span className="id-value">{user?.company?.name}</span>
               </div>
            </div>
         </div>

         <div className="select">
            <div className="title">
               <span className="number">2.</span>
               <span className="title">Chọn gói</span>
            </div>
            <div className="items">
               {payments?.map((item, idx) => (
                  <div
                     className={`item ${selectedIdx === idx + 1 ? "active" : ""}`}
                     key={uuidv4()}
                     onClick={() => setSelectedIdx(idx + 1)}
                  >
                     <div className="left">
                        <img src={logo} alt="" />
                        <span className="point">{item?.vp}</span>
                     </div>

                     <div className="right">{item?.price}</div>

                     <BsFillCheckSquareFill size={30} className="checked" />
                  </div>
               ))}
            </div>

            <Button className="btn-pay" disabled={!selectedIdx} onClick={handleGetPay}>
               Tiếp tục
            </Button>
         </div>
      </Container>
   );
};

export default Payment;
