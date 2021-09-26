import React, { useState } from "react";
import { useSelector } from "react-redux";
import LoginLayout from "../forms/Login/LoginLayout";
import RegisterLayout from "../forms/Register/RegisterLayout";

export default function LogComponent() {
  const { user_profile = "" } = useSelector((state) => state.profile);

  const [viewState, setViewState] = useState(
    user_profile === "MEMBER_CANDIDATE" ? "registration" : "login"
  );

  return (
    <div className="loginWall">
      {viewState === "registration" ? (
        <RegisterLayout viewState={viewState} setViewState={setViewState} />
      ) : (
        <LoginLayout
          isCheckout={false}
          viewState={viewState}
          setViewState={setViewState}
        />
      )}
    </div>
  );
}
