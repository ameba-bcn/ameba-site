import React, { useState } from "react";
import Button from "../../button/Button";
import InputField from "../InputField/InputField";
import "../Log.style.css";
import { validate } from "./DiscountCodeValidate";
import { useFormik } from "formik";
import "./DiscountCode.style.css";
import notificationToast, { isEmptyObject } from "../../../utils/utils";
import { useTranslation } from "react-i18next";
import useCartStore from "../../../stores/useCartStore";

export default function DiscountCode() {
  const [t] = useTranslation("translation");
  const { cart_data = {}, applyDiscount } = useCartStore();
  const { item_variant_ids = [] } = cart_data;
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      code: "",
    },
    enableReinitialize: true,
    validate,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      handleSubmitDiscount(values);
    },
  });
  const handleSubmitDiscount = (value) => {
    setLoading(true);
    applyDiscount(item_variant_ids, value.code)
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.warn("ERROR: ", err);
        setLoading(false);
        notificationToast("", err?.message || t("errors.descompte"), "error");
      });
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="discount-code__row">
        <InputField
          id="code"
          name="code"
          type="text"
          placeholder={t("form.descompte")}
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
          loading={loading}
        >
          <span>Aplica</span>
        </Button>
        {!isEmptyObject(formik.errors) && (
          <div className="log-form-error">
            {Object.values(formik.errors).map((x) => {
              return <div key={x}>{x}</div>;
            })}
          </div>
        )}
      </div>
    </form>
  );
}
