import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import App from "./App";

import { apiStore, CommonContext, store, theme } from "./libs/common";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
   <StrictMode>
      <Provider store={store} context={CommonContext}>
         <Provider store={apiStore}>
            <ThemeProvider theme={theme}>
               <App />
            </ThemeProvider>
         </Provider>
      </Provider>
   </StrictMode>
);
