import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import AddIcon from "@material-ui/icons/Add";
import { register } from "../../redux/actions/auth";
import SociDialog from "../../components/botiga/Soci";
import Button from "../button/Button";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Iep fera! Aquest camp es obligatori!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        Ay ay ay... això no es vàlid!
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        Ni et flipis ni et quedis curt, has de tenir de 3-20 lletres!
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        Ni et flipis ni et quedis curt, has de tenir de 6-40 lletres
      </div>
    );
  }
};

const Register = (props) => {
  const form = useRef();
  const checkBtn = useRef();
  const { message } = useSelector((state) => state.message);
  const profile = useSelector((state) => state.profile);
  const { user_profile = "" } = profile;
  const { cart_data = {} } = useSelector((state) => state.cart);
  const { id = null } = cart_data;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [displayError, setDisplayError] = useState(false);
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();

  const handleClick = () => {
    setOpen(!open);
  };

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      const registerData = cart_data
        ? { username, email, password, id }
        : { username, email, password };
      dispatch(register(registerData))
        .then(() => {
          setSuccessful(true);
        })
        .catch(() => {
          setSuccessful(false);
          setDisplayError(true);
        });
    }
  };

  const showLogin = () => {
    props.setViewState("login");
  };

  if (successful) return <Redirect to="/validate-email" />;

  return (
    <div className="col-md-12">
      <div className="card card-container card-login">
        <div className="logTitle">registra't</div>
        {user_profile !== "MEMBER_CANDIDATE" && (
          <div className="sociLogBanner" onClick={handleClick}>
            encara no ets soci/a? Informa't aquí!
            <AddIcon className="sociLogBannerPlus" />
          </div>
        )}

        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <Input
                  type="text"
                  className="form-control logForm"
                  name="username"
                  placeholder="usuari"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required, vusername]}
                />
              </div>

              <div className="form-group">
                <Input
                  type="text"
                  className="form-control logForm"
                  name="email"
                  placeholder="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>

              <div className="form-group">
                <Input
                  type="password"
                  className="form-control logForm"
                  name="password"
                  placeholder="contrasenya"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>

              <div className="form-group">
                <Button
                  variant="contained"
                  color="primary"
                  buttonSize="boton--medium"
                  buttonStyle="boton--primary--solid"
                >
                  Registra't
                </Button>
              </div>
            </div>
          )}

          {displayError && message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
        <span className="logTextosLink" onClick={showLogin}>
          - Ja estàs registrat? Inicia sessió -
        </span>
        {open && <SociDialog open={open} onClose={handleClick} />}
      </div>
    </div>
  );
};

export default Register;
