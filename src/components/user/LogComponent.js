import React, { useState } from "react";
import LoginLayout from "../forms/Login/LoginLayout";
import RegisterLayout from "../forms/Register/RegisterLayout";

export default function LogComponent() {
  const [viewState, setViewState] = useState("login");

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
