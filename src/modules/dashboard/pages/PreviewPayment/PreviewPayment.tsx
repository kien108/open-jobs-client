import React from "react";
import { Modal } from "../../../../libs/components";
import { useNavigate } from "react-router-dom";
import { Payment, PaymentPre } from "../../container/Header/components";

const PreviewPayment = () => {
   const navigate = useNavigate();
   return (
      <Modal visible={true} onCancel={() => navigate("/dashboard")} width="1200px">
         <PaymentPre />
      </Modal>
   );
};

export default PreviewPayment;
