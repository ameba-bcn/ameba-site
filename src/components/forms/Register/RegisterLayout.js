import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import SociDialog from "../../botiga/Soci";
import RegisterForm from "./RegisterForm";
import { useTranslation } from "react-i18next";
import Icon from "../../ui/Icon";
import styled from "styled-components";
import { StyledLink } from "../../../styles/GlobalStyles";

export const StyledAddBox = styled.div`
  margin-left: 0.5rem;
  display: flex;
  svg {
    background-color: #1d1d1b;
    scale: 1;
  }
`;

const RegisterLayout = (props) => {
  const [t] = useTranslation("translation");
  const profile = useSelector((state) => state.profile);
  const { user_profile = "" } = profile;
  const [redirect, setRedirect] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const showLogin = () => {
    props.setViewState("login");
  };

  if (redirect) return <Redirect to="/validate-email" />;

  return (
    <div className="cardForm">
      <div className="card-form">
        <div className="logTitle">{t("login.registrat")}</div>
        {user_profile !== "LOGGED" && (
          <div className="sociLogBanner" onClick={handleClick}>
            <div>{t("login.encara")}</div>
            <StyledAddBox>
              <Icon icon="plus" type="orange" />
            </StyledAddBox>
          </div>
        )}
        <RegisterForm setRedirect={setRedirect} />

        <StyledLink onClick={showLogin}>
          {`- ${t("login.inicia")} -`}
        </StyledLink>
        {open && <SociDialog open={open} onClose={handleClick} />}
      </div>
    </div>
  );
};

export default RegisterLayout;
