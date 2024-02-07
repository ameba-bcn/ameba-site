import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import WebFont from "webfontloader";
import { BrowserRouter } from "react-router-dom";
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

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <I18nextProvider i18n={i18next}>
        <App />
      </I18nextProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
