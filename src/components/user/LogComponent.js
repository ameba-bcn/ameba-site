import React, { useState } from "react";
import { useSelector } from "react-redux";
import LoginLayout from "../forms/Login/LoginLayout";
import RegisterLayout from "../forms/Register/RegisterLayout";

export default function LogComponent() {
  const { cart_data = {} } = useSelector((state) => state.cart);
  const { state = {} } = cart_data;
  const { has_subscriptions = false } = state || {};
  const [viewState, setViewState] = useState(
    has_subscriptions ? "registration" : "login"
  );

  return (
    <div className="loginWall">
      {viewState === "registration" ? (
        <RegisterLayout viewState={viewState} setViewState={setViewState} />
      ) : (
        <LoginLayout viewState={viewState} setViewState={setViewState} />
      )}
    </div>
  );
}
