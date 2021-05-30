import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { login, getUserData } from "../../redux/actions/auth";
import { getCart } from "../../redux/actions/cart";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                Iep fera! Camp obligatori!
            </div>
        );
    }
};

const Login = (props) => {
    const form = useRef();
    const checkBtn = useRef();
    const { isCheckout, isNewMember } = props;
    const { message } = useSelector(state => state.message);
    const profile = useSelector(state => state.profile)
    const cart = useSelector(state => state.cart)
    const { cart_data = {} } = cart
    const { state = {} } = cart_data;
    const { user_profile = "" } = profile
    const [email, setEmailname] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [recover, setRecover] = useState(false);
    const [displayError, setDisplayError] = useState(false);
    const dispatch = useDispatch();
    const onChangeUsername = (e) => {
        const email = e.target.value;
        setEmailname(email);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const showRegistration = () => {
        props.setViewState("registration")
    }

    const showPasswordRecover = () => {
        setRecover(true)
    }

    const handleLogin = (e) => {
        e.preventDefault();

        setLoading(true);

        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
            dispatch(login(email, password))
                .then(() => {
                    dispatch(getUserData())
                    dispatch(getCart()).then(() => {
                        setRedirect(true)
                    })
                    setLoading(false);
                }).catch(() => {
                    setDisplayError(true)
                    setLoading(false)
                }
                )
        } else {
            setLoading(false);
        }
    };


    if (redirect) {
        const { needs_checkout, has_subscriptions, has_article, has_memberships } = state || {};
        if (needs_checkout === false && has_subscriptions === 1 && has_memberships === false) {
            return <Redirect to='/membership-registration' />;
        }
        else if (needs_checkout === false && has_article === 1) {
            return <Redirect to='/checkout' />;
        }
        else {
            return <Redirect to='/' />;
        }
    }

    if (recover) return <Redirect to='/send-recovery' />

    return (
        <div className="col-md-12">
            {user_profile !== "LOGGED" ? <div className="card card-container card-login">
                {!isCheckout && (<div className={isNewMember ? "logTitleSmall" : "logTitle"}>login</div>)}
                <Form onSubmit={handleLogin} ref={form}>
                    <div className="form-group">
                        <Input
                            type="text"
                            className="form-control logForm"
                            name="email"
                            placeholder="email"
                            value={email}
                            onChange={onChangeUsername}
                            validations={[required]}
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
                            validations={[required]}
                        />
                    </div>
                    {loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                    )}

                    <div className="form-group">
                        <button className="btn-block logFormButton" disabled={loading}>
                            <span>Login</span>
                        </button>
                    </div>

                    {(displayError && message) && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </Form>
                {!isNewMember && (isCheckout ?
                    <span className="logTextosLink logTextosLinkRegistrat" onClick={showRegistration}><NavLink to="/login" >- No tens compte? Registra't -</NavLink></span> :
                    <>
                        <span className="logTextosLink logTextosLinkRegistrat" onClick={showRegistration}>- Registra't -</span>
                        <span className="logTextosLink" onClick={showPasswordRecover}>- Recupera la teva contrassenya -</span>
                    </>
                )}
            </div> : <>Datos del user y botón de Log Out</>}
        </div>
    );
};

export default Login;