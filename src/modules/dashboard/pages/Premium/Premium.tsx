import React, { useEffect, useState } from "react";
import { Btns, Container } from "./styles";
import { AiFillCheckCircle } from "react-icons/ai";
import { useGetBusinessQuery, useUpdatePremiumMutation } from "../../services";
import { useCommonSelector, RootState, useModal } from "../../../../libs/common";
import { EMemberTypes } from "../../../../types";
import { Button, Modal, openNotification } from "../../../../libs/components";

const Premium = () => {
   const { data: dataBusiness, isFetching: fetchingBusiness } = useGetBusinessQuery();
   const [idx, setIdx] = useState<number>(0);
   const { user } = useCommonSelector((state: RootState) => state.user);

   const [upgrade, { isLoading: loadingUpgrade }] = useUpdatePremiumMutation();

   const { isOpen, handleOpen, handleClose } = useModal();
   const handleUpgrade = () => {
      const payload = {
         companyId: user?.companyId,
      };

      upgrade(payload)
         .unwrap()
         .then((res) => {
            openNotification({
               type: "success",
               message: "Nâng cấp gói hội viên thành công",
            });
            handleClose();
         })
         .catch(() => {
            openNotification({
               type: "success",
               message: "Nâng cấp gói hội viên thất bại",
            });
         });
   };

   useEffect(() => {
      const idx = user?.company?.memberType === EMemberTypes.DEFAULT ? 0 : 1;

      setIdx(idx);
   }, [user]);

   return (
      <Container className="container">
         <div className={`card ${idx === 0 ? "active" : ""}`} onClick={() => setIdx(0)}>
            <div
               className={`badge ${
                  user?.company?.memberType === EMemberTypes.DEFAULT ? "" : "hidden"
               }`}
            >
               Đang sử dụng
            </div>
            <h2>Openjobs Free</h2>
            <span className="premium">
               <span className="price">0 coins</span>
               <span> / tháng</span>
            </span>

            <div className="features">
               <div className="feature">
                  <AiFillCheckCircle size={20} color="#074ABD" />
                  <span>{`${dataBusiness?.freeCvView} lượt xem hồ sơ miễn phí mỗi tháng`}</span>
               </div>
               <div className="feature">
                  <AiFillCheckCircle size={20} color="#074ABD" />
                  <span>{`${dataBusiness?.freeJob} lượt đăng tin miễn phí mỗi tháng`}</span>
               </div>
            </div>
         </div>

         <div className={`card ${idx === 1 ? "active" : ""}`} onClick={() => setIdx(1)}>
            <div
               className={`badge ${
                  user?.company?.memberType === EMemberTypes.PREMIUM ? "" : "hidden"
               }`}
            >
               Đang sử dụng
            </div>
            <h2>Openjobs Premium</h2>
            <span className="premium">
               <span className="price">{dataBusiness?.premiumPrice} coins</span>
               <span> / tháng</span>
            </span>

            <div className="features">
               <div className="feature">
                  <AiFillCheckCircle size={20} color="#074ABD" />
                  <span>{`${dataBusiness?.freeCvView} lượt xem hồ sơ miễn phí mỗi tháng`}</span>
               </div>
               <div className="feature">
                  <AiFillCheckCircle size={20} color="#074ABD" />
                  <span>{`${dataBusiness?.premiumFreeJob} lượt đăng tin miễn phí mỗi tháng`}</span>
               </div>
               <div className="feature">
                  <AiFillCheckCircle size={20} color="#074ABD" />
                  <span>{`Được sử dụng bộ lọc kỹ năng`}</span>
               </div>
               <div className="feature">
                  <AiFillCheckCircle size={20} color="#074ABD" />
                  <span>Được ưu tiên hỗ trợ khi gặp sự cố</span>
               </div>
            </div>
            {user?.company?.memberType === EMemberTypes.DEFAULT && (
               <Button className="upgrade-button" onClick={handleOpen}>
                  Nâng cấp ngay
               </Button>
            )}
         </div>

         <Modal
            visible={isOpen}
            title="Bạn có chắc chắn muốn nâng cấp gói hội viên không?"
            destroyOnClose
            onCancel={handleClose}
            type="confirm"
            confirmIcon="?"
         >
            <Btns>
               <Button onClick={handleUpgrade} loading={loadingUpgrade}>
                  Đồng ý
               </Button>

               <Button border="outline" onClick={handleClose}>
                  Từ chối
               </Button>
            </Btns>
         </Modal>
      </Container>
   );
};

export default Premium;
