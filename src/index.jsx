import "./sentry";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./components/error-handler/ErrorHandler";
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import "./i18next";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <BrowserRouter>
    <I18nextProvider i18n={i18next}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </I18nextProvider>
  </BrowserRouter>
);
