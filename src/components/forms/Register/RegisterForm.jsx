import { useFormik } from "formik";
import React, { useState } from "react";
import Button from "../../button/Button";
import InputField from "../InputField/InputField";
import { validate } from "../Register/RegisterValidate";
import "../Log.style.css";
import useAuthStore from "../../../stores/useAuthStore";
import { isEmptyObject } from "../../../utils/utils";
import { useTranslation } from "react-i18next";
import useCartStore from "../../../stores/useCartStore";

export default function RegisterForm({ setRedirect }) {
  const [t] = useTranslation("translation");
  const { cart_data = {} } = useCartStore();
  const { id = null } = cart_data;
  const register = useAuthStore((state) => state.register);
  const [loading, setLoading] = useState(false);

  const handleRegister = (values) => {
    const { username, email, password } = values;
    setLoading(true);

    const registerData = cart_data
      ? { username, email, password, id }
      : { username, email, password };
    register(registerData)
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
    <div className="log-form-box">
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
          <div className="log-form-error">
            {Object.values(formik.errors).map((x) => {
              return <div key={x}>{x}</div>;
            })}
          </div>
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
    </div>
  );
}
