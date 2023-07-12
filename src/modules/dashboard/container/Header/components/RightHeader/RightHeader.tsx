import React, { useState } from "react";
import { Tooltip, Typography } from "antd";
import { Notification } from "../Notification";
import { NavLink } from "react-router-dom";
import { AccountType, LanguageType } from "../../types";
import { useTranslation } from "react-i18next";
import { StyledRightHeader } from "./styles";
import "../Popover/style.scss";
import premium from "../../../../../../assets/img/crown.png";

import { Popover } from "../Popover";
import {
   useCommonDispatch,
   changeLang,
   useCommonSelector,
   RootState,
   useModal,
} from "../../../../../../libs/common";
import { LanguageIcon, NotificationIcon } from "../../../../../../libs/components/Icons";
import { Image } from "../../../../../../libs/components/Avatar";
import { Button, Modal } from "../../../../../../libs/components";
import { Payment } from "../../components";

import logo from "../../../../assets/vp.png";
const { Text } = Typography;

import { AiFillEye } from "react-icons/ai";
import { MdFiberNew } from "react-icons/md";

interface Props {
   languages: LanguageType[];
   accounts: AccountType[];
}

const RightHeader = ({ languages, accounts }: Props) => {
   const { t, i18n } = useTranslation();
   const dispatch = useCommonDispatch();
   const { user } = useCommonSelector((state: RootState) => state.user);

   const [visiblePopover, setVisiblePopover] = useState(false);

   const handleVisibleChange = (newVisible: boolean) => {
      setVisiblePopover(newVisible);
   };

   const { isOpen, handleOpen, handleClose } = useModal();

   console.log({ user });
   return (
      <StyledRightHeader>
         <div className="dropdown">
            <div className="point">
               {user?.company?.memberType === "PREMIUM" && (
                  <Tooltip title="Hội viên cấp cao">
                     <img src={premium} alt="" className="premium" />
                  </Tooltip>
               )}
               <Tooltip title="Tiền tệ quy đổi trong hệ thống. Được sử dụng để chi trả cho các dịch vụ">
                  <div className="item point" onClick={handleOpen}>
                     <img src={logo} alt="" />
                     <span>{parseInt(user?.company?.accountBalance) || "0"}</span>
                  </div>
               </Tooltip>

               <Tooltip title="Lượt xem hồ sơ miễn phí">
                  <div className="item">
                     <AiFillEye size={20} />
                     {user?.company?.amountOfFreeCvViews || "0"}
                  </div>
               </Tooltip>
               <Tooltip title="Lượt đăng tin tuyển dụng miễn phí">
                  <div className="item">
                     <MdFiberNew size={20} />
                     {user?.company?.amountOfFreeJobs || "0"}
                  </div>
               </Tooltip>
            </div>
            <Popover
               overlayClassName="styled-header-popover"
               trigger="click"
               content={
                  <div className="dropdown-group-btn">
                     {accounts.map((account) => (
                        <NavLink key={account.id} to={account.path}>
                           <button
                              className="button-content"
                              onClick={() => {
                                 setVisiblePopover(false);
                                 if (account?.id === 3) {
                                    localStorage.removeItem("access_token");
                                    localStorage.removeItem("userId");
                                    localStorage.removeItem("COMPANY_ID");
                                 }
                              }}
                           >
                              <Text>{t(account.title)}</Text>
                           </button>
                        </NavLink>
                     ))}
                  </div>
               }
            >
               <button className="button-header">
                  <Image
                     type="circle"
                     src={user?.company?.logoUrl || user?.avatarUrl}
                     width="32px"
                  />
               </button>
            </Popover>
         </div>

         <Modal visible={isOpen} onCancel={handleClose} width="1200px">
            <Payment />
         </Modal>
      </StyledRightHeader>
   );
};

export default RightHeader;
