import React, { useState } from "react";
import { Typography } from "antd";
import { Notification } from "../Notification";
import { NavLink } from "react-router-dom";
import { AccountType, LanguageType } from "../../types";
import { useTranslation } from "react-i18next";
import { StyledRightHeader } from "./styles";
import "../Popover/style.scss";

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

   return (
      <StyledRightHeader>
         <div className="dropdown">
            <div className="point" onClick={handleOpen}>
               <img src={logo} alt="" />
               <span>{user?.company?.accountBalance || "0"}</span>
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
                              onClick={() => setVisiblePopover(false)}
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
