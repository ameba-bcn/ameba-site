import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { subscribeNewsletter } from "../../../redux/actions/profile";
import Button from "../../button/Button";
import InputField from "../InputField/InputField";
import { LogFormError } from "../Log.style";
import { validate } from "../NewsletterForm/NewletterFormValidate";

export default function NewsletterForm({ setIsSubmitted }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (value) => {
    setLoading(true);
    dispatch(subscribeNewsletter(value.email))
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
      email: "",
    },
    validate,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  return (
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
        {formik.touched.email && formik.errors.email ? (
          <LogFormError>{formik.errors.email}</LogFormError>
        ) : null}
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

      {loading && <span className="spinner-border spinner-border-sm"></span>}
    </form>
  );
}
