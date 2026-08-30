import React, { useState } from "react";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import useAuthStore from "../../../stores/useAuthStore";
import useCartStore from "../../../stores/useCartStore";
import { validate } from "../Login/LoginValidate";
import Button from "../../button/Button";
import "../../user/AuthCard.css";

export default function LoginForm({ setRedirect }) {
  const [t] = useTranslation("translation");
  const login = useAuthStore((state) => state.login);
  const getCart = useCartStore((state) => state.getCart);
  const getUserData = useAuthStore((state) => state.getUserData);
  const getMemberProfile = useAuthStore((state) => state.getMemberProfile);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmitLogin = (values) => {
    setLoading(true);
    login(values.email, values.password)
      .then(() => {
        getUserData().then((data) => {
          if (data?.member) {
            getMemberProfile();
          }
        });
        getCart().then(() => {
          setRedirect(true);
        });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      handleSubmitLogin(values);
    },
  });

  const firstError = Object.values(formik.errors)[0];

  return (
    <form className="auth-form" onSubmit={formik.handleSubmit}>
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
        {t("login.login")}
      </Button>
    </form>
  );
}
