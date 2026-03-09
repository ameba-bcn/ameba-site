import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import { StyledLink } from "../../../styles/GlobalStyles";
import useCartStore from "../../../stores/useCartStore";

const LoginLayout = (props) => {
  const [t] = useTranslation("translation");
  const { cart_data = {} } = useCartStore();
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
      return <Navigate to="/checkout" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  if (recover) return <Navigate to="/send-recovery" replace />;

  return (
    <div className="cardForm">
      <div className="card-form">
        <div className="logTitle">login</div>

        <LoginForm setRedirect={setRedirect} />

        <StyledLink bold={1} onClick={showRegistration}>
          {`- ${t("login.registrat")} -`}
        </StyledLink>
        <StyledLink bold={1} onClick={showPasswordRecover}>
          {`- ${t("login.recupera-llarg")} -`}
        </StyledLink>
      </div>
    </div>
  );
};

export default LoginLayout;
