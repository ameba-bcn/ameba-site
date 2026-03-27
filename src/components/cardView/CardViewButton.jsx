import React from "react";
import { useTranslation } from "react-i18next";
import Button from "../button/Button";
import "./CardViewButton.css";

const CardViewButton = ({
  type,
  price,
  stock,
  cancelled = false,
  datetime,
  maps_url,
  buttonIcon,
  onAddToCart,
  productSoldOut = false,
  activeSize = [],
}) => {
  const [t] = useTranslation("translation");
  const today = new Date();
  const todayIsoString = today.toISOString();
  const buttonStyle = "boton--primary--solid";

  if (type === "ACTIVITAT") {
    // Evento gratuito con inscripcion
    if (price === 0 && stock > 0) {
      return (
        <div className="card-view__button-wrapper">
          <Button
            variant="contained"
            color="primary"
            buttonSize="boton--medium"
            disabled={false}
            buttonStyle={buttonStyle}
            icon={buttonIcon}
            onClick={onAddToCart}
          >
            {t("events.button.gratis-inscripcion")}
          </Button>
        </div>
      );
    }

    // Evento gratuito con inscripcion aforo completo
    if (price === 0 && stock === 0) {
      return (
        <div className="card-view__button-wrapper">
          <Button
            variant="contained"
            color="primary"
            buttonSize="boton--medium"
            disabled={true}
            buttonStyle={buttonStyle}
            icon={buttonIcon}
            onClick={() => {}}
          >
            {t("events.button.gratis-aforo-completo")}
          </Button>
        </div>
      );
    }

    // Evento gratuito sin inscripcion
    if (price === 0 && stock === -1) {
      return null;
    }

    // Evento cancelado
    if (cancelled) {
      return (
        <div className="card-view__button-wrapper">
          <Button
            variant="contained"
            color="primary"
            buttonSize="boton--medium"
            disabled={true}
            buttonStyle={buttonStyle}
            icon={buttonIcon}
            onClick={() => {}}
          >
            {t("events.button.cancelado")}
          </Button>
        </div>
      );
    }

    // Evento caducado
    if (todayIsoString > datetime) {
      return null;
    }

    // Evento de pago en plataforma externa (DICE, etc.)
    if (price !== 0 && stock === -1 && maps_url?.includes("dice")) {
      return (
        <div className="card-view__button-wrapper">
          <a href={maps_url} target="_blank" rel="noopener noreferrer">
            <Button
              variant="contained"
              color="primary"
              buttonSize="boton--medium"
              disabled={false}
              buttonStyle={buttonStyle}
              icon={buttonIcon}
              onClick={() => {}}
            >
              {t("events.button.pago")}
            </Button>
          </a>
        </div>
      );
    }

    // Evento de pago en taquilla
    if (price !== 0 && stock === -1) {
      return (
        <div className="card-view__button-wrapper">
          <Button
            variant="contained"
            color="primary"
            buttonSize="boton--medium"
            disabled={true}
            buttonStyle={buttonStyle}
            icon={buttonIcon}
            onClick={() => {}}
          >
            {t("events.button.pago-taquilla")}
          </Button>
        </div>
      );
    }

    // Evento de pago con stock
    if (price !== 0 && stock > 0) {
      return (
        <div className="card-view__button-wrapper">
          <Button
            variant="contained"
            color="primary"
            buttonSize="boton--medium"
            disabled={false}
            buttonStyle={buttonStyle}
            icon={buttonIcon}
            onClick={onAddToCart}
          >
            {t("events.button.pago")}
          </Button>
        </div>
      );
    }

    // Evento de pago sold out
    if (price !== 0 && stock === 0) {
      return (
        <div className="card-view__button-wrapper">
          <Button
            variant="contained"
            color="primary"
            buttonSize="boton--medium"
            disabled={true}
            buttonStyle={buttonStyle}
            icon={buttonIcon}
            onClick={() => {}}
          >
            {t("events.button.pago-sold")}
          </Button>
        </div>
      );
    }

    return null;
  }

  if (type === "PRODUCTE") {
    return (
      <div className="card-view__button-wrapper">
        <Button
          variant="contained"
          color="primary"
          buttonSize="boton--medium"
          disabled={productSoldOut || activeSize.length === 0}
          buttonStyle={buttonStyle}
          icon={buttonIcon}
          onClick={onAddToCart}
        >
          {t("modal.afegir")}
        </Button>
      </div>
    );
  }

  if (type === "SOCI") {
    return (
      <div className="card-view__button-wrapper">
        <Button
          variant="contained"
          color="primary"
          buttonSize="boton--medium"
          disabled={productSoldOut}
          buttonStyle={buttonStyle}
          icon={buttonIcon}
          onClick={onAddToCart}
        >
          {t("modal.afegir")}
        </Button>
      </div>
    );
  }

  return null;
};

export default CardViewButton;
