import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next";
import { Navigate, Route, Routes } from "react-router-dom";
import { store } from "./redux/store";

import i18n from "./i18n/config";
import { RootState, useCommonSelector } from "./../../libs/common";
import { Layout } from "./container/Layout";
import { Jobs } from "./pages/Jobs";
import FillCompany from "../dashboard/pages/FillCompany/FillCompany";
import { CVMatched } from "./pages/Jobs/CV";
import { TabsRequest } from "./components/TabsRequest";
import { CVManagement } from "./pages/CVManagement";
import { CVApplied } from "./pages/CVApplied";
import { CV } from "../overview/src/lib/components/CV";
import { CVDetail, ViewCVSearching } from "./components";
import { Analytics, CVSearching, Invoice, Premium, PreviewPayment } from "./pages";
// import { Filter } from "./components";

export function ModuleDashboard() {
   const { lang } = useCommonSelector((state: RootState) => state.lang);

   useEffect(() => {
      i18n.changeLanguage(lang);
   }, [lang]);

   return (
      <Provider store={store}>
         <I18nextProvider i18n={i18n}>
            <Routes>
               <Route path="/*" element={<Layout />}>
                  <Route index element={<Navigate to="jobs" />} />
                  <Route path="jobs/*" element={<Jobs />} />
                  <Route path="cvs/*" element={<CVSearching />} />
                  <Route path="cvs/:cvId" element={<ViewCVSearching />} />
                  <Route path="premium" element={<Premium />} />
                  <Route path="invoice" element={<Invoice />} />
                  <Route path="analytics" element={<Analytics />} />

                  <Route path="paypal/success" element={<PreviewPayment />} />

                  <Route path="jobs/:id" element={<CVManagement />}>
                     <Route path="cv-matched" element={<CVMatched />} />
                     <Route path="cv-applied" element={<CVApplied />} />
                     <Route path="cv-applied/:cvId" element={<CVDetail />} />
                     <Route path="cv-matched/:cvId" element={<CVDetail />} />
                  </Route>
                  <Route path="profile" element={<FillCompany />} />
               </Route>
            </Routes>
         </I18nextProvider>
      </Provider>
   );
}

export default ModuleDashboard;
