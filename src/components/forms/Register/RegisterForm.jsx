import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../button/Button";
import InputField from "../InputField/InputField";
import { validate } from "../Register/RegisterValidate";
import { LogFormBox, LogFormError } from "../Log.style";
import { register } from "../../../store/actions/auth";
import { isEmptyObject } from "../../../utils/utils";
import { useTranslation } from "react-i18next";

export default function RegisterForm({ setRedirect }) {
  const [t] = useTranslation("translation");
  const { cart_data = {} } = useSelector((state) => state.cart);
  const { id = null } = cart_data;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleRegister = (values) => {
    const { username, email, password } = values;
    setLoading(true);

    const registerData = cart_data
      ? { username, email, password, id }
      : { username, email, password };
    dispatch(register(registerData))
      .then(() => {
        setLoading(false);
        setRedirect(true);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validate,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      handleRegister(values);
    },
  });

  return (
    <LogFormBox>
      <form onSubmit={formik.handleSubmit}>
        <div className="field-wrapper">
          <InputField
            id="username"
            name="username"
            type="text"
            placeholder={t("form.usuari")}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            valid={true}
          />
        </div>
        <div className="field-wrapper">
          <InputField
            id="emailRegister"
            name="email"
            type="text"
            placeholder="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            valid={true}
          />
        </div>
        <div className="field-wrapper">
          <InputField
            id="password"
            name="password"
            type="password"
            placeholder="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            valid={true}
          />
        </div>
        {!isEmptyObject(formik.errors) && (
          <LogFormError>
            {Object.values(formik.errors).map((x) => {
              return <div key={x}>{x}</div>;
            })}
          </LogFormError>
        )}
        <Button
          type="submit"
          variant="contained"
          className="submit"
          color="primary"
          buttonSize="boton--medium"
          buttonStyle="boton--primary--solid"
          hoverStyle="bg-cream"
          loading={loading}
        >
          <>{t("login.registrat")}</>
        </Button>
      </form>
    </LogFormBox>
  );
}
