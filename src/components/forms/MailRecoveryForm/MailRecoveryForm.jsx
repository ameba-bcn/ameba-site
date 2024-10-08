import React, { useState } from "react";
import Button from "../../button/Button";
import InputField from "../InputField/InputField";
import { useDispatch } from "react-redux";
import { LogFormError } from "../Log.style";
import { validate } from "./../NewsletterForm/NewletterFormValidate";
import { sendEmailPasswordRecovery } from "../../../store/actions/auth";
import { useFormik } from "formik";
import { isEmptyObject } from "../../../utils/utils";

export default function MailRecoveryForm({ setIsSubmitted }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    setLoading(true);
    dispatch(sendEmailPasswordRecovery(e.email))
      .then(() => {
        setIsSubmitted(true);
        setLoading(false);
      })
      .catch(() => {
        setIsSubmitted(false);
        setLoading(false);
      });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className="recovery-form">
      <div className="form-group">
        <InputField
          id="emailMailRecover"
          name="email"
          type="email"
          placeholder="email"
          className="form-button logForm logFormEmailPasswordRecovery"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          valid={!formik.errors.email}
          unstyled={true}
        />
      </div>
      {!isEmptyObject(formik.errors) && (
        <LogFormError>
          {Object.values(formik.errors).map((x) => {
            return <div key={x}>{x}</div>;
          })}
        </LogFormError>
      )}
      <div className="form-group">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          buttonSize="boton--medium"
          buttonStyle="boton--primary--solid"
          hoverStyle="bg-cream"
          disabled={loading}
          className="form-button"
          loading={loading}
        >
          <span>Recupera</span>
        </Button>
      </div>
    </form>
  );
}
