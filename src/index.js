import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import WebFont from "webfontloader";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./components/error-handler/ErrorHandler";
import { Provider } from "react-redux";
import store from "./store";
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import "./i18next";

WebFont.load({
  google: {
    families: ["Montserrat:300,400,700,900", "sans-serif"],
  },
});
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <I18nextProvider i18n={i18next}>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </I18nextProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
