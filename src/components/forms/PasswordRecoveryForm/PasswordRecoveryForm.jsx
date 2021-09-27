import React, { useState } from "react";
import Button from "../../button/Button";
import InputField from "../InputField/InputField";
import { useDispatch } from "react-redux";
import { LogFormError } from "../Log.style";
import { validate } from "./PasswordRecoveryFormValidate";
import { passwordRecovery } from "../../../redux/actions/auth";
import { useFormik } from "formik";

export default function PasswordRecoveryForm({ setIsSubmitted }, strToken) {
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
          placeholder="contrasenya"
          className="form-control logForm"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          valid={true}
          unstyled={true}
        />
        {formik.touched.password && formik.errors.password ? (
          <LogFormError>{formik.errors.password}</LogFormError>
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
