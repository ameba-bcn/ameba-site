import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import useCartStore from "../../../stores/useCartStore";
import OptionTile from "./OptionTile";
import PickupPointList from "./PickupPointList";
import CoverageNote from "./CoverageNote";
import AddressForm from "./AddressForm";
import Checkbox from "./Checkbox";
import { validate } from "./DeliveryMethodValidate";
import { formatPriceCA, hasArticlesCheckout, isEmptyObject } from "../../../utils/utils";
import "./DeliveryMethod.style.css";

export const PICKUP_LOCATIONS = [
  {
    value: "trama",
    name: "Trama Serigrafia",
    tag: "Taller",
    address: "Carrer de Conca, 13-15 · Sant Martí, 08026 Barcelona",
  },
  {
    value: "merla",
    name: "La Merla",
    tag: "Botiga",
    address: "Carrer de Sants, 1 · Sants-Montjuïc, 08014 Barcelona",
  },
];

const AUTOSAVE_DELAY = 600;

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
  const [saveAddress, setSaveAddress] = useState(true);
  const [saveState, setSaveState] = useState("idle"); // idle | saving | saved
  const autosaveTimer = useRef(null);

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
    validate: (values) => validate(values, t),
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: () => {},
  });

  const selectPickup = (location) => {
    setPickup(location);
    setMethod("pickup");
    setDeliveryMethod({ delivery_method: "pickup", pickup_location: location });
  };

  // Sensible default: pickup at the first location, saved automatically so
  // "ves al pagament" doesn't fail on a choice nobody had to actively make.
  useEffect(() => {
    if (!delivery_method && hasArticlesCheckout(item_variants)) {
      selectPickup(pickup);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMethodChange = (value) => {
    if (value === "pickup") {
      selectPickup(pickup);
      return;
    }
    setMethod(value);
    // El resumen del pedido lee delivery_method del carrito, no de este
    // estado local, así que sin persistir aquí seguiría diciendo "recollida,
    // gratis" hasta que el autoguardado de la dirección se disparase — que
    // exige haber escrito los cuatro campos y que validen.
    //
    // Guardar "shipping" sin dirección es seguro: el backend solo rechaza el
    // PATCH si el código postal está puesto y cae fuera de la península, y
    // isDeliveryComplete sigue bloqueando el paso al pago hasta que la
    // dirección esté entera.
    setDeliveryMethod({ delivery_method: "shipping" });
  };

  // No explicit "save address" button: once every field is filled in and
  // passes validation, the address auto-saves to the cart a moment after
  // the user stops typing/tabbing through the form.
  useEffect(() => {
    if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
    if (method !== "shipping" || !formik.dirty) return undefined;
    setSaveState("idle");
    const errors = validate(formik.values, t);
    if (!isEmptyObject(errors)) return undefined;

    autosaveTimer.current = setTimeout(() => {
      setSaveState("saving");
      setDeliveryMethod({ delivery_method: "shipping", ...formik.values })
        .then(() => setSaveState("saved"))
        .catch(() => setSaveState("idle"));
    }, AUTOSAVE_DELAY);

    return () => clearTimeout(autosaveTimer.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values, formik.dirty, method]);

  if (!hasArticlesCheckout(item_variants)) return null;

  return (
    <div className="delivery-method">
      <span className="delivery-method__title">
        {t("checkout.metode-entrega")}
      </span>

      <fieldset className="option-tiles">
        <legend className="sr-only">{t("checkout.metode-entrega")}</legend>
        <OptionTile
          id="delivery_method-pickup"
          name="delivery_method"
          value="pickup"
          checked={method === "pickup"}
          onChange={() => handleMethodChange("pickup")}
          title={t("checkout.recogida")}
          price={t("checkout.gratis")}
          subtitle={t("checkout.recogida-subtitol")}
        />
        <OptionTile
          id="delivery_method-shipping"
          name="delivery_method"
          value="shipping"
          checked={method === "shipping"}
          onChange={() => handleMethodChange("shipping")}
          title={t("checkout.enviament")}
          price={`+${formatPriceCA(7)}`}
          subtitle={t("checkout.enviament-subtitol")}
        />
      </fieldset>

      {method === "pickup" && (
        <fieldset className="pickup-points">
          <legend className="pickup-points__legend">
            {t("checkout.on-recollir")}
          </legend>
          <PickupPointList
            locations={PICKUP_LOCATIONS}
            value={pickup}
            onChange={selectPickup}
          />
        </fieldset>
      )}

      {method === "shipping" && (
        <fieldset className="shipping-address">
          <legend className="sr-only">{t("checkout.adreca")}</legend>
          <CoverageNote />
          <AddressForm
            formik={formik}
            onSwitchToPickup={() => handleMethodChange("pickup")}
          />
          <Checkbox
            id="save_address"
            checked={saveAddress}
            onChange={() => setSaveAddress((value) => !value)}
            label={t("checkout.desa-adreca-properes")}
          />
          {saveState !== "idle" && (
            <div className="delivery-method__saving" aria-live="polite">
              {saveState === "saving"
                ? t("checkout.desant")
                : t("checkout.adreca-guardada")}
            </div>
          )}
        </fieldset>
      )}
    </div>
  );
}
