import React from "react";
import { Outlet } from "react-router-dom";
import { TabsRequest } from "../../components/TabsRequest";

const CVManagement = () => {
   return (
      <div>
         <TabsRequest />
         <Outlet />
      </div>
   );
};

export default CVManagement;
