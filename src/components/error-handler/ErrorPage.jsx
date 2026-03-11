import React from "react";
import { useTranslation } from "react-i18next";
import Navbar from "../navbar/Navbar";
import "../../styles/GlobalStyles.css";
import "./ErrorPage.css";

const ErrorPage = () => {
  const [t] = useTranslation("translation");
  return (
    <div className="error-page">
      <Navbar isErrored={true} />
      <div className="body-app">
        <div className="single-msg">
          {t("errors.general")}
          <br />
          <div className="styled-link" onClick={() => window.location.reload()} id="link">
            <span>🔄</span> {t("boto.recarrega").toLocaleUpperCase()}{" "}
            <span>🔄</span>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default ErrorPage;
