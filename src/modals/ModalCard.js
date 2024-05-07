import React, { useState, useEffect } from "react";
import Icon from "../components/ui/Icon";
import { formatPrice, urlify } from "../utils/utils";
import Button from "../components/button/Button";
import ImageCarousel from "../components/images/ImageCarousel";
import { MOBILE_NORMAL, productKinds } from "../utils/constants";
import CollapsableTextDiv from "../components/collapsable/CollapsableTextDiv";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { ReactFitty } from "react-fitty";
import InteractiveModalBox from "./InteractiveModalBox";
import "./Modals.css";
import { StyledCloseIcon, StyledModalRow } from "./ModalCardStyled";
import CartToast from "../components/toast/CartToast";
import useMediaQuery from "../hooks/use-media-query";
import ModalDialog from "../components/layout/ModalDialog";

export default function ModalCard(props) {
  const {
    handleClose,
    open,
    sizes = [],
    handleAddClick,
    id,
    type,
    title,
    price,
    price_range,
    imgArr,
    datetime,
    address,
    buttonText,
    buttonIcon,
    extraButtons = [],
    box1Title,
    box1Text,
    box2Title,
    box2Text,
    isSubscriber,
    setIsSubscriber,
    colorMode,
    header,
    has_stock,
    discount,
    maps_url = null,
    cancelled = false,
    stock,
  } = props;

  const today = new Date();
  const todayIsoString = today.toISOString();
  const [t] = useTranslation("translation");
  const buttonMapper = (type) => {
    if (type === "ACTIVITAT") {
      // Evento de pago sold out
      if (price !== 0 && stock === 0) {
        return (
          <Button
            variant="contained"
            color="primary"
            buttonSize="boton--medium"
            disabled={true}
            buttonStyle={
              colorMode && colorMode === "dark"
                ? "boton--back-orange--solid"
                : "boton--primary--solid"
            }
            icon={buttonIcon}
            onClick={() => {}}
          >
            {t("events.button.pago-sold")}
          </Button>
        );
      }

      // Evento gratuito con inscripcion
      if (price === 0 && stock > 0) {
        return (
          <Button
            variant="contained"
            color="primary"
            buttonSize="boton--medium"
            disabled={false}
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
            {t("events.button.gratis-inscripcion")}
          </Button>
        );
      }

      // Evento gratuito con inscripcion aforo completo
      if (price === 0 && stock === 0) {
        return (
          <Button
            variant="contained"
            color="primary"
            buttonSize="boton--medium"
            disabled={true}
            buttonStyle={
              colorMode && colorMode === "dark"
                ? "boton--back-orange--solid"
                : "boton--primary--solid"
            }
            icon={buttonIcon}
            onClick={() => {}}
          >
            {t("events.button.gratis-aforo-completo")}
          </Button>
        );
      }

      // Evento gratuito sin inscripcion
      if (price === 0 && stock === -1) {
        return null;
      }

      // Evento cancelado
      if (cancelled) {
        return (
          <Button
            variant="contained"
            color="primary"
            buttonSize="boton--medium"
            disabled={true}
            buttonStyle={
              colorMode && colorMode === "dark"
                ? "boton--back-orange--solid"
                : "boton--primary--solid"
            }
            icon={buttonIcon}
            onClick={() => {}}
          >
            {t("events.button.cancelado")}
          </Button>
        );
      }

      // Evento caducado
      if (todayIsoString > datetime) {
        return null;
      }

      // Evento de pago en taquilla
      if (price !== 0 && stock === -1) {
        return (
          <Button
            variant="contained"
            color="primary"
            buttonSize="boton--medium"
            disabled={true}
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
            {t("events.button.pago-taquilla")}
          </Button>
        );
      }

      // Evento de pago con stock
      if (price !== 0 && stock > 0) {
        return (
          <Button
            variant="contained"
            color="primary"
            buttonSize="boton--medium"
            disabled={false}
            buttonStyle={
              colorMode && colorMode === "dark"
                ? "boton--back-orange--solid"
                : "boton--primary--solid"
            }
            icon={buttonIcon}
            onClick={() => {
              handleAddToCard(id);
            }}
          >
            {t("events.button.pago")}
          </Button>
        );
      }
    }

    // return (
    //   !productSoldOut && (
    //     <Button
    //       variant="contained"
    //       color="primary"
    //       buttonSize="boton--medium"
    //       disabled={productSoldOut}
    //       buttonStyle={
    //         colorMode && colorMode === "dark"
    //           ? "boton--back-orange--solid"
    //           : "boton--primary--solid"
    //       }
    //       icon={buttonIcon}
    //       onClick={() => {
    //         !productSoldOut && handleAddToCard(id);
    //       }}
    //     >
    //       {buttonText}
    //     </Button>
    //   )
    // );
  };

  const buttonMobileMapper = (type) => {
    if (type === "ACTIVITAT") {
      // Evento de pago sold out
      if (price !== 0 && stock === 0) {
        return (
          <Button
            variant="contained"
            color="primary"
            buttonSize="boton--megaxxl"
            buttonStyle={
              colorMode && colorMode === "dark"
                ? "boton--back-orange--solid"
                : "boton--primary--solid"
            }
            disabled={true}
            icon={buttonIcon}
            onClick={() => {}}
          >
            {t("events.button.pago-sold")} - {formatPrice(price)}
          </Button>
        );
      }

      // Evento gratuito con inscripcion
      if (price === 0 && stock > 0) {
        return (
          <Button
            variant="contained"
            color="primary"
            buttonSize="boton--megaxxl"
            buttonStyle={
              colorMode && colorMode === "dark"
                ? "boton--back-orange--solid"
                : "boton--primary--solid"
            }
            disabled={false}
            icon={buttonIcon}
            onClick={() => {
              !productSoldOut && handleAddToCard(id);
            }}
          >
            {t("events.button.gratis-inscripcion")} - {formatPrice(price)}
          </Button>
        );
      }

      // Evento gratuito con inscripcion aforo completo
      if (price === 0 && stock === 0) {
        return (
          <Button
            variant="contained"
            color="primary"
            buttonSize="boton--megaxxl"
            buttonStyle={
              colorMode && colorMode === "dark"
                ? "boton--back-orange--solid"
                : "boton--primary--solid"
            }
            disabled={true}
            icon={buttonIcon}
            onClick={() => {}}
          >
            {t("events.button.gratis-aforo-completo")} - {formatPrice(price)}
          </Button>
        );
      }

      // Evento gratuito sin inscripcion
      if (price === 0 && stock === -1) {
        return null;
      }

      // Evento cancelado
      if (cancelled) {
        return (
          <Button
            variant="contained"
            color="primary"
            buttonSize="boton--megaxxl"
            buttonStyle={
              colorMode && colorMode === "dark"
                ? "boton--back-orange--solid"
                : "boton--primary--solid"
            }
            disabled={true}
            icon={buttonIcon}
            onClick={() => {}}
          >
            {t("events.button.cancelado")} - {formatPrice(price)}
          </Button>
        );
      }

      // Evento caducado
      if (todayIsoString > datetime) {
        return null;
      }

      // Evento de pago en taquilla
      if (price !== 0 && stock === -1) {
        return (
          <Button
            variant="contained"
            color="primary"
            buttonSize="boton--megaxxl"
            buttonStyle={
              colorMode && colorMode === "dark"
                ? "boton--back-orange--solid"
                : "boton--primary--solid"
            }
            disabled={true}
            icon={buttonIcon}
            onClick={() => {
              !productSoldOut && handleAddToCard(id);
            }}
          >
            {t("events.button.pago-taquilla")} - {formatPrice(price)}
          </Button>
        );
      }

      // Evento de pago con stock
      if (price !== 0 && stock > 0)
        return (
          <Button
            variant="contained"
            color="primary"
            buttonSize="boton--megaxxl"
            buttonStyle={
              colorMode && colorMode === "dark"
                ? "boton--back-orange--solid"
                : "boton--primary--solid"
            }
            disabled={false}
            icon={buttonIcon}
            onClick={() => {
              !productSoldOut && handleAddToCard(id);
            }}
          >
            {t("events.button.pago")} - {formatPrice(price)}
          </Button>
        );
    }

    // return (
    //   <Button
    //     variant="contained"
    //     color="primary"
    //     buttonSize="boton--megaxxl"
    //     buttonStyle={
    //       colorMode && colorMode === "dark"
    //         ? "boton--back-orange--solid"
    //         : "boton--primary--solid"
    //     }
    //     disabled={productSoldOut}
    //     icon={buttonIcon}
    //     onClick={() => {
    //       !productSoldOut && handleAddToCard(id);
    //     }}
    //   >
    //     {buttonText} - {formatPrice(price)}
    //   </Button>
    // );
  };

  const isMobile = useMediaQuery(MOBILE_NORMAL);
  const types = productKinds;
  const [activeSize, setActiveSize] = useState([]);
  const [selectSizeError, setSelectSizeError] = useState(false);
  const [copied, setCopied] = useState(false);
  const modalStyle = types.includes(type.toLowerCase())
    ? type.toUpperCase()
    : types[0].toUpperCase();

  const productSoldOut =
    !has_stock || (modalStyle === "PRODUCTE" && sizes.length === 0);

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

  const handleCopyLink = () => {
    const kind = modalStyle.toLowerCase();
    const base_url = window.location.origin;
    const copyUrl = `${base_url}/product?id=${id}&kind=${kind}`;
    navigator.clipboard.writeText(copyUrl);
    setCopied(true);
  };

  useEffect(() => {
    () => {
      handleClose();
    };
  }, []);

  return (
    <ModalDialog onClose={handleClose} open={open}>
      {!isMobile && (
        <>
          <div
            className={`modal-card__background modal-card__background_${colorMode}`}
          >
            <StyledCloseIcon colorMode={colorMode}>
              <Icon
                icon="link"
                onClick={handleCopyLink}
                type={
                  colorMode === "dark" ? "hoverable-dark" : "hoverable-cream"
                }
              />
              <Icon
                icon="clear"
                onClick={handleClose}
                type={
                  colorMode === "dark" ? "hoverable-dark" : "hoverable-cream"
                }
              />
              {copied ? (
                <div className="modal-card__copy">{t("modal.copiat")}</div>
              ) : null}
            </StyledCloseIcon>
            <div className="modal-card__row">
              <div className="modal-card__column_eighty">
                <div className="modal-card__title">
                  <ReactFitty maxSize={75}>
                    {modalStyle === "ACTIVITAT" ? header : title}
                  </ReactFitty>
                </div>
              </div>
              <div className="modal-card__column_twenty">
                <div
                  className={`modal-card__price modal-card__price_${colorMode}`}
                >
                  {formatPrice(price_range)}
                </div>
              </div>
            </div>
            <hr
              className={`modal-card__hr_solid modal-card__hr_solid-${colorMode}`}
            />

            {modalStyle === "ACTIVITAT" && (
              <div className="modal-card-location__row">
                <div className="modal-card__column_thirtyfive">
                  <div className="modal-card___title_small">
                    <Icon
                      icon="place"
                      type={colorMode === "dark" ? "cream" : ""}
                    />{" "}
                    <div>{t("modal.localitzacio")} / &nbsp;</div>
                  </div>
                </div>
                <div className="interactiveDataBox-activitat__text-loca">
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
              </div>
            )}
            <ImageCarousel imgList={imgArr} />
            <hr
              className={`modal-card__hr_solid modal-card__hr_solid-${colorMode}`}
            />
            <StyledModalRow>
              <InteractiveModalBox
                modalStyle={modalStyle}
                isMobile={isMobile}
                productSoldOut={productSoldOut}
                sizes={sizes}
                stock={stock}
                price={price}
                todayIsoString={todayIsoString}
                isSubscriber={isSubscriber}
                setIsSubscriber={setIsSubscriber}
                activeSize={activeSize}
                setActiveSize={setActiveSize}
                selectSizeError={selectSizeError}
                setSelectSizeError={setSelectSizeError}
                extraButtons={extraButtons}
                address={address}
                datetime={datetime}
                handleAddClick={handleAddClick}
                price_range={price_range}
                discount={discount}
                maps_url={maps_url}
                colorMode={colorMode}
              />
              {buttonMapper(type)}
            </StyledModalRow>
            <hr
              className={`modal-card__hr_dashed modal-card__hr_dashed-${colorMode}`}
            />
            <div className="modal-card__description-title">{box1Title}</div>
            <div className="modal-card__description-content">
              {urlify(box1Text)}
            </div>
            {box2Title && (
              <>
                <hr
                  className={`modal-card__hr_dashed modal-card__hr_dashed-${colorMode}`}
                />
                <div className="modal-card__description-title">{box2Title}</div>
                <div className="modal-card__description-content">
                  <pre>{urlify(box2Text)}</pre>
                </div>
              </>
            )}
            <hr
              className={`modal-card__hr_solid modal-card__hr_solid-${colorMode}`}
            />
          </div>
        </>
      )}

      {isMobile && (
        <div
          className={`modal-card-mobile__background modal-card-mobile__background_${colorMode}`}
        >
          <div className="modal-card-mobile__close">
            <Icon
              icon="link"
              onClick={handleCopyLink}
              type={colorMode === "dark" ? "hoverable-dark" : "hoverable-cream"}
            />
            <Icon
              icon="clear"
              onClick={handleClose}
              type={colorMode === "dark" ? "hoverable-dark" : "hoverable-cream"}
            />
            {copied ? (
              <div className="modal-card-mobile__copy">{t("modal.copiat")}</div>
            ) : null}
          </div>
          <div className="modal-card-mobile__row">
            <hr
              className={`modal-card__hr_dashed modal-card__hr_dashed-${colorMode}`}
            />
            <div className="modal-card-mobile__title">{title}</div>
            <hr
              className={`modal-card__hr_dashed modal-card__hr_dashed-${colorMode}`}
            />
            <ImageCarousel imgList={imgArr} />
            <hr
              className={`modal-card__hr_dashed modal-card__hr_dashed-${colorMode}`}
            />
            <div className="modal-card-mobile__description-title">
              {box1Title}
            </div>
            <div className="modal-card-mobile__description-content">
              <CollapsableTextDiv text={box1Text} />
            </div>
            <div className="modal-card-mobile__description-title">
              {box2Title}
            </div>
            <div className="modal-card-mobile__description-content">
              <CollapsableTextDiv text={box2Text} />
            </div>
            <hr
              className={`modal-card__hr_dashed modal-card__hr_dashed-${colorMode}`}
            />
            <div className="modal-card-mobile__row-interactiveDataBox">
              <InteractiveModalBox
                modalStyle={modalStyle}
                isMobile={isMobile}
                productSoldOut={productSoldOut}
                sizes={sizes}
                stock={stock}
                price={price}
                todayIsoString={todayIsoString}
                isSubscriber={isSubscriber}
                setIsSubscriber={setIsSubscriber}
                activeSize={activeSize}
                setActiveSize={setActiveSize}
                selectSizeError={selectSizeError}
                setSelectSizeError={setSelectSizeError}
                extraButtons={extraButtons}
                address={address}
                datetime={datetime}
                handleAddClick={handleAddClick}
                price_range={price_range}
                maps_url={maps_url}
                colorMode={colorMode}
              />
            </div>
            <div className="modal-card-mobile__button-wrapper">
              <Button
                variant="contained"
                color="primary"
                buttonSize="boton--megaxxl"
                buttonStyle={
                  colorMode && colorMode === "dark"
                    ? "boton--back-orange--solid"
                    : "boton--primary--solid"
                }
                disabled={productSoldOut}
                icon={buttonIcon}
                onClick={() => {
                  !productSoldOut && handleAddToCard(id);
                }}
              >
                {buttonText} - {formatPrice(price_range)}
              </Button>
              {buttonMobileMapper(type)}
            </div>
          </div>
        </div>
      )}
    </ModalDialog>
  );
}
