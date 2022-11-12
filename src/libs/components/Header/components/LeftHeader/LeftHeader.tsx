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

const LeftHeader = () => {
   const { pathname } = useLocation();
   const { t } = useTranslation();
   const [openKey, setOpenKey] = useState("/");

   useEffect(() => {
      const paths = pathname.split("/");
      setOpenKey(paths.slice(0, 3).join("/"));
   }, [pathname]);

   return (
      <StyledLeftHeader>
         <StyledLogo>
            <Link to="/">
               <StyledImage src={ImageLogo} />
            </Link>
         </StyledLogo>
         <StyledContainerLink tabBarGutter={24} activeKey={openKey}>
            {navLinks.length > 0 &&
               navLinks.map((item: LinkType) => (
                  <StyledLink
                     key={item.key}
                     tab={
                        <Link className="custom-link-header" to={item.path}>
                           {t(item.display)}
                        </Link>
                     }
                  />
               ))}
         </StyledContainerLink>
      </StyledLeftHeader>
   );
};

export default LeftHeader;
