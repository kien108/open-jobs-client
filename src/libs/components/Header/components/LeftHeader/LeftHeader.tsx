import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { LinkType } from "../../types/link";
import { navLinks } from "./linkHeader";
import {
   StyledContainerLink,
   StyledImage,
   StyledLeftHeader,
   StyledLink,
   StyledLogo,
} from "./styles";

import ImageLogo from "../../../../../assets/img/logo.png";
import { getToken } from "./../../../../common/utils/remember";
import { openNotification } from "../../../../components";
import { RootState, useCommonSelector } from "../../../../common";

const LeftHeader = () => {
   const { pathname } = useLocation();
   const { cv } = useCommonSelector((state: RootState) => state.user?.user);
   const { t } = useTranslation();
   const token = getToken();
   const [openKey, setOpenKey] = useState("/");

   useEffect(() => {
      const paths = pathname.split("/");

      if (pathname.includes("jobs")) {
         setOpenKey(paths.slice(0, 4).join("/"));
      } else {
         setOpenKey(paths.slice(0, 3).join("/"));
      }
   }, [pathname]);

   return (
      <StyledLeftHeader>
         <StyledLogo>
            <Link to="/">
               <StyledImage src={ImageLogo} />
            </Link>
         </StyledLogo>
         {cv?.title && (
            <StyledContainerLink tabBarGutter={24} activeKey={openKey}>
               {navLinks.length > 0 &&
                  navLinks.map((item: LinkType) =>
                     !item?.isLogin ? (
                        <StyledLink
                           key={item.key}
                           tab={
                              <Link
                                 className="custom-link-header"
                                 to={item.path}
                                 onClick={(e) => {
                                    if (item.path.includes("applied")) {
                                       if (!getToken()) {
                                          e.preventDefault();
                                          openNotification({
                                             type: "warning",
                                             message: "Please login firstly!",
                                          });
                                       }
                                    }
                                 }}
                              >
                                 {item.display}
                              </Link>
                           }
                        />
                     ) : token ? (
                        <StyledLink
                           key={item.key}
                           tab={
                              <Link
                                 className="custom-link-header"
                                 to={item.path}
                                 onClick={(e) => {
                                    if (item.path.includes("applied")) {
                                       if (!getToken()) {
                                          e.preventDefault();
                                          openNotification({
                                             type: "warning",
                                             message: "Please login firstly!",
                                          });
                                       }
                                    }
                                 }}
                              >
                                 {t(`header.${item.display}`)}
                              </Link>
                           }
                        />
                     ) : (
                        <></>
                     )
                  )}
            </StyledContainerLink>
         )}
      </StyledLeftHeader>
   );
};

export default LeftHeader;
