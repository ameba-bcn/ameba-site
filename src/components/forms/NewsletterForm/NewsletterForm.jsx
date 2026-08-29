import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import notificationToast, { isEmptyObject } from "../../../utils/utils";
import Button from "../../button/Button";
import InputField from "../InputField/InputField";
import "../Log.style.css";
import { validate } from "../NewsletterForm/NewletterFormValidate";
import useProfileStore from "../../../stores/useProfileStore";
import { gsap, prefersReducedMotion } from "../../../utils/gsapSetup";

export default function NewsletterForm({ setIsSubmitted }) {
  const [t] = useTranslation("translation");
  const [loading, setLoading] = useState(false);
  const subscribeNewsletter = useProfileStore((state) => state.subscribeNewsletter);
  const underlineRef = useRef(null);
  const errorRef = useRef(null);
  const hadErrors = useRef(false);

  const handleSubmit = (value) => {
    setLoading(true);
    subscribeNewsletter(value.email)
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

  // 6.3 — error shake, the one exception to "no bounces" in the whole doc.
  useEffect(() => {
    const hasErrors = !isEmptyObject(formik.errors);
    if (hasErrors && !hadErrors.current && !prefersReducedMotion() && errorRef.current) {
      gsap.fromTo(
        errorRef.current,
        { x: -4 },
        { x: 4, duration: 0.06, repeat: 4, yoyo: true, clearProps: "x" },
      );
    }
    hadErrors.current = hasErrors;
  }, [formik.errors]);

  const focusUnderline = () => {
    if (prefersReducedMotion()) return;
    gsap.to(underlineRef.current, { scaleX: 1, duration: 0.3 });
  };
  const blurUnderline = () => {
    if (prefersReducedMotion()) return;
    gsap.to(underlineRef.current, { scaleX: 0, duration: 0.2 });
  };

  return (
    <>
      <form className="contactNews" onSubmit={formik.handleSubmit}>
        <div className="form-group-input newsletter-form__input-group">
          <InputField
            id="emailNewletter"
            name="email"
            type="text"
            placeholder="email"
            className="form-control formControlNews"
            onChange={formik.handleChange}
            onFocus={focusUnderline}
            onBlur={(e) => {
              formik.handleBlur(e);
              blurUnderline();
            }}
            value={formik.values.email}
            valid={1}
            unstyled={true}
            autoComplete="on"
          />
          <span className="newsletter-form__underline" ref={underlineRef} aria-hidden="true" />
        </div>
        <div className="form-group-button">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            buttonSize="boton--megaxxl"
            buttonStyle="boton--orange--solid"
            disabled={loading}
            loading={loading}
          >
            <>{t("newsletter.subscriute")}</>
          </Button>
        </div>
      </form>
      {!isEmptyObject(formik.errors) && (
        <div className="log-form-error" ref={errorRef}>
          {Object.values(formik.errors).map((x) => {
            return <div key={x}>{x}</div>;
          })}
        </div>
      )}
    </>
  );
}
