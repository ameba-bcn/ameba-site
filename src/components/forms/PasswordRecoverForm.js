import React, { useState, useRef } from "react";
import { required } from './FormValidator';
// import { useDispatch } from "react-redux";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";


export default function PasswordRecoverForm() {
    const form = useRef();
    const checkBtn = useRef();
    const [email, setEmailname] = useState("");
    const [loading, setLoading] = useState(false);
    // const dispatch = useDispatch();
    const onChangeUsername = (e) => {
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
            // dispatch(login(email, password))
            //     .then(() => {
                    setLoading(false);
                // });
        } else {
            setLoading(false);
        }
    };

    return (
        <div className="col-md-12">
            <div className="card card-container card-login">
                <div className="logTitle">Recupera contrasenya</div>
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
                            onChange={onChangeUsername}
                            validations={[required]}
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn-block logFormButton" disabled={loading}>
                            {loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Recupera</span>
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    )
}