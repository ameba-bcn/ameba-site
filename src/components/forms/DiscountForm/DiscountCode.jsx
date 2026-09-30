import React, { useState } from "react";
import Button from "../../button/Button";
import { validate } from "./DiscountCodeValidate";
import { useFormik } from "formik";
import "../Log.style.css";
import "./DiscountCode.style.css";
import notificationToast, { isEmptyObject } from "../../../utils/utils";
import { useTranslation } from "react-i18next";
import useCartStore from "../../../stores/useCartStore";

export default function DiscountCode() {
  const [t] = useTranslation("translation");
  const { cart_data = {}, applyDiscount } = useCartStore();
  const { item_variant_ids = [], item_variants = [] } = cart_data;
  const [loading, setLoading] = useState(false);
  const [applied, setApplied] = useState(null);

  const formik = useFormik({
    initialValues: {
      code: "",
    },
    validate,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      handleSubmitDiscount(values);
    },
  });

  const handleSubmitDiscount = (value) => {
    setLoading(true);
    setApplied(null);
    applyDiscount(item_variant_ids, value.code)
      .then((data) => {
        setLoading(false);
        const discounted = (data?.item_variants || item_variants).find(
          (item) => item.discount_name || item.discount_value,
        );
        if (discounted) {
          setApplied({
            code: discounted.discount_name || value.code,
            value: discounted.discount_value,
          });
        }
      })
      .catch((err) => {
        console.warn("ERROR: ", err);
        setLoading(false);
        notificationToast("", err?.message || t("errors.descompte"), "error");
      });
  };

  return (
    <form className="discount-code" onSubmit={formik.handleSubmit}>
      <div className="discount-code__row">
        <input
          id="code"
          name="code"
          type="text"
          className="ck-input discount-code__input"
          placeholder={t("form.descompte")}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.code}
        />
        <Button
          type="submit"
          className=""
          buttonSize="boton--medium"
          buttonStyle="boton--primary--outline"
          disabled={loading}
          loading={loading}
        >
          {t("boto.aplica")}
        </Button>
      </div>
      {!isEmptyObject(formik.errors) && (
        <div className="log-form-error">
          {Object.values(formik.errors).map((x) => (
            <div key={x}>{x}</div>
          ))}
        </div>
      )}
      {applied?.value ? (
        <div className="discount-code__confirmation">
          {t("checkout.codigo-aplicado", {
            code: applied.code,
            value: applied.value,
          })}
        </div>
      ) : null}
    </form>
  );
}
