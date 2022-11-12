import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next";
import { Navigate, Route, Routes } from "react-router-dom";
import { store } from "./redux/store";

import i18n from "./i18n/config";
import { RootState, useCommonSelector } from "./../../libs/common";
import { Layout } from "./container/Layout";
import { Jobs } from "./pages/Jobs";
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
               </Route>
            </Routes>
         </I18nextProvider>
      </Provider>
   );
}

export default ModuleDashboard;
