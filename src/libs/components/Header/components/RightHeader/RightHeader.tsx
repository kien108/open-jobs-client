import React, { useState } from "react";
import { Typography } from "antd";
import { Notification } from "../Notification";
import { Link, NavLink } from "react-router-dom";
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
   getToken,
   setToken,
} from "../../../../common";
import { LanguageIcon, NotificationIcon } from "../../../Icons";
import { Image } from "../../../Avatar";

const { Text } = Typography;

interface Props {
   languages: LanguageType[];
   accounts: AccountType[];
}

const RightHeader = ({ languages, accounts }: Props) => {
   const { t, i18n } = useTranslation();
   const dispatch = useCommonDispatch();
   const { user } = useCommonSelector((state: RootState) => state.user);
   const accessToken = getToken();

   const [visiblePopover, setVisiblePopover] = useState(false);

   const handleVisibleChange = (newVisible: boolean) => {
      setVisiblePopover(newVisible);
   };

   return (
      <StyledRightHeader>
         <div className="dropdown">
            {accessToken ? (
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
                                       localStorage.removeItem("prevUrl");
                                       localStorage.removeItem("prevJobId");
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
                     <Image type="circle" src={user?.avatarUrl} width="32px" />
                  </button>
               </Popover>
            ) : (
               <Link
                  className="sign-in"
                  to={"/auth"}
                  onClick={() => {
                     localStorage.removeItem("prevUrl");
                     localStorage.removeItem("prevJobId");
                  }}
               >
                  Đăng nhập/Đăng ký
               </Link>
            )}
         </div>
      </StyledRightHeader>
   );
};

export default RightHeader;
