import React, { useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import SociDialog from "../../botiga/Soci";
import RegisterForm from "./RegisterForm";
import { useTranslation } from "react-i18next";
import Icon from "../../ui/Icon";
import "../../../styles/GlobalStyles.css";
import "./RegisterLayout.css";
import useProfileStore from "../../../stores/useProfileStore";

const RegisterLayout = (props) => {
  const [t] = useTranslation("translation");
  const { user_profile = "" } = useProfileStore();
  const [redirect, setRedirect] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const showLogin = () => {
    props.setViewState("login");
  };

  if (redirect) return <Navigate to="/validate-email" replace />;

  return (
    <div className="cardForm">
      <div className="card-form">
        <div className="logTitle">{t("login.registrat")}</div>
        {user_profile !== "LOGGED" && (
          <NavLink to="/memberships">
            <div className="sociLogBanner" onClick={handleClick}>
              <div>{t("login.encara")}</div>
              <div className="register-add-box">
                <Icon icon="plus" type="orange" />
              </div>
            </div>
          </NavLink>
        )}
        <RegisterForm setRedirect={setRedirect} />

        <div className="styled-link styled-link--bold" onClick={showLogin}>
          {`- ${t("login.inicia")} -`}
        </div>
        {open && <SociDialog open={open} onClose={handleClick} />}
      </div>
    </div>
  );
};

export default RegisterLayout;
