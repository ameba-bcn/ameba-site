import React, { useState, useRef } from "react";
// import { required } from './FormValidator';
import { useDispatch } from "react-redux";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { sendEmailPasswordRecovery } from './../redux/actions/auth';
import CheckButton from "react-validation/build/button";
import LettersMove from './../components/layout/LettersMove';

export default function SendEmailPasswordRecovery(props) {
    const dispatch = useDispatch();
    const form = useRef();
    const checkBtn = useRef();
    const [email, setEmailname] = useState("");
    const [loading, setLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    // const dispatch = useDispatch();
    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmailname(email);
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
        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
            dispatch(sendEmailPasswordRecovery(email))
            setIsSubmitted(true);
        }
        setLoading(false);
    };

    return (
        <div className="loginWall">
            <div className="col-md-12">
                <div className="card card-container card-login">
                    <div className="logTitle">Recupera contrasenya</div>
                    {isSubmitted ?
                        <div className="msg-new-password-sent">
                            Hem enviat una contrasenya nova al teu correu electrònic. Verifícala per poder continuar.
                    </div> :
                        <Form
                            onSubmit={handleSubmit}
                            ref={form}>
                            <div className="form-group">
                                <Input
                                    type="text"
                                    className="form-control logForm"
                                    name="email"
                                    placeholder="email"
                                    value={email}
                                    onChange={onChangeEmail}
                                    validations={[required]}
                                />
                            </div>
                            {loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <div className="form-group">
                                <button className="btn-block logFormButton" disabled={loading}>
                                    <span>Recupera</span>
                                </button>
                            </div>
                            <CheckButton style={{ display: "none" }} ref={checkBtn} />
                        </Form>}
                </div>
            </div>
            <LettersMove
                className="lettersMoveDiv"
                sentence="FES-TE SOCI/A "
                color="#FAE6C5"
            />
        </div>
    )
}