import React, { useState } from "react";
import Button from "../../button/Button";
import InputField from "../InputField/InputField";
import { useDispatch } from "react-redux";
import { LogFormError } from "../Log.style";
import { validate } from "./DiscountCodeValidate";
import { passwordRecovery } from "../../../redux/actions/auth";
import { useFormik } from "formik";
import ErrorBox from "../error/ErrorBox";
import { DiscountRow } from "./DiscountCode.style";

export default function DiscountCode({ setIsSubmitted }, isSubmitted) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const handleSubmit = (value) => {
    // setLoading(true);
    // dispatch(passwordRecovery(value.password))
    //   .then(() => {
    //     setIsSubmitted(true);
    //     setLoading(false);
    //   })
    //   .catch(() => {
    //     setIsSubmitted(false);
    //     setLoading(false);
    //   });
  };

  const formik = useFormik({
    initialValues: {
      code: "",
    },
    validate,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <DiscountRow>
        <InputField
          id="code"
          name="code"
          type="code"
          placeholder="Descompte"
          className="form-control logForm"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.code}
          valid={1}
          unstyled={true}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          buttonSize="boton--medium"
          buttonStyle="boton--primary--solid"
          disabled={loading}
          hoverStyle="bg-red"
        >
          <span>Aplica</span>
        </Button>
      {formik.touched.code && formik.errors.code ? (
        <LogFormError>{formik.errors.code}</LogFormError>
      ) : null}
      </DiscountRow>
      {loading && <span className="spinner-border spinner-border-sm"></span>}
      {!isSubmitted && <ErrorBox isError={!isSubmitted} />}
    </form>
  );
}
