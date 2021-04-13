import React, { useState, useRef } from "react";
import { Redirect } from 'react-router-dom';
import { required, vusername, vpassword, validEmail } from './FormValidator';
import { useDispatch, useSelector } from "react-redux";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AddIcon from '@material-ui/icons/Add';
import { register } from '../../redux/actions/auth';
import SociDialog from '../../components/botiga/Soci';



const RegisterForm = (props) => {
    const form = useRef();
    const checkBtn = useRef();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [open, setOpen] = React.useState(false);

    const { message } = useSelector(state => state.message);
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

    const handleSubmit = (e) => {
        e.preventDefault();

        setSuccessful(false);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            dispatch(register(username, email, password))
                .then(() => {
                    setSuccessful(true);
                })
                .catch(() => {
                    setSuccessful(false);
                });
        }
    };

    const showLogin = () => {
        props.setViewState("login")
    }

    if (successful) return <Redirect to='/validate-email' />

    return (
        <div className="col-md-12">
            <div className="card card-container card-login">
                <div className="logTitle">registra't</div>
                <div className="sociLogBanner" onClick={handleClick}>encara no ets soci/a? Informa't aquí!<AddIcon className="sociLogBannerPlus" /></div>

                <Form onSubmit={handleSubmit} ref={form}>
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
                                <button className="btn-block logFormButton">Registra't</button>
                            </div>
                        </div>
                    )}

                    {message && (
                        <div className="form-group">
                            <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </Form>
                <span className="logTextosLink" onClick={showLogin}>- Ja estàs registrat? Inicia sessió -</span>
                <SociDialog open={open}
                    onClose={handleClick} />
            </div>
        </div>
    );
};

export default RegisterForm;