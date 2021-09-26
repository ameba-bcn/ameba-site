import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import SociDialog from "../../botiga/Soci";
import RegisterForm from "./RegisterForm";

const RegisterLayout = (props) => {
  const { message } = useSelector((state) => state.message);
  const profile = useSelector((state) => state.profile);
  const { user_profile = "" } = profile;
  const [displayError, setDisplayError] = useState(false);
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
    <div className="col-md-12">
      <div className="card card-container card-login">
        <div className="logTitle">registra't</div>
        {user_profile !== "LOGGED" && (
          <div className="sociLogBanner" onClick={handleClick}>
            encara no ets soci/a? Informa't aquí!
            <AddIcon className="sociLogBannerPlus" />
          </div>
        )}
        <RegisterForm
          setDisplayError={setDisplayError}
          setRedirect={setRedirect}
        />
        {displayError && message && (
          <div className="form-group">
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          </div>
        )}
        <span className="logTextosLink" onClick={showLogin}>
          - Ja estàs registrat? Inicia sessió -
        </span>
        {open && <SociDialog open={open} onClose={handleClick} />}
      </div>
    </div>
  );
};

export default RegisterLayout;
