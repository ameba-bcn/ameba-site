import React from "react";
import { useTranslation } from "react-i18next";
import InputField from "../InputField/InputField";
import { postalCodeZone } from "../../../utils/validations";

// Fields mirror what the backend's Cart/Order actually persist
// (shipping_name/address/postal_code/city). No phone or address-line-2
// field exists server-side yet, so this intentionally drops those two
// fields from the original design brief rather than collecting data that
// would be silently discarded on save.
export default function AddressForm({ formik, onSwitchToPickup }) {
  const [t] = useTranslation("translation");

  const fieldError = (name) =>
    formik.touched[name] && formik.errors[name] ? formik.errors[name] : null;

  const zone = postalCodeZone(formik.values.shipping_postal_code);
  const showZoneHelp =
    formik.touched.shipping_postal_code && !!fieldError("shipping_postal_code") && zone;

  return (
    <div className="address-form">
      <div className="address-form__field address-form__field--name">
        <InputField
          id="shipping_name"
          name="shipping_name"
          type="text"
          label={t("form.nom")}
          autoComplete="shipping name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.shipping_name}
          valid={!fieldError("shipping_name")}
          aria-invalid={!!fieldError("shipping_name")}
        />
      </div>

      <div className="address-form__field address-form__field--address">
        <InputField
          id="shipping_address"
          name="shipping_address"
          type="text"
          label={t("checkout.adreca")}
          autoComplete="shipping address-line1"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.shipping_address}
          valid={!fieldError("shipping_address")}
          aria-invalid={!!fieldError("shipping_address")}
        />
      </div>

      <div className="address-form__field address-form__field--postal">
        <InputField
          id="shipping_postal_code"
          name="shipping_postal_code"
          type="text"
          inputMode="numeric"
          maxLength="5"
          label={t("checkout.codi-postal")}
          autoComplete="shipping postal-code"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.shipping_postal_code}
          valid={!fieldError("shipping_postal_code")}
          aria-invalid={!!fieldError("shipping_postal_code")}
          aria-describedby={
            showZoneHelp ? "shipping_postal_code-error" : undefined
          }
        />
      </div>

      <div className="address-form__field address-form__field--city">
        <InputField
          id="shipping_city"
          name="shipping_city"
          type="text"
          label={t("checkout.ciutat")}
          autoComplete="shipping address-level2"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.shipping_city}
          valid={!fieldError("shipping_city")}
          aria-invalid={!!fieldError("shipping_city")}
        />
      </div>

      {showZoneHelp && (
        <div
          id="shipping_postal_code-error"
          className="address-form__zone-error"
          role="alert"
        >
          <span>{fieldError("shipping_postal_code")}</span>
          <button
            type="button"
            className="address-form__zone-error-link"
            onClick={onSwitchToPickup}
          >
            {t("checkout.canvia-recollida")}
          </button>
        </div>
      )}

      {!showZoneHelp &&
        (fieldError("shipping_name") ||
          fieldError("shipping_address") ||
          fieldError("shipping_city") ||
          fieldError("shipping_postal_code")) && (
          <div className="address-form__errors" role="alert">
            {[
              fieldError("shipping_name"),
              fieldError("shipping_address"),
              fieldError("shipping_postal_code"),
              fieldError("shipping_city"),
            ]
              .filter(Boolean)
              .map((message) => (
                <div key={message}>{message}</div>
              ))}
          </div>
        )}
    </div>
  );
}
