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
} from "../../../../../../libs/common";
import { LanguageIcon, NotificationIcon } from "../../../../../../libs/components/Icons";
import { Image } from "../../../../../../libs/components/Avatar";

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

   return (
      <StyledRightHeader>
         <div className="dropdown">
            <Popover
               overlayClassName="styled-header-popover"
               trigger="click"
               visible={visiblePopover}
               onVisibleChange={handleVisibleChange}
               content={
                  <div className="dropdown-group-btn">
                     {languages.map((language) => (
                        <button
                           className="button-content"
                           key={language.id}
                           onClick={() => {
                              i18n
                                 .changeLanguage(language.code)
                                 .then(() => setVisiblePopover(false));
                              dispatch(changeLang(language.code));
                           }}
                        >
                           <Text>{language.title}</Text>
                        </button>
                     ))}
                  </div>
               }
            >
               <button className="button-header hover">
                  <LanguageIcon width="30px" height="36px" />
               </button>
            </Popover>
         </div>
         <div className="notification">
            <Popover
               overlayClassName="styled-header-popover"
               content={<Notification></Notification>}
               trigger="click"
            >
               <button className="button-header hover">
                  <NotificationIcon width="30px" height="36px" />
                  <div className="number-notification">1</div>
               </button>
            </Popover>
         </div>
         <div className="dropdown">
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
                  <Image type="circle" src={user?.avatarUrl} width="32px" />
               </button>
            </Popover>
         </div>
      </StyledRightHeader>
   );
};

export default RightHeader;
