import React from "react";
import { Outlet } from "react-router-dom";
import { Layout as AntLayout } from "antd";
import { Filter } from "../components/Filter";

import { Content } from "antd/lib/layout/layout";
import { Modal } from "../../../../../libs/components";
import { Footer } from "../components";

const Layout = () => {
   console.log("he");
   return (
      <>
         <AntLayout>
            <AntLayout style={{ height: "100vh" }}>
               <Content className="site-layout-content" style={{ background: "#fff" }}>
                  <Outlet />
                  <Footer />
               </Content>
            </AntLayout>
         </AntLayout>
      </>
   );
};

export default Layout;
