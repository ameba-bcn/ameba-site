import React, { useState } from "react";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import Button from "../../button/Button";
import { validate } from "../Register/RegisterValidate";
import "../../user/AuthCard.css";
import useAuthStore from "../../../stores/useAuthStore";
import useCartStore from "../../../stores/useCartStore";

export default function RegisterForm({ setRedirect }) {
  const [t] = useTranslation("translation");
  const { cart_data = {} } = useCartStore();
  const { id = null } = cart_data;
  const register = useAuthStore((state) => state.register);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (values) => {
    const { username, email, password } = values;
    setLoading(true);

    const registerData = cart_data
      ? { username, email, password, id }
      : { username, email, password };
    register(registerData)
      .then(() => {
        setLoading(false);
        setRedirect(email);
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

  const firstError = Object.values(formik.errors)[0];

  return (
    <form className="auth-form" onSubmit={formik.handleSubmit}>
      <label className="auth-form__field">
        <span className="auth-form__label">{t("form.usuari")}</span>
        <input
          className="au-input"
          type="text"
          name="username"
          autoComplete="username"
          placeholder={t("form.usuari").toUpperCase()}
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          aria-invalid={Boolean(formik.errors.username)}
        />
      </label>

      <label className="auth-form__field">
        <span className="auth-form__label">Email</span>
        <input
          className="au-input"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="EMAIL"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          aria-invalid={Boolean(formik.errors.email)}
        />
      </label>

      <label className="auth-form__field">
        <span className="auth-form__label auth-form__label--row">
          {t("form.contrassenya")}
          <button
            type="button"
            className="auth-form__reveal"
            onClick={() => setShowPassword((value) => !value)}
          >
            {showPassword ? t("login.ocultar") : t("login.mostrar")}
          </button>
        </span>
        <input
          className="au-input"
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="PASSWORD"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          aria-invalid={Boolean(formik.errors.password)}
        />
        <span className="auth-form__hint">{t("login.password-hint")}</span>
      </label>

      <div className="auth-form__message auth-form__message--error">
        {firstError}
      </div>

      <Button
        type="submit"
        className=""
        buttonStyle="boton--back-orange--solid"
        buttonSize="boton--megaxxl"
        hoverStyle="bg-cream"
        loading={loading}
      >
        {t("login.registrat")}
      </Button>
    </form>
  );
}
