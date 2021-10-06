import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
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
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Provider store={store}>
      {/* <React.StrictMode> */}
      <I18nextProvider i18n={i18next}>
        <App />
      </I18nextProvider>
      {/* </React.StrictMode> */}
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
