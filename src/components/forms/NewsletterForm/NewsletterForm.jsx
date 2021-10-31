import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { subscribeNewsletter } from "../../../redux/actions/profile";
import { isEmptyObject } from "../../../utils/utils";
import Button from "../../button/Button";
import ErrorBox from "../error/ErrorBox";
import InputField from "../InputField/InputField";
import { LogFormError } from "../Log.style";
import { validate } from "../NewsletterForm/NewletterFormValidate";

export default function NewsletterForm({ setIsSubmitted }, isSubmitted) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = (value) => {
    setLoading(true);
    dispatch(subscribeNewsletter(value.email))
      .then(() => {
        setLoading(false);
        setIsSubmitted(true);
      })
      .catch(() => {
        setLoading(false);
        setIsSubmitted(false);
      });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <>
      <form className="contactNews" onSubmit={formik.handleSubmit}>
        <div className="form-group-input">
          <InputField
            id="emailNewletter"
            name="email"
            type="text"
            placeholder="email"
            className="form-control formControlNews"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            valid={1}
            unstyled={true}
          />
        </div>
        <div className="form-group-button">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            buttonSize="boton--megaxxl"
            buttonStyle="boton--orange--solid"
            disabled={loading}
          >
            Subscriu-te
          </Button>
        </div>
        {!isSubmitted && <ErrorBox isError={!isSubmitted} />}
      </form>
      {loading && <span className="spinner-border spinner-border-sm"></span>}
      {!isEmptyObject(formik.errors) && (
        <LogFormError>
          {Object.values(formik.errors).map((x) => {
            return <div key={x}>{x}</div>;
          })}
        </LogFormError>
      )}
    </>
  );
}
