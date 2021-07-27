import React, { useState, useRef } from "react";
// import { required } from './FormValidator';
import { useDispatch, connect } from "react-redux";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import "./../../contacte/Contacte.css";
import { subscribeNewsletter } from "./../../redux/actions/profile";
import Button from "../button/Button";

const mapStateToProps = (state) => {
  return {
    message: state.message.message,
  };
};

function NewsletterForm(props) {
  const dispatch = useDispatch();
  const form = useRef();
  const checkBtn = useRef();
  const [email, setEmailname] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { message = "" } = props;
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
      dispatch(subscribeNewsletter(email));
      setIsSubmitted(true);
    }
    setLoading(false);
  };

  return (
    <div className="formNewsGlobal">
      <div className="formLabelNews">newsletter</div>
      {isSubmitted ? (
        message && <div className="msg-new-password-sent">{message}</div>
      ) : (
        <>
          <Form className="contactNews" onSubmit={handleSubmit} ref={form}>
            <div className="form-group-input">
              <Input
                type="text"
                className="form-control formControlNews"
                name="email"
                placeholder="email"
                value={email}
                onChange={onChangeEmail}
                validations={[required]}
              />
            </div>
            <div className="form-group-button">
              <Button
                variant="contained"
                color="primary"
                buttonSize="boton--megaxxl"
                buttonStyle="boton--orange--solid"
                disabled={loading}
              >
                Subscriu-te
              </Button>
            </div>
            {loading && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
            <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </Form>
        </>
      )}
    </div>
  );
}

export default connect(mapStateToProps)(NewsletterForm);
