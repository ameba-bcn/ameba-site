import React, { useState } from "react";
import Button from "../../button/Button";
import InputField from "../InputField/InputField";
import { useDispatch } from "react-redux";
import { LogFormError } from "../Log.style";
import { validate } from "./PasswordRecoveryFormValidate";
import { passwordRecovery } from "../../../redux/actions/auth";
import { useFormik } from "formik";
import { isEmptyObject } from "../../../utils/utils";
import { useTranslation } from "react-i18next";

export default function PasswordRecoveryForm(props) {
  const { strToken, setIsSubmitted } = props;
  const [t] = useTranslation("translation");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (value) => {
    setLoading(true);
    dispatch(passwordRecovery(strToken, value.password))
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
      password: "",
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
          id="password"
          name="password"
          type="password"
          placeholder={t("form.contrassenya")}
          className="form-control logForm"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          valid={1}
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
          disabled={loading}
          hoverStyle="bg-cream"
          className="form-button"
        >
          {loading ? (
            <span className="spinner-border"></span>
          ) : (
            <span>Recupera</span>
          )}
        </Button>
      </div>
    </form>
  );
}
