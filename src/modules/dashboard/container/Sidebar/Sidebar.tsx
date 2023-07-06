import { Menu, MenuProps } from "antd";
import { Link, useLocation } from "react-router-dom";
import { StyledSidebar, StyledImage, StyledLogo } from "./styles";
import ImageLogo from "../../../../assets/img/logo.png";

import { RiAdminLine } from "react-icons/ri";
import { MdWorkOutline } from "react-icons/md";
import { AiOutlineUser, AiOutlineSetting, AiOutlineHome } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { BiCoinStack } from "react-icons/bi";
import { MdAnalytics } from "react-icons/md";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ROLE_ENUM, useRole } from "../../../../libs/common";
import "./styles.scss";

type MenuItem = Required<MenuProps>["items"][number];

const SideBar = () => {
   const { t } = useTranslation();
   const { pathname } = useLocation();
   const [selectedKey, setSelectedKey] = useState("/");
   const [openKey, setOpenKey] = useState<string[]>([]);

   const getItem = (
      isShow: boolean,
      label: string,
      path: string,
      key: React.Key,
      icon?: React.ReactNode,
      children?: MenuItem[]
   ): MenuItem => {
      return isShow
         ? ({
              key,
              icon,
              children,
              label: (
                 <Link className="link-sidebar" to={path}>
                    {label}
                 </Link>
              ),
           } as MenuItem)
         : null;
   };

   const items: MenuItem[] = [
      getItem(true, "Phân tích", "/dashboard/analytics", "analytics", <MdAnalytics />),
      getItem(true, "Quản lý tin tuyển dụng", "/dashboard/jobs", "jobs", <AiOutlineHome />),
      getItem(true, "Tìm kiếm ứng viên", "/dashboard/cvs", "cvs", <FaUserCircle />),
      getItem(true, "Quản lý giao dịch", "/dashboard/invoice", "invoice", <BiCoinStack />),
   ];

   const onOpenChange = (items: string[]) => {
      setOpenKey(items);
   };

   useEffect(() => {
      const paths = pathname.split("/");

      if (pathname.includes("dashboard")) {
         setSelectedKey(paths[2]);
         setOpenKey(["dashboard"]);
         document.querySelectorAll(".custom-menu")[0] as HTMLElement;
      } else {
         setSelectedKey(paths[1]);
         setOpenKey([]);
      }
   }, [pathname]);

   useEffect(() => {
      if (openKey.length > 0) {
         setTimeout(() => {
            (
               document.querySelectorAll(".ant-menu-submenu-title")[0] as HTMLElement
            )?.scrollIntoView({
               behavior: "smooth",
            });
         }, 500);
      }
   }, [openKey]);

   useEffect(() => {
      document.addEventListener("mousemove", function (e) {
         const ele = document.querySelectorAll(".custom-menu")[0] as HTMLElement;
         const distance = ele?.offsetLeft + ele?.offsetWidth - e.pageX;
         distance < 8 && distance > 0
            ? ele?.classList.add("more-width")
            : ele?.classList.remove("more-width");
      });
   }, []);

   return (
      <StyledSidebar>
         <StyledLogo>
            <Link to="/dashboard">
               <StyledImage src={ImageLogo} />
            </Link>
         </StyledLogo>
         <Menu
            className="custom-menu"
            mode="inline"
            selectedKeys={[selectedKey]}
            openKeys={openKey}
            items={items}
            onOpenChange={onOpenChange}
         />
      </StyledSidebar>
   );
};

export default SideBar;
