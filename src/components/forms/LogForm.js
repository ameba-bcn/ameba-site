import React, { useState, useRef } from "react";
import { required } from './FormValidator';
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink, useLocation } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { login } from "../../redux/actions/auth";
import { getCart } from "../../redux/actions/cart";

const LogForm = (props) => {
    const { isCheckout } = props;
    const form = useRef();
    const checkBtn = useRef();
    const [email, setEmailname] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const { message } = useSelector(state => state.message);
    const location = useLocation();
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
        props.setViewState("recover")
    }


    const handleLogin = (e) => {
        e.preventDefault();

        setLoading(true);

        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
            dispatch(login(email, password))
                .then(() => {
                    setLoading(false);
                    if (JSON.parse(localStorage.getItem("cart_id")) === null) {
                        dispatch(getCart())
                            .then(() => {
                                setRedirect(true)
                            })
                    }
                });
        } else {
            setLoading(false);
        }
    };

    if (redirect && location.pathname === '/login') {
        return <Redirect to='/' />;
    }

    return (
        <div className="col-md-12">
            <div className="card card-container card-login">
                {!isCheckout && (<div className="logTitle">login</div>)}
                <Form
                    onSubmit={handleLogin}
                    ref={form}>
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

                    <div className="form-group">
                        <button className="btn-block logFormButton" disabled={loading}>
                            {loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Login</span>
                        </button>
                    </div>

                    {message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </Form>
                {!isCheckout ?
                    <>
                        <span className="logTextosLink logTextosLinkRegistrat" onClick={showRegistration}>- Registra't -</span>
                        <span className="logTextosLink" onClick={showPasswordRecover}>- Recupera la teva contrassenya -</span>
                    </> :
                    <span className="logTextosLink logTextosLinkRegistrat" onClick={showRegistration}>
                        <NavLink to="/login" >- No tens compte? Registra't -</NavLink>
                    </span>}
            </div>
        </div>
    );
};

export default LogForm;
