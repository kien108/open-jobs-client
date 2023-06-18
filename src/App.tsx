import { PrivateRoute, i18n } from "./libs/common";

import { Layout, Common as CommonPage } from "./libs/components";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { ModulesAuth } from "./modules/auth/src";
import { I18nextProvider } from "react-i18next";
import { ModuleOverview } from "./modules/overview/src";
import ModuleDashboard from "./modules/dashboard/modules-dashboard";
import { ModuleCVReview } from "./modules/cv-review";

import "./style.scss";
import "antd/dist/antd.css";

export function App() {
   return (
      <BrowserRouter>
         <I18nextProvider i18n={i18n}>
            <Routes>
               <Route element={<PrivateRoute />}></Route>
               <Route path="/*" element={<Layout />}>
                  <Route index element={<Navigate to="overview" />} />
                  <Route path="overview/*" element={<ModuleOverview />} />
               </Route>
               <Route path="dashboard/*" element={<ModuleDashboard />}></Route>

               <Route path="auth/*" element={<ModulesAuth />} />
               {/* <Route path="common" element={<CommonPage />} /> */}
               <Route path="cv-review/*" element={<ModuleCVReview />} />
            </Routes>
         </I18nextProvider>
      </BrowserRouter>
   );
}

export default App;
