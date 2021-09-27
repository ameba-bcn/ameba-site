import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import LoginForm from "./LoginForm";

const LoginLayout = (props) => {
  const { message } = useSelector((state) => state.message);
  const cart = useSelector((state) => state.cart);
  const { cart_data = {} } = cart;
  const { state = {} } = cart_data;
  const [redirect, setRedirect] = useState(false);
  const [recover, setRecover] = useState(false);
  const [displayError, setDisplayError] = useState(false);

  const showRegistration = () => {
    props.setViewState("registration");
  };

  const showPasswordRecover = () => {
    setRecover(true);
  };

  if (redirect) {
    const { needs_checkout, has_subscriptions, has_article, has_memberships } =
      state || {};
    if (
      needs_checkout === false &&
      has_subscriptions === 1 &&
      has_memberships === false
    ) {
      return <Redirect to="/checkout" />;
    } else if (needs_checkout === false && has_article === 1) {
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

        <LoginForm
          setRedirect={setRedirect}
          setDisplayError={setDisplayError}
        />

        {displayError && message && (
          <div className="form-group">
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          </div>
        )}

        <span
          className="logTextosLink logTextosLinkRegistrat"
          onClick={showRegistration}
        >
          - Registra't -
        </span>
        <span className="logTextosLink" onClick={showPasswordRecover}>
          - Recupera la teva contrasenya -
        </span>
      </div>
    </div>
  );
};

export default LoginLayout;
