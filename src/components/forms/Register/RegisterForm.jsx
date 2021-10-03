import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../button/Button";
import InputField from "../InputField/InputField";
import { validate } from "../Register/RegisterValidate";
import { LogFormBox, LogFormError } from "../Log.style";
import { register } from "../../../redux/actions/auth";

export default function RegisterForm({ setRedirect, setDisplayError }) {
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
        setDisplayError(true);
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
    onSubmit: (values) => {
      handleRegister(values);
    },
  });

  return (
    <LogFormBox>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <InputField
            id="username"
            name="username"
            type="text"
            placeholder="usuari"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            valid={true}
          />
          {formik.touched.username && formik.errors.username ? (
            <LogFormError>{formik.errors.username}</LogFormError>
          ) : null}
        </div>
        <div>
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
          {formik.touched.email && formik.errors.email ? (
            <LogFormError>{formik.errors.email}</LogFormError>
          ) : null}
        </div>
        <div>
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
          {formik.touched.password && formik.errors.password ? (
            <LogFormError>{formik.errors.password}</LogFormError>
          ) : null}
        </div>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          buttonSize="boton--medium"
          buttonStyle="boton--primary--solid"
          hoverStyle="bg-cream"
        >
          registra't
        </Button>
        {loading && <span className="spinner-border spinner-border-sm"></span>}
      </form>
    </LogFormBox>
  );
}
