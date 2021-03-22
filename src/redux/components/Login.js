import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
// import UserService from "../services/user.service";
import { login } from "../actions/auth";
import { getCart } from "../actions/cart";
import { useLocation } from 'react-router-dom';

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

    const [email, setEmailname] = useState("");
    const [password, setPassword] = useState("");
    // const [userName, setUserName] = useState("");
    const [loading, setLoading] = useState(false);

    const { isLoggedIn } = useSelector(state => state.auth);
    const { message } = useSelector(state => state.message);
    const location = useLocation();
    console.log("location", location)
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
        // console.log(props.viewState)
    }

    const showPasswordRecover = () => {
        props.setViewState("recover")
        // console.log(props.viewState)
    }

    const handleLogin = (e) => {
        e.preventDefault();

        setLoading(true);

        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
            dispatch(login(email, password))
                .then(() => {
                    // el push recarga la ruta y para seguir ejecutando necesitamos el catch
                    props.history.push("/");
                    // window.location.reload();
                }).catch(() => {
                    setLoading(false);
                    dispatch(getCart())
                });
        } else {
            setLoading(false);
        }

    };

    if (isLoggedIn && location.pathname === '/login') {

        return <Redirect to="/" />;
    }

    // useEffect(() => {
    //     UserService.getUserName().then(
    //         (response) => {
    //             setUserName(response.data);
    //             console.log("OBTENIENDO EL USER", response.data)
    //         },
    //         (error) => {
    //             const _content =
    //                 (error.response &&
    //                     error.response.data &&
    //                     error.response.data.message) ||
    //                 error.message ||
    //                 error.toString();
    //                 console.log("OBTENIENDO EL USER ERROR", _content)
    //             setUserName(_content);
    //         }
    //     );
    // }, [isLoggedIn]);

    return (
        <div className="col-md-12">
            <div className="card card-container card-login">
                {/* <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                /> */}
                <div className="logTitle">login</div>

                <Form onSubmit={handleLogin} ref={form}>
                    <div className="form-group">
                        {/* <label htmlFor="email">Email</label> */}
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
                        {/* <label htmlFor="password">Password</label> */}
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
                        <button className=" btn-block logFormButton" disabled={loading}>
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
                <span className="logTextosLink logTextosLinkRegistrat" onClick={showRegistration}>- Registra't -</span>
                <span className="logTextosLink" onClick={showPasswordRecover}>- Recupera la teva contrassenya -</span>
            </div>
        </div>
    );
};

export default Login;