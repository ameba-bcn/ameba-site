import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import SociDialog from "../../botiga/Soci";
import RegisterForm from "./RegisterForm";
import { useTranslation } from "react-i18next";

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
      <div className="card card-container card-login">
        <div className="logTitle">{t("login.registrat")}</div>
        {user_profile !== "LOGGED" && (
          <div className="sociLogBanner" onClick={handleClick}>
            {t("login.encara")}
            <AddIcon className="sociLogBannerPlus" />
          </div>
        )}
        <RegisterForm setRedirect={setRedirect} />

        <span className="logTextosLink" onClick={showLogin}>
          {`- ${t("login.inicia")} -`}
        </span>
        {open && <SociDialog open={open} onClose={handleClick} />}
      </div>
    </div>
  );
};

export default RegisterLayout;
