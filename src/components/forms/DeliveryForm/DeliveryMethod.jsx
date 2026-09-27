import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import useCartStore from "../../../stores/useCartStore";
import Button from "../../button/Button";
import InputField from "../InputField/InputField";
import { validate } from "./DeliveryMethodValidate";
import { hasArticlesCheckout, isEmptyObject } from "../../../utils/utils";
import "../Log.style.css";
import "./DeliveryMethod.style.css";

export const PICKUP_LOCATIONS = [
  {
    value: "trama",
    label:
      "Trama Serigrafia — Carrer de Conca, 13-15, Sant Martí, 08026 Barcelona",
  },
  {
    value: "merla",
    label:
      "La Merla (botiga) — Carrer de Sants, 1, Sants-Montjuïc, 08014 Barcelona",
  },
];

export default function DeliveryMethod() {
  const [t] = useTranslation("translation");
  const { cart_data = {}, setDeliveryMethod } = useCartStore();
  const {
    item_variants = [],
    delivery_method = "",
    pickup_location = "",
    shipping_name = "",
    shipping_address = "",
    shipping_postal_code = "",
    shipping_city = "",
  } = cart_data;

  const [method, setMethod] = useState(delivery_method || "pickup");
  const [pickup, setPickup] = useState(pickup_location || "trama");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  // Keep local selection in sync once the cart round-trips from the API
  // (e.g. after the initial auto-save below, or on step re-entry).
  useEffect(() => {
    if (delivery_method) setMethod(delivery_method);
    if (pickup_location) setPickup(pickup_location);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delivery_method, pickup_location]);

  const formik = useFormik({
    initialValues: {
      shipping_name,
      shipping_address,
      shipping_postal_code,
      shipping_city,
    },
    enableReinitialize: true,
    validate,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      setLoading(true);
      setSaved(false);
      setDeliveryMethod({ delivery_method: "shipping", ...values })
        .then(() => {
          setLoading(false);
          setSaved(true);
        })
        .catch(() => setLoading(false));
    },
  });

  const selectPickup = (location) => {
    setPickup(location);
    setMethod("pickup");
    setLoading(true);
    setDeliveryMethod({ delivery_method: "pickup", pickup_location: location })
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  };

  // Sensible default: pickup at the first location, saved automatically so
  // "ir al pago" doesn't fail on a choice nobody had to actively make.
  useEffect(() => {
    if (!delivery_method && hasArticlesCheckout(item_variants)) {
      selectPickup(pickup);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMethodChange = (value) => {
    setSaved(false);
    if (value === "pickup") {
      selectPickup(pickup);
    } else {
      setMethod(value);
    }
  };

  if (!hasArticlesCheckout(item_variants)) return null;

  return (
    <div className="delivery-method">
      <span className="delivery-method__title">
        {t("checkout.metode-entrega")}
      </span>

      <div className="delivery-method__options">
        <label className="delivery-method__option">
          <input
            type="radio"
            name="delivery_method"
            checked={method === "pickup"}
            onChange={() => handleMethodChange("pickup")}
          />
          <span>
            {t("checkout.recogida")} — {t("checkout.gratis")}
          </span>
        </label>
        <label className="delivery-method__option">
          <input
            type="radio"
            name="delivery_method"
            checked={method === "shipping"}
            onChange={() => handleMethodChange("shipping")}
          />
          <span>{t("checkout.enviament")} — +7,00 €</span>
        </label>
      </div>

      {method === "pickup" && (
        <div className="delivery-method__pickup">
          {PICKUP_LOCATIONS.map((location) => (
            <label className="delivery-method__pickup-option" key={location.value}>
              <input
                type="radio"
                name="pickup_location"
                checked={pickup === location.value}
                onChange={() => selectPickup(location.value)}
              />
              <span>{location.label}</span>
            </label>
          ))}
        </div>
      )}

      {method === "shipping" && (
        <form
          className="delivery-method__shipping"
          onSubmit={formik.handleSubmit}
        >
          <p className="delivery-method__shipping-note">
            {t("checkout.enviament-nota")}
          </p>
          <div className="field-wrapper">
            <InputField
              id="shipping_name"
              name="shipping_name"
              type="text"
              label={t("form.nom")}
              onChange={formik.handleChange}
              value={formik.values.shipping_name}
              valid={!formik.errors.shipping_name}
            />
          </div>
          <div className="field-wrapper">
            <InputField
              id="shipping_address"
              name="shipping_address"
              type="text"
              label={t("checkout.adreca")}
              onChange={formik.handleChange}
              value={formik.values.shipping_address}
              valid={!formik.errors.shipping_address}
            />
          </div>
          <div className="field-wrapper">
            <InputField
              id="shipping_postal_code"
              name="shipping_postal_code"
              type="text"
              label={t("checkout.codi-postal")}
              onChange={formik.handleChange}
              value={formik.values.shipping_postal_code}
              valid={!formik.errors.shipping_postal_code}
            />
          </div>
          <div className="field-wrapper">
            <InputField
              id="shipping_city"
              name="shipping_city"
              type="text"
              label={t("checkout.ciutat")}
              onChange={formik.handleChange}
              value={formik.values.shipping_city}
              valid={!formik.errors.shipping_city}
            />
          </div>

          {!isEmptyObject(formik.errors) && (
            <div className="log-form-error">
              {Object.values(formik.errors).map((x) => (
                <div key={x}>{x}</div>
              ))}
            </div>
          )}

          <Button
            type="submit"
            buttonSize="boton--medium"
            buttonStyle="boton--primary--outline"
            disabled={loading}
            loading={loading}
          >
            {t("checkout.guardar-adreca")}
          </Button>

          {saved && (
            <div className="delivery-method__confirmation">
              {t("checkout.adreca-guardada")}
            </div>
          )}
        </form>
      )}
    </div>
  );
}
