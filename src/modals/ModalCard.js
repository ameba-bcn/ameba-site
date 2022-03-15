import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import { useMediaQuery } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import { formatPrice } from "../utils/utils";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Button from "../components/button/Button";
import ImageCarousel from "../components/images/ImageCarousel";
import { MOBILE_NORMAL } from "../utils/constants";
import CollapsableTextDiv from "../components/collapsable/CollapsableTextDiv";
import { toast } from "react-toastify";
import Toast from "../components/toast/Toast";
import { useTranslation } from "react-i18next";
import { ReactFitty } from "react-fitty";
import "./Modals.css";
import { StyledCloseIcon, StyledModalRow, StyledSizesRow } from "./ModalCardStyled";

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
  } = props;
  const isMobile = useMediaQuery(MOBILE_NORMAL);
  const types = ["PRODUCTE", "SOCI", "ACTIVITAT"];
  const [activeSize, setActiveSize] = useState([]);
  const [selectSizeError, setSelectSizeError] = useState(false);
  const modalStyle = types.includes(type) ? type : types[0];
  const [t] = useTranslation("translation");
  const productSoldOut =
    !has_stock || (modalStyle === "PRODUCTE" && sizes.length === 0);
  console.log("props", props);
  useEffect(() => {
    if (!!sizes.length) {
      setActiveSize(sizes.length === 1 ? sizes[0] : []);
    }
  }, [sizes]);

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
      toast(<Toast />, {
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

  const interactiveDataBox = () => {
    let dataBoxDiv = <></>;
    if (modalStyle === "PRODUCTE") {
      let dataBoxDiv = (
        <StyledSizesRow>
          <div className="modal-card___title_small ">
            <PeopleAltIcon />{" "}
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
            <div>Talla única</div>
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
            </>
          )}
        </StyledSizesRow>
      );
      return dataBoxDiv;
    }
    if (modalStyle === "SOCI") {
      let dataBoxDiv = (
        <div className="interactiveDataBox-soci__row">
          <div className="modal-card___title_small">
            <PeopleAltIcon /> <span>{t("modal.quota")} / &nbsp;</span>
          </div>
          <div className="interactiveDataBox-soci__buttonBox">
            <div
              className={`interactiveDataBox-soci__button interactiveDataBox-soci__button-subscriber 
                          ${
                            isSubscriber
                              ? "interactiveDataBox-soci__button-active"
                              : "interactiveDataBox-soci__button-inactive"
                          }`}
              onClick={() => setIsSubscriber(true)}
            >
              {extraButtons[0]}
            </div>
            <div
              className={`interactiveDataBox-soci__button interactiveDataBox-soci__button-professional 
                          ${
                            isSubscriber
                              ? "interactiveDataBox-soci__button-inactive"
                              : "interactiveDataBox-soci__button-active"
                          }`}
              onClick={() => setIsSubscriber(false)}
            >
              {extraButtons[1]}
            </div>
          </div>
        </div>
      );
      return dataBoxDiv;
    }
    if (modalStyle === "ACTIVITAT") {
      let dataBoxDiv = (
        <>
          {isMobile && (
            <div className="interactiveDataBox-activitat__row">
              <div className="modal-card___title_small">
                <LocationOnIcon />{" "}
                <span>{t("modal.localitzacio")} / &nbsp;</span>
              </div>
              <div className="interactiveDataBox-activitat__text-loca">
                <a
                  href="https://google.com/maps"
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
              <CalendarTodayIcon /> <span>{t("agenda.data")} / &nbsp;</span>
            </div>
            <div className="interactiveDataBox-activitat__text-data">
              <a
                href="https://google.com/calendar"
                target="_blank"
                rel="noopener noreferrer"
              >
                {datetime !== undefined ? datetime.split("T")[0] : ""}{" "}
                {datetime !== undefined
                  ? datetime
                      .substring(
                        datetime.lastIndexOf("T") + 1,
                        datetime.lastIndexOf("Z")
                      )
                      .slice(0, -3)
                  : ""}
              </a>
            </div>
          </div>
          <div className="interactiveDataBox-activitat__row">
            <span className="modal-card___title_small">
              <LocalAtmIcon /> <span>{t("modal.preu")} / &nbsp;</span>
            </span>
            <span className="interactiveDataBox-activitat__text-data">
              {price}
            </span>
          </div>
        </>
      );
      return dataBoxDiv;
    }
    return dataBoxDiv;
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      {!isMobile && (
        <>
          <div
            className={`modal-card__background modal-card__background_${colorMode}`}
          >
              <StyledCloseIcon colorMode={colorMode}>
                <ClearIcon
                  // className={`modal-card__close modal-card__close_${colorMode}`}
                  onClick={handleClose}
                />
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
                  {formatPrice(price)}
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
                    <LocationOnIcon />{" "}
                    <div>{t("modal.localitzacio")} / &nbsp;</div>
                  </div>
                </div>
                <div className="interactiveDataBox-activitat__text-loca">
                  <a
                    href="https://google.com/maps"
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
              {interactiveDataBox()}
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
            </StyledModalRow>
            <hr
              className={`modal-card__hr_dashed modal-card__hr_dashed-${colorMode}`}
            />
            <div className="modal-card__description-title">{box1Title}</div>
            <div className="modal-card__description-content">{box1Text}</div>
            {box2Title && (
              <>
                <hr
                  className={`modal-card__hr_dashed modal-card__hr_dashed-${colorMode}`}
                />
                <div className="modal-card__description-title">{box2Title}</div>
                <div className="modal-card__description-content">
                  {box2Text}
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
          <ClearIcon
            className={`modal-card-mobile__close modal-card__close_${colorMode}`}
            onClick={handleClose}
          />
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
            <hr
              className={`modal-card__hr_dashed modal-card__hr_dashed-${colorMode}`}
            />
            <div className="modal-card-mobile__row-interactiveDataBox">
              {interactiveDataBox()}
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
                {buttonText} - {formatPrice(price)}
              </Button>
            </div>
            {selectSizeError && (
              <div className="error-message">{t("modal.sizesError")}</div>
            )}
          </div>
        </div>
      )}
    </Dialog>
  );
}
