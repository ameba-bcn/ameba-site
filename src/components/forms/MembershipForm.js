import React, { useState, useRef } from "react";
// import { required, vusername, vpassword, validEmail, vdninie, vphone } from './FormValidator';
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { register } from '../../redux/actions/auth';
import { checkoutCart, addToCart } from '../../redux/actions/cart';

const MembershipForm = ({ isSubmitted }) => {
    const form = useRef();
    const checkBtn = useRef();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [usernameReal, setUsernameReal] = useState("");
    const [surnameReal, setSurnameReal] = useState("");
    const [dni, setDni] = useState("");
    const [birth, setBirth] = useState("");
    const [phone, setPhone] = useState("");
    const [successful, setSuccessful] = useState(false);

    const { message } = useSelector(state => state.message);
    const dispatch = useDispatch();


    const handleSubmit = (e) => {
        e.preventDefault();

        // form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            dispatch(register(username, email, password))
                .then(() => {
                    setSuccessful(true);
                    localStorage.setItem("view", "new_member");
                })
                .catch(() => {
                    setSuccessful(false);
                });
        }

    };

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

    const vdninie = (value) => {
        var nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]$/i;
        var nieRexp = /^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]$/i
        const str = value.toUpperCase();
        if (!nifRexp.test(str) && !nieRexp.test(str)) {
            return (
                <div className="alert alert-danger" role="alert">
                    Número incorrecte
                </div>
            );
        }
    };

    const vphone = (value) => {
        var phoneRexp = /^(\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}/i;
        const str = value.toString();
        if (!phoneRexp.test(str)) {
            return (
                <div className="alert alert-danger" role="alert">
                    Número incorrecte
                </div>
            );
        }
    };

    if (successful) {
        isSubmitted(true)
        if (successful) return <Redirect to='/validate-email' />
    }

    return (
        <div className="col-md-12">
            <div className="card card-container card-login">
                {/* <div className="logTitle">Fes-te soci</div> */}

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
                                    onChange={(e) => setUsername(e.target.value)}
                                    validations={[required, vusername]}
                                />
                            </div>

                            {/* <div className="form-group">
                                <Input
                                    type="text"
                                    className="form-control logForm"
                                    name="username_real"
                                    placeholder="nom"
                                    value={usernameReal}
                                    onChange={(e) => setUsernameReal(e.target.value)}
                                    validations={[required]}
                                />
                            </div>

                            <div className="form-group">
                                <Input
                                    type="text"
                                    className="form-control logForm"
                                    name="surname"
                                    placeholder="Cognoms"
                                    value={surnameReal}
                                    onChange={(e) => setSurnameReal(e.target.value)}
                                    validations={[required]}
                                />
                            </div>

                            <div className="form-group">
                                <Input
                                    type="text"
                                    className="form-control logForm"
                                    name="dni"
                                    placeholder="DNI/NIE"
                                    value={dni}
                                    onChange={(e) => setDni(e.target.value)}
                                    validations={[required, vdninie]}
                                />
                            </div>

                            <div className="form-group">
                                <Input
                                    type="text"
                                    className="form-control logForm"
                                    name="birthDate"
                                    placeholder="Data de naixement"
                                    value={birth}
                                    onChange={(e) => setBirth(e.target.value)}
                                    validations={[required]}
                                />
                            </div>

                            <div className="form-group">
                                <Input
                                    type="text"
                                    className="form-control logForm"
                                    name="phone"
                                    placeholder="Telèfon"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    validations={[required, vphone]}
                                />
                            </div> */}

                            <div className="form-group">
                                <Input
                                    type="text"
                                    className="form-control logForm"
                                    name="email"
                                    placeholder="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                                    onChange={(e) => setPassword(e.target.value)}
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
            </div>
        </div>
    );
};

export default MembershipForm;