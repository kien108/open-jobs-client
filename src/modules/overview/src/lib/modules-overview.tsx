import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next";
import { Navigate, Route, Routes } from "react-router-dom";
import { store } from "./redux/store";

import i18n from "./i18n/config";
import { RootState, useCommonSelector } from "../../../../libs/common";
import { Filter } from "./components";
import Jobs from "./pages/Jobs/Jobs";
import FillCompany from "./pages/FillCompany/FillCompany";
import { Profile } from "./pages/Profile";
import { ContactInformation } from "./components/ContactInformation";
import { CV } from "./components/CV";

export function ModuleOverview() {
   const { lang } = useCommonSelector((state: RootState) => state.lang);

   useEffect(() => {
      i18n.changeLanguage(lang);
   }, [lang]);

   return (
      <Provider store={store}>
         <I18nextProvider i18n={i18n}>
            <Routes>
               <Route path="/">
                  <Route index element={<Navigate to="jobs" />} />
                  <Route path="jobs" element={<Jobs />} />
                  <Route path="companies" element={<span>companies</span>} />
                  <Route path="validate" element={<FillCompany />} />
                  <Route path="profile" element={<Profile />}></Route>
                  <Route path="profile/contact" element={<ContactInformation />} />
                  <Route path="profile/cv" element={<CV />} />
               </Route>
            </Routes>
         </I18nextProvider>
      </Provider>
   );
}

export default ModuleOverview;
