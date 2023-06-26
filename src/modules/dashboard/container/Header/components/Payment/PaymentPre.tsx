import React, { useState } from "react";
import { Container } from "./styles";
import background from "../../../../assets/vpbackground.jpg";
import logo from "../../../../assets/vp.png";
import { v4 as uuidv4 } from "uuid";
import { BsFillCheckSquareFill } from "react-icons/bs";
import { Button, Checkbox, openNotification } from "../../../../../../libs/components";
import { useExecutePayMutation, useLazyGetPayQuery } from "../../../../services";
import { RootState, useCommonSelector } from "../../../../../../libs/common";
import { useLocation, useNavigate } from "react-router-dom";

const Payment = () => {
   const navigate = useNavigate();
   const [checked, setChecked] = useState<boolean>(false);
   const { user } = useCommonSelector((state: RootState) => state.user);

   const queryParams = new URLSearchParams(location.search);
   const [executePay, { isLoading: loadingExecute }] = useExecutePayMutation();

   const handleExecute = () => {
      const payload = {
         companyId: user?.companyId,
         payerId: queryParams.get("PayerID"),
         paymentId: queryParams.get("paymentId"),
      };
      executePay(payload)
         .unwrap()
         .then((res) => {
            openNotification({
               type: "success",
               message: "Thanh toán thành công!",
            });
            navigate("/dashboard");
         })
         .catch((err) => {
            const ERROR_MSG = "không thành công";
            if (!err?.data?.includes(ERROR_MSG)) {
               navigate("/dashboard");
               return;
            }

            openNotification({
               type: "error",
               message: "Thanh toán thất bại!",
            });
         });
   };
   return (
      <Container className="payment-container">
         <div className="payment-header" style={{ backgroundImage: `url(${background})` }}>
            <h2>Trang thanh toán</h2>
         </div>

         <div className="user">
            <div className="title">
               <span className="number">1.</span>
               <span className="title">Thông tin đơn hàng</span>
            </div>
            <div className="value">
               <div className="item">
                  <span className="id">Mã thanh toán:</span>
                  <span className="id-value">{queryParams.get("paymentId")}</span>
               </div>
               <div className="item">
                  <span className="id">Mã khách hàng:</span>
                  <span className="id-value">{queryParams.get("PayerID")}</span>
               </div>
            </div>
         </div>

         <div className="select">
            <div className="title">
               <span className="number">2.</span>
               <span className="title">Xác nhận thanh toán</span>
            </div>

            <Checkbox
               style={{ marginTop: "20px" }}
               value={checked}
               onChange={(e) => setChecked(e.target.checked)}
            >
               Tôi đồng ý thanh toán đơn hàng trên
            </Checkbox>

            <Button
               className="btn-pay"
               style={{ marginTop: "30px" }}
               disabled={!checked}
               onClick={handleExecute}
               loading={loadingExecute}
            >
               Thanh toán ngay
            </Button>
         </div>
      </Container>
   );
};

export default Payment;
