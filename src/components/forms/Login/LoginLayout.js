import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import LoginForm from "./LoginForm";

const LoginLayout = (props) => {
  const [t] = useTranslation("translation");
  const cart = useSelector((state) => state.cart);
  const { cart_data = {} } = cart;
  const { item_variant_ids = [] } = cart_data;
  const [redirect, setRedirect] = useState(false);
  const [recover, setRecover] = useState(false);

  const showRegistration = () => {
    props.setViewState("registration");
  };

  const showPasswordRecover = () => {
    setRecover(true);
  };

  if (redirect) {
    if (item_variant_ids.length > 0) {
      return <Redirect to="/checkout" />;
    } else {
      return <Redirect to="/" />;
    }
  }

  if (recover) return <Redirect to="/send-recovery" />;

  return (
    <div className="cardForm">
      <div className="card card-container card-login">
        <div className="logTitle">login</div>

        <LoginForm setRedirect={setRedirect} />

        <span className="logTextosLink" onClick={showRegistration}>
          {`- ${t("login.registrat")} -`}
        </span>
        <span className="logTextosLink" onClick={showPasswordRecover}>
          {`- ${t("login.recupera-llarg")} -`}
        </span>
      </div>
    </div>
  );
};

export default LoginLayout;
