import React, { useState } from "react";
import Button from "../../button/Button";
import InputField from "../InputField/InputField";
import { useDispatch } from "react-redux";
import { LogFormError } from "../Log.style";
import { validate } from "./../NewsletterForm/NewletterFormValidate";
import { sendEmailPasswordRecovery } from "../../../redux/actions/auth";
import { useFormik } from "formik";

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
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="form-group">
        <InputField
          id="emailMailRecover"
          name="email"
          type="email"
          placeholder="email"
          className="form-control logForm logFormEmailPasswordRecovery"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          valid={1}
          unstyled={true}
        />
        {formik.touched.email && formik.errors.email ? (
          <LogFormError>{formik.errors.email}</LogFormError>
        ) : null}
      </div>
      <div className="form-group">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          buttonSize="boton--medium"
          buttonStyle="boton--primary--solid"
          disabled={loading}
        >
          {loading && (
            <span className="spinner-border spinner-border-sm"></span>
          )}
          <span>Recupera</span>
        </Button>
      </div>

      {loading && <span className="spinner-border spinner-border-sm"></span>}
    </form>
  );
}
