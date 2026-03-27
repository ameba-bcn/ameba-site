import React from "react";
import { useTranslation } from "react-i18next";
import { formatDateToHour, priceMayDiscount } from "../../utils/utils";
import Icon from "../ui/Icon";

const EventDetails = ({
  datetime = "",
  address = "",
  maps_url,
  price = 0,
  price_range = "",
  discount = 0,
  stock = 0,
}) => {
  const [t] = useTranslation("translation");

  const priceMapper = () => {
    if (price === 0) {
      return t("events.button.gratis").toUpperCase();
    }
    return priceMayDiscount(price_range, discount, null, t("form.descompte"));
  };

  return (
    <>
      <div className="modal-card-location__row">
        {!maps_url?.includes("dice") && (
          <>
            <div className="modal-card___title_small">
              <Icon icon="place" />{" "}
              <span>{t("modal.localitzacio")} / &nbsp;</span>
            </div>
            <div className="interactiveDataBox-activitat__text-loca-fullview">
              <a
                href={
                  maps_url?.length > 0
                    ? maps_url
                    : "https://google.com/maps"
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                {address}
              </a>
            </div>
          </>
        )}
        {maps_url?.includes("dice") && (
          <div className="modal-card___title_small">
            <Icon icon="ticket" />{" "}
            <span className="modal-card___title_small__tickets">
              {t("modal.link-compra")} / &nbsp;
            </span>
            <a
              href={maps_url}
              target="_blank"
              rel="noopener noreferrer"
              className="interactiveDataBox-activitat__text-loca-fullview"
            >
              {t("events.button.pago-externo")}
            </a>
          </div>
        )}
      </div>
      <div className="interactiveDataBox-activitat__row">
        <div className="modal-card___title_small">
          <Icon icon="calendar" />{" "}
          <span>{t("agenda.data")} / &nbsp;</span>
        </div>
        <div className="interactiveDataBox-activitat__text-data">
          <a
            href="https://google.com/calendar"
            target="_blank"
            rel="noopener noreferrer"
          >
            {datetime ? datetime.split("T")[0] : ""}{" "}
            {formatDateToHour(datetime)}
          </a>
        </div>
      </div>
      <div className="interactiveDataBox-activitat__row">
        <span className="modal-card___title_small">
          <Icon icon="money" />{" "}
          <span>{t("modal.preu")} / &nbsp;</span>
        </span>
        <span className="interactiveDataBox-activitat__text-data">
          {priceMapper()}
        </span>
      </div>
    </>
  );
};

export default EventDetails;
