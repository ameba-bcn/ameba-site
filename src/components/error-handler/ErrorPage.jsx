import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Navbar from "../navbar/Navbar";
import { StyledLink } from "../../styles/GlobalStyles";

export const StyledModalRow = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--color-rojo);
  .body-app {
    height: calc(100vh - 80px);
    display: flex;
    justify-content: center;
    align-items: center;
    .single-msg {
      width: fit-content;
      text-align: center;
    }
  }
  #link {
    font-family: "Bebas Neue";
    font-size: 44px;
    line-height: 48px;
  }
  span {
    display: none;
  }
  #link:hover {
    span {
      display: contents;
    }
  }
`;

const ErrorPage = () => {
  const [t] = useTranslation("translation");
  return (
    <StyledModalRow>
      <Navbar isErrored={true} />
      <div className="body-app">
        <div className="single-msg">
          {t("errors.general")}
          <br />
          <StyledLink onClick={() => window.location.reload()} id="link">
            <span>🔄</span> {t("boto.recarrega").toLocaleUpperCase()}{" "}
            <span>🔄</span>
          </StyledLink>
        </div>{" "}
      </div>
    </StyledModalRow>
  );
};

export default ErrorPage;
