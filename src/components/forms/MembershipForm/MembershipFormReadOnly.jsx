import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import InputField from "../InputField/InputField";
import { useSelector } from "react-redux";
import { LogFormBox, LogFormError } from "../Log.style";
import { Redirect } from "react-router";
import { useTranslation } from "react-i18next";
import Button from "../../button/Button";
import { usernameValidation } from "../../../utils/validations";
import { API_URL, ERROR, MOBILE_SMALL } from "../../../utils/constants";
import axiosInstance from "../../../axios";
import { StyledLink } from "../../../styles/GlobalStyles";
import useMediaQuery from "../../../hooks/use-media-query";

export default function MembershipFormReadOnly(props) {
  const [t] = useTranslation("translation");
  const { isCheckout = false } = props;
  const auth = useSelector((state) => state.auth);
  const { user_data = {} } = auth;
  const [redirect, setRedirect] = useState(false);
  const [user, setUser] = useState(user_data?.username || "");

  const isMinMobile = useMediaQuery(MOBILE_SMALL);

  const showPasswordRecover = () => {
    setRedirect(true);
  };
  if (redirect) return <Redirect to="/send-recovery" />;
  let location = useLocation();
  let section = location.pathname;
  const inProfileView = section.includes("profile");
  const errors = usernameValidation(user) || user.length === 0;

  const setNewUserName = () => {
    axiosInstance
      .patch(`${API_URL}users/current/`, { username: user })
      .then(() => {})
      .catch((err) => {
        console.warn("ERROR: ", err);
      });
  };

  return (
    <div className="cardForm">
      <div className="card-form">
        <LogFormBox>
          <form>
            <div className="field-wrapper">
              {inProfileView ? (
                <>
                  <InputField
                    id="user"
                    name="user"
                    type="text"
                    label={t("form.usuari")}
                    onChange={(e) => setUser(e.target.value)}
                    slimLine={true}
                    value={user}
                    valid={!usernameValidation(user)}
                  />
                  {errors && (
                    <LogFormError>
                      <div>{ERROR.USERNAME.FORMAT}</div>
                    </LogFormError>
                  )}
                </>
              ) : (
                <InputField
                  id="userName"
                  name="userName"
                  type="text"
                  label={t("form.usuari")}
                  value={user_data?.username}
                  valid={true}
                  disabled={true}
                />
              )}
            </div>
            <div className="field-wrapper">
              <InputField
                id="emailMemberReadOnly"
                name="email"
                type="email"
                label="email"
                value={user_data?.email}
                valid={true}
                disabled={true}
              />
            </div>
          </form>
        </LogFormBox>
        {!isCheckout && (
          <StyledLink>
            {user_data?.username !== user ? (
              <Button
                variant="contained"
                color="primary"
                buttonSize="boton--medium"
                buttonStyle="boton--primary--solid"
                onClick={setNewUserName}
              >
                {t("boto.guarda")}
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                buttonSize={isMinMobile ? "boton--small" : "boton--medium"}
                buttonStyle="boton--primary--solid"
                onClick={showPasswordRecover}
              >
                {t("login.modifica")}
              </Button>
            )}
          </StyledLink>
        )}
      </div>
    </div>
  );
}
