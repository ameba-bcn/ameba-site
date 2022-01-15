import React, { useState } from "react";
import Button from "../../button/Button";
import InputField from "../InputField/InputField";
import { useDispatch } from "react-redux";
import { LogFormError } from "../Log.style";
import { validate } from "./PasswordRecoveryFormValidate";
import { passwordRecovery } from "../../../redux/actions/auth";
import { useFormik } from "formik";
import ErrorBox from "../error/ErrorBox";
import { isEmptyObject } from "../../../utils/utils";
import { useTranslation } from "react-i18next";

export default function PasswordRecoveryForm(props) {
  const { isSubmitted, strToken } = props;
  const [t] = useTranslation("translation");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleSubmit = (value) => {
    setLoading(true);
    dispatch(passwordRecovery(strToken, value.password))
      .then(() => {
        props.setIsSubmitted(true);
        setLoading(false);
        setIsClicked(false);
      })
      .catch(() => {
        setIsClicked(true);
        props.setIsSubmitted(false);
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
    <form onSubmit={formik.handleSubmit}>
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
        >
          {loading ? (
            <span className="spinner-border"></span>
          ) : (
            <span>Recupera</span>
          )}
        </Button>
      </div>
      {!props.isSubmitted && isClicked && <ErrorBox isError={!isSubmitted} />}
    </form>
  );
}
