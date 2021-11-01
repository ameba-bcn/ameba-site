import React, { useState } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import {
  login,
  getUserData,
  getMemberProfile,
} from "../../../redux/actions/auth";
import { getCart } from "../../../redux/actions/cart";
import InputField from "../InputField/InputField";
import { validate } from "../Login/LoginValidate";
import { LogFormBox, LogFormError } from "../Log.style";
import Button from "../../button/Button";
import { isEmptyObject } from "../../../utils/utils";

export default function LoginForm({ setRedirect, setDisplayError }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleSubmitLogin = (values) => {
    setLoading(true);
    dispatch(login(values.email, values.password))
      .then(() => {
        dispatch(getUserData());
        dispatch(getMemberProfile());
        dispatch(getCart()).then(() => {
          setRedirect(true);
        });
        setLoading(false);
      })
      .catch(() => {
        setDisplayError(true);
        setLoading(false);
      });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      handleSubmitLogin(values);
    },
  });

  return (
    <LogFormBox>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <InputField
            id="emailLogin"
            name="email"
            type="email"
            placeholder="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            valid={true}
          />
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
          color="primary"
          buttonSize="boton--medium"
          buttonStyle="boton--primary--solid"
          hoverStyle="bg-cream"
        >
          login
        </Button>
        {loading && <span className="spinner-border spinner-border-sm"></span>}
      </form>
    </LogFormBox>
  );
}