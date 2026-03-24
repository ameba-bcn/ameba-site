import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import InteractiveModalBox from "../../modals/InteractiveModalBox";
import ImageCarousel from "../images/ImageCarousel";
import { useTranslation } from "react-i18next";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";
import { MOBILE_NORMAL, productKinds } from "../../utils/constants";
import "./ExternalEvent.css";
import { urlify } from "../../utils/utils";
import CartToast from "../toast/CartToast";
import Icon from "../ui/Icon";
import useMediaQuery from "../../hooks/use-media-query";
import PowerTitle from "../layout/PowerTitle";

const ExternalEvent = ({ productData = {}, kind = "", handleAddClick }) => {
  const {
    price_range = "",
    images = [],
    name = "",
    datetime = "",
    address = "",
    description = "",
    variants = [],
    benefits = "",
    has_stock = true,
    id,
    maps_url,
  } = productData;

  useEffect(() => {
    let arr = [];
    if (variants) {
      variants.forEach((element) => {
        if (element.stock > 0 || element.stock === -1) {
          arr.push(element.attributes[0].value.toUpperCase());
        }
      });
    }
    setSizes(arr);
  }, [variants]);

  const navigate = useNavigate();
  const [activeSize, setActiveSize] = useState([]);
  const [selectSizeError, setSelectSizeError] = useState(false);
  const [isSubscriber, setIsSubscriber] = useState(id === 14);
  const [sizes, setSizes] = useState([]);
  const [t] = useTranslation("translation");
  const isMobile = useMediaQuery(MOBILE_NORMAL);
  const kinds = productKinds;
  const modalStyle = kinds.includes(kind)
    ? kind.toUpperCase()
    : kinds[0].toUpperCase();
  const productSoldOut =
    modalStyle === "PRODUCTE" ? sizes.length === 0 : !has_stock;
  const buttonIcon =
    modalStyle === "ACTIVITAT" ? (
      <Icon icon="receipt" type="hoverable-black" />
    ) : (
      <Icon icon="shoppingCart" type="hoverable-black" />
    );
  const buttonText =
    modalStyle === "ACTIVITAT" ? "RESERVA ENTRADA" : t("modal.afegir");
  const colorMode = "";
  const box1Title = t("modal.descripcio");
  const box2Title = t("modal.beneficis");

  useEffect(() => {
    if (modalStyle === "SOCI") {
      if (isSubscriber) {
        navigate("/product?id=14&kind=soci");
      } else {
        navigate("/product?id=15&kind=soci");
      }
    }
  }, [isSubscriber]);

  const handleAddToCard = (id) => {
    if (activeSize.length === 0 && modalStyle === "PRODUCTE")
      setSelectSizeError(true);
    else {
      setSelectSizeError(false);
      if (modalStyle === "PRODUCTE") {
        handleAddClick(activeSize);
      } else {
        handleAddClick(id);
      }
      toast(<CartToast />, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        className: "toast-black-background",
      });
    }
  };
  return (
    <div className="external-event-box">
      <div className="external-event__title-box">
        <PowerTitle
          title={modalStyle === "SOCI" ? `${t("banners.soci-curt")}!` : name}
          className="external-event__title"
        />
      </div>
      <div className="rowExternal">
        <div className="external-event__col1">
          <ImageCarousel imgList={images} />
          <div className="external-event__button-box">
            {!productSoldOut && (
              <Button
                variant="contained"
                color="primary"
                buttonSize="boton--medium"
                disabled={productSoldOut}
                buttonStyle={
                  colorMode && colorMode === "dark"
                    ? "boton--back-orange--solid"
                    : "boton--primary--solid"
                }
                icon={buttonIcon}
                onClick={() => {
                  !productSoldOut && handleAddToCard(id);
                }}
              >
                {buttonText}
              </Button>
            )}
          </div>
        </div>
        <div className="external-event__col2">
          <InteractiveModalBox
            modalStyle={modalStyle}
            isMobile={isMobile}
            productSoldOut={productSoldOut}
            sizes={sizes}
            isSubscriber={isSubscriber}
            setIsSubscriber={setIsSubscriber}
            activeSize={activeSize}
            setActiveSize={setActiveSize}
            selectSizeError={selectSizeError}
            setSelectSizeError={setSelectSizeError}
            datetime={datetime}
            handleAddClick={handleAddClick}
            price={price_range}
            maps_url={maps_url}
            colorMode={colorMode}
          />
          {modalStyle === "ACTIVITAT" && (
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
          )}
          {modalStyle !== "ACTIVITAT" && (
            <div className="interactiveDataBox-activitat__row">
              <span className="modal-card___title_small">
                <Icon icon="money" /> <span>{t("modal.preu")} / &nbsp;</span>
              </span>
              <span className="interactiveDataBox-activitat__text-data">
                {price_range}
              </span>
            </div>
          )}
          <div className="modal-card__description-title-external">
            {box1Title}
          </div>
          <div className="modal-card__description-content">
            {urlify(description)}
          </div>
          {box2Title && (
            <>
              {modalStyle === "SOCI" && (
                <>
                  {" "}
                  <div className="modal-card__description-title-external">
                    {box2Title}
                  </div>
                  <div className="modal-card__description-content">
                    {urlify(benefits)}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExternalEvent;
