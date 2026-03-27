import React, { useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import RegisterForm from "./RegisterForm";
import { useTranslation } from "react-i18next";
import Icon from "../../ui/Icon";
import useProfileStore from "../../../stores/useProfileStore";
import "./RegisterLayout.css";

const RegisterLayout = (props) => {
  const [t] = useTranslation("translation");
  const { user_profile = "" } = useProfileStore();
  const [redirect, setRedirect] = useState(false);
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
            <div className="sociLogBanner">
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
      </div>
    </div>
  );
};

export default RegisterLayout;
