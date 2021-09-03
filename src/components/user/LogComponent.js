import React, { useState } from "react";
import { useSelector } from "react-redux";
import Login from "../forms/Login";
import Register from "../forms/Register";

export default function LogComponent() {
  const { user_profile = "" } = useSelector((state) => state.profile);

  const [viewState, setViewState] = useState(
    user_profile === "MEMBER_CANDIDATE" ? "registration" : "login"
  );

  return (
    <div className="loginWall">
      {viewState === "registration" ? (
        <Register viewState={viewState} setViewState={setViewState} />
      ) : (
        <Login
          isCheckout={false}
          viewState={viewState}
          setViewState={setViewState}
        />
      )}
    </div>
  );
}
