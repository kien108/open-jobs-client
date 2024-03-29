import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next";
import { Navigate, Route, Routes } from "react-router-dom";
import { store } from "./redux/store";

import i18n from "./i18n/config";
import { RootState, useCommonSelector } from "../../../../libs/common";
import { CVTemplate1, Filter } from "./components";
import Jobs from "./pages/Jobs/Jobs";
// import FillCompany from "./pages/FillCompany/FillCompany";
import { Profile } from "./pages/Profile";
import { ContactInformation } from "./components/ContactInformation";
import { CV } from "./components/CV";
import { CompanyDetail } from "./pages/CompanyDetail";
import { Companies } from "./pages/Companies";
import { Home, HomeContent, JobsApplied, ViewJobDetail } from "./pages";
import { CVDetail } from "./components/CVDetail";

export function ModuleOverview() {
   const { lang } = useCommonSelector((state: RootState) => state.lang);
   const { user } = useCommonSelector((state: RootState) => state.user);

   useEffect(() => {
      i18n.changeLanguage(lang);
   }, [lang]);

   return (
      <Provider store={store}>
         <I18nextProvider i18n={i18n}>
            <Routes>
               <Route path="/">
                  <Route index element={<Navigate to="welcome" />} />
                  <Route path="welcome/*" element={<Home />}>
                     <Route index element={<HomeContent />} />
                     <Route path="jobs" element={<Jobs />} />
                  </Route>
                  <Route path="job-detail/:id" element={<ViewJobDetail />} />

                  <Route path="companies" element={<Companies />} />
                  <Route path="companies/:id" element={<CompanyDetail />} />
                  {/* <Route path="validate" element={<FillCompany />} /> */}
                  <Route path="profile" element={<Profile />}></Route>
                  <Route path="profile/contact" element={<ContactInformation />} />
                  <Route path="profile/cv/default" element={<CVDetail />} />
                  <Route path="profile/cv/other" element={<CVTemplate1 />} />
                  {/* <Route path="profile/cv" element={<CVTemplate1 />} /> */}
                  <Route path="profile/cv/edit" element={<CV />} />
                  <Route path="jobs-applied" element={<JobsApplied />} />
               </Route>
            </Routes>
         </I18nextProvider>
      </Provider>
   );
}

export default ModuleOverview;
