import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { StyledCenterLabel, StyledSizesRow } from "./ModalCardStyled";
import { formatDateToHour, priceMayDiscount } from "../utils/utils";
import Icon from "../components/ui/Icon";

const InteractiveModalBox = (props) => {
  const {
    modalStyle = "",
    isMobile,
    productSoldOut,
    sizes,
    activeSize,
    setActiveSize,
    selectSizeError,
    setSelectSizeError,
    address,
    datetime,
    price,
    discount,
    maps_url,
    colorMode = "",
  } = props;

  const [t] = useTranslation("translation");
  useEffect(() => {
    if (sizes?.length > 0) {
      setActiveSize(sizes.length === 1 ? sizes[0] : []);
    }
  }, [sizes]);

  return (
    <>
      {modalStyle === "PRODUCTE" && (
        <StyledSizesRow>
          <div className="modal-card___title_small ">
            <Icon icon="people" type={colorMode === "dark" ? "cream" : ""} />{" "}
            <span>
              {productSoldOut
                ? t("modal.esgotat")
                : isMobile
                ? t("modal.talles").split(" ")[0]
                : t("modal.talles")}{" "}
              / &nbsp;
            </span>
          </div>
          {sizes && sizes[0] === "UNIQUE" ? (
            <StyledCenterLabel>Talla única</StyledCenterLabel>
          ) : (
            <>
              {sizes?.map((el) => {
                const talla = el.split(" ")[0];
                return (
                  <div
                    className={
                      activeSize === el || sizes.length === 1
                        ? "sizes interactiveDataBox-product-sizes__button_active"
                        : "sizes interactiveDataBox-product-sizes__button"
                    }
                    key={el}
                    onClick={() => {
                      setActiveSize(el);
                      setSelectSizeError(false);
                    }}
                  >
                    {talla}
                  </div>
                );
              })}
              {selectSizeError && (
                <div className="error-message">{t("modal.sizesError")}</div>
              )}
            </>
          )}
        </StyledSizesRow>
      )}
      {modalStyle === "SOCI" && (
        <div className="interactiveDataBox-soci__row">
          <div className="modal-card___title_small">
            <Icon icon="people" type={colorMode === "dark" ? "cream" : ""} />{" "}
            <span>{t("modal.quota")} / &nbsp;</span>
          </div>
          <div className="interactiveDataBox-soci__buttonBox">
            <div className="modal-card___title_small">
              <span>anual</span>
            </div>
          </div>
        </div>
      )}
      {modalStyle === "ACTIVITAT" && (
        <>
          {isMobile && (
            <div className="interactiveDataBox-activitat__row">
              <div className="modal-card___title_small">
                <Icon icon="place" type={colorMode === "dark" ? "cream" : ""} />{" "}
                <span>{t("modal.localitzacio")} / &nbsp;</span>
              </div>
              <div className="interactiveDataBox-activitat__text-loca">
                <a
                  href={
                    maps_url?.length > 0 ? maps_url : "https://google.com/maps"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {address}
                </a>
              </div>
            </div>
          )}
          <div className="interactiveDataBox-activitat__row">
            <div className="modal-card___title_small">
              <Icon
                icon="calendar"
                type={colorMode === "dark" ? "cream" : ""}
              />{" "}
              <span>{t("agenda.data")} / &nbsp;</span>
            </div>
            <div className="interactiveDataBox-activitat__text-data">
              <a
                href="https://google.com/calendar"
                target="_blank"
                rel="noopener noreferrer"
              >
                {datetime !== undefined ? datetime.split("T")[0] : ""}{" "}
                {formatDateToHour(datetime)}
              </a>
            </div>
          </div>
          <div className="interactiveDataBox-activitat__row">
            <span className="modal-card___title_small">
              <Icon icon="money" type={colorMode === "dark" ? "cream" : ""} />{" "}
              <span>{t("modal.preu")} / &nbsp;</span>
            </span>
            <span className="interactiveDataBox-activitat__text-data">
              {priceMayDiscount(price, discount)}
            </span>
          </div>
        </>
      )}
    </>
  );
};

export default InteractiveModalBox;
