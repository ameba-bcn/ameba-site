import React, { useState, useRef } from 'react'
import { useDispatch } from "react-redux";
import { passwordRecovery } from './../redux/actions/auth';
import { NavLink } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import LettersMove from './../components/layout/LettersMove';

export default function PasswordRecovery(props) {
    const dispatch = useDispatch();
    const form1 = useRef();
    const checkBtn1 = useRef();
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");

    const [isSubmitted, setIsSubmitted] = React.useState(false);
    const queryString = require('query-string');
    const parsed = queryString.parse(props.location.search);
    const strToken = parsed.token

    const onChangePasword = (e) => {
        const password = e.target.value;
        setPassword(password);
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

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // form1.current.validateAll();
        if (checkBtn1.current.context._errors.length === 0) {
            dispatch(passwordRecovery(strToken, password)).then(
                (response) => {
                    console.log(response.data)
                }).catch(error => console.log("passwordRecovery: ", error))
            setLoading(false)
            setIsSubmitted(true)
            // Pendiente handlear la respuesta si es ok o si falla

        } else {
            setLoading(false);
        }
    };

    return (
        <div className="loginWall">
            <div className="col-md-12">
                <div className="card card-container card-login">
                    <div className="logTitle">Recupera contrasenya</div>
                    {isSubmitted ?
                        <>
                            <div className="full-height-msg"><div className="single-msg">Recuperació de contrasenya finalitzada</div></div></> :
                        <>
                            <Form
                                onSubmit={handleSubmit}
                                ref={form1}>
                                <div className="form-group">
                                    <Input
                                        type="password"
                                        className="form-control logForm"
                                        name="password"
                                        placeholder="contrasenya"
                                        value={password}
                                        onChange={onChangePasword}
                                        validations={[required]}
                                    />
                                </div>
                                <div className="form-group">
                                    <button className="btn-block logFormButton" disabled={loading}>
                                        {loading && (
                                            <span className="spinner-border spinner-border-sm"></span>
                                        )}
                                        <span>Envia</span>
                                    </button>
                                </div>
                                <CheckButton style={{ display: "none" }} ref={checkBtn1} />
                            </Form>
                            <span className="logTextosLink"><NavLink to="/send-recovery" >- No has rebut cap correu? Torna-ho a intentar -</NavLink></span>
                        </>
                    }
                </div >
            </div>
            <LettersMove
                className="lettersMoveDiv"
                sentence="FES-TE SOCI/A "
                color="#FAE6C5"
            />
        </div>
    )
}