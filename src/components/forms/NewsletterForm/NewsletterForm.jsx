import { useFormik } from "formik";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { subscribeNewsletter } from "../../../redux/actions/profile";
import notificationToast, { isEmptyObject } from "../../../utils/utils";
import Button from "../../button/Button";
import InputField from "../InputField/InputField";
import { LogFormError } from "../Log.style";
import { validate } from "../NewsletterForm/NewletterFormValidate";

export default function NewsletterForm({ setIsSubmitted }) {
  const [t] = useTranslation("translation");
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
        notificationToast("", "error");
      });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate,
    validateOnChange: false,
    validateOnBlur: false,
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
            {loading ? (
              <span className="spinner-border"></span>
            ) : (
              <>{t("newsletter.subscriute")}</>
            )}
          </Button>
        </div>
      </form>
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
