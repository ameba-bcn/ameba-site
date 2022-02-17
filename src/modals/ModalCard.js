import React, { useState } from "react";
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
import "./Modals.css";
import { MOBILE_NORMAL } from "../utils/constants";
import CollapsableTextDiv from "../components/collapsable/CollapsableTextDiv";
import { toast } from "react-toastify";
import Toast from "../components/toast/Toast";
import { useTranslation } from "react-i18next";

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
    box1Title,
    box1Text,
    box2Title,
    box2Text,
    isSubscriber,
    setIsSubscriber,
    colorMode,
  } = props;
  const isMobile = useMediaQuery(MOBILE_NORMAL);
  const types = ["PRODUCTE", "SOCI", "ACTIVITAT"];
  const [activeSize, setActiveSize] = useState(sizes ? sizes[0] : []);
  const modalStyle = types.includes(type) ? type : types[0];
  const [t] = useTranslation("translation");

  const interactiveDataBox = () => {
    let dataBoxDiv = <></>;
    if (modalStyle === "PRODUCTE") {
      let dataBoxDiv = (
        <>
          <div className="modal-card___title_small ">
            <PeopleAltIcon /> {t("modal.talles")} / &nbsp;
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
                      activeSize === el
                        ? "sizes interactiveDataBox-product-sizes__button_active"
                        : "sizes interactiveDataBox-product-sizes__button"
                    }
                    key={el}
                    onClick={() => setActiveSize(el)}
                  >
                    {console.log(el)}
                    {talla}
                  </div>
                );
              })}
            </>
          )}
        </>
      );
      return dataBoxDiv;
    }
    if (modalStyle === "SOCI") {
      let dataBoxDiv = (
        <div className="interactiveDataBox-soci__row">
          <div className="modal-card___title_small">
            <PeopleAltIcon /> {t("modal.quota")} / &nbsp;
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
              Subscriptor
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
              {t("modal.professional")}
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
                <LocationOnIcon /> {t("modal.localitzacio")} / &nbsp;
              </div>
              <div className="modal-card__column_sixtyfive interactiveDataBox-activitat__text-loca">
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
              <CalendarTodayIcon /> {t("agenda.data")} / &nbsp;
            </div>
            <div className="interactiveDataBox-activitat__text-data">
              <a
                href="https://google.com/calendar"
                target="_blank"
                rel="noopener noreferrer"
              >
                {datetime !== undefined ? datetime.split("T")[0] : ""}-
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
              <LocalAtmIcon /> {t("modal.preu")} / &nbsp;
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
            <ClearIcon
              className={`modal-card__close modal-card__close_${colorMode}`}
              onClick={handleClose}
            />
            <div className="modal-card__row">
              <div className="modal-card__column_eighty">
                <div className="modal-card__title">{title}</div>
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
                    <LocationOnIcon /> {t("modal.localitzacio")} / &nbsp;
                  </div>
                </div>
                <div className="modal-card__column_sixtyfive interactiveDataBox-activitat__text-loca">
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
            <div className="modal-card__row">
              <div
                className={
                  modalStyle === "SOCI"
                    ? "modal-card__column_hundred"
                    : "modal-card__column_fiftyfive"
                }
              >
                {interactiveDataBox()}
              </div>
              <div
                className={
                  modalStyle === "SOCI"
                    ? "modal-card__column_hundred"
                    : "modal-card__column_fourtyfive"
                }
              >
                <div
                  className={
                    modalStyle === "SOCI" ? "modal-card__button-wrapper" : ""
                  }
                >
                  <Button
                    variant="contained"
                    color="primary"
                    buttonSize="boton--medium"
                    buttonStyle={
                      colorMode && colorMode === "dark"
                        ? "boton--back-orange--solid"
                        : "boton--primary--solid"
                    }
                    icon={buttonIcon}
                    onClick={() => {
                      handleAddClick(id);
                    }}
                  >
                    {buttonText}
                  </Button>
                </div>
              </div>
            </div>
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
                icon={buttonIcon}
                onClick={() => {
                  handleAddClick(id);
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
                }}
              >
                {buttonText} - {formatPrice(price)}
              </Button>
            </div>
          </div>
        </div>
      )}
    </Dialog>
  );
}
