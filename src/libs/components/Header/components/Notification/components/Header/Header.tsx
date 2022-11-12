import { NotificationOffIcon, SettingIcon } from "../../../../../Icons";
import React from "react";
import { useTranslation } from "react-i18next";
import { HeaderStyled } from "./styles";

const Header = () => {
   const { t } = useTranslation();

   return (
      <HeaderStyled>
         <h2>{t("notification.title")}</h2>
         <div className="right">
            <button>
               <NotificationOffIcon width={24} height={24} />
            </button>
            <button>
               <SettingIcon width={24} height={24} />
            </button>
         </div>
      </HeaderStyled>
   );
};

export default Header;
