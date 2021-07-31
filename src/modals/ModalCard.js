import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import { useMediaQuery } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import ClearIcon from "@material-ui/icons/Clear";
import { formatPrice } from "../utils/utils";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Button from "../components/button/Button";
import ImageCarousel from "../components/botiga/ImageCarousel";
import "./Modals.css";

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
  } = props;
  const isMobile = useMediaQuery("(max-width:640px)");
  const types = ["PRODUCTE", "SOCI", "ACTIVITAT"];
  const [activeSize, setActiveSize] = useState(sizes ? sizes[0] : []);
  const modalStyle = types.includes(type) ? type : types[0];

  const interactiveDataBox = () => {
    let dataBoxDiv = <></>;
    if (modalStyle === "PRODUCTE") {
      let dataBoxDiv = (
        <>
          <div className="sizes-modal-title">
            <PeopleAltIcon /> TALLES DISPONIBLES / &nbsp;
          </div>
          {sizes && sizes[0] === "UNIQUE" ? (
            <div>Talla única</div>
          ) : (
            <>
              {sizes?.map((el) => (
                <div
                  className={
                    activeSize === el
                      ? "sizes-modal-button-active"
                      : "sizes-modal-button"
                  }
                  key={el}
                  onClick={() => setActiveSize(el)}
                >
                  {el}
                </div>
              ))}
            </>
          )}
        </>
      );
      return dataBoxDiv;
    }
    if (modalStyle === "SOCI") {
      let dataBoxDiv = (
        <>
          <span className="mainSociWordBoxCard">
            <PeopleAltIcon /> TIPUS DE SOCI/A / &nbsp;
          </span>
          <div className="sociTypeBox">
            <div
              className={
                isSubscriber ? "professionalSociBox" : "subscriberSociBox"
              }
              onClick={() => setIsSubscriber(true)}
            >
              Subscriptor
            </div>
            <div
              className={
                isSubscriber ? "subscriberSociBox" : "professionalSociBox"
              }
              onClick={() => setIsSubscriber(false)}
            >
              Professional
            </div>
          </div>
        </>
      );
      return dataBoxDiv;
    }
    if (modalStyle === "ACTIVITAT") {
      let dataBoxDiv = (
        <>
          <span className="mainActivitatWordBoxCard">
            <CalendarTodayIcon /> DATA / &nbsp;
          </span>
          <span className="dateLinkActivitatCard">
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
          </span>
          <br />
          <span className="mainActivitatWordBoxCard">
            <LocalAtmIcon /> PREU /{" "}
          </span>
          <span className="priceBoxActivitatCard">{price}</span>
        </>
      );
      return dataBoxDiv;
    }
    return dataBoxDiv;
  };

  return (
    <div>
      <Dialog onClose={handleClose} open={open}>
        {!isMobile && (
          <>
            <Card className="card-general-mobile">
              <ClearIcon className="close-modal" onClick={handleClose} />
              <div className="frame-margin-modal">
                <div className="row top-title-price-modal">
                  <div className="top-title-price-modal-col1">
                    <div className="title-modal">{title}</div>
                  </div>
                  <div className="top-title-price-modal-col2">
                    <div className="title-modal-price">
                      {formatPrice(price)}
                    </div>
                  </div>
                </div>
                <hr className="modal-solid" />

                {modalStyle === "ACTIVITAT" && (
                  <div className="cardLocation">
                    <span className="mainActivitatWordBoxCard">
                      <LocationOnIcon /> LOCALITZACIÓ / &nbsp;
                    </span>
                    <span className="addressLinkActivitatCard">
                      <a
                        href="https://google.com/maps"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {address}
                      </a>
                    </span>
                  </div>
                )}

                <div className="img-modal">
                  <ImageCarousel imgList={imgArr} />
                </div>
                <hr className="modal-solid" />
                <div className="size-description-modal-box">
                  <div>
                    <div className="column">{interactiveDataBox()}</div>
                    <div className="column">
                      <CardActions>
                        <Button
                          variant="contained"
                          color="primary"
                          buttonSize="boton--medium"
                          buttonStyle="boton--primary--solid"
                          icon={buttonIcon}
                          onClick={() => {
                            handleAddClick(id);
                          }}
                        >
                          {buttonText}
                        </Button>
                      </CardActions>
                    </div>
                  </div>
                </div>
                <hr className="modal-dashed" />
                <div className="description-modal-title">{box1Title}</div>
                <div className="description-modal-content">{box1Text}</div>
                {box2Title && (
                  <>
                    <hr className="modal-dashed" />
                    <div className="description-modal-title">{box2Title}</div>
                    <div className="description-modal-content">{box2Text}</div>
                  </>
                )}
                <hr className="modal-solid" />
              </div>
            </Card>
          </>
        )}

        {isMobile && (
          <Card className="card-general-mobile">
            <ClearIcon className="close-modal" onClick={handleClose} />
            <div className="frame-margin-modal-mobile">
              <hr className="thin" />
              <div className="title-modal">{title}</div>
              <hr className="thin" />
              <div className="img-modal">
                <ImageCarousel imgList={imgArr} />
              </div>
              <hr className="thin" />
              <div className="description-modal">
                <span className="description-modal-title-mobile">
                  {box1Title}
                </span>
                <p className="description-modal-content">{box1Text}</p>
              </div>
              <hr className="thin" />
              <div className="sizes-modal">{interactiveDataBox()}</div>
              <Button
                variant="contained"
                color="primary"
                buttonSize="boton--megaxxl"
                buttonStyle="boton--primary--solid"
                icon={buttonIcon}
                onClick={() => {
                  handleAddClick(id);
                }}
              >
                {buttonText} - {formatPrice(price)}
              </Button>
            </div>
          </Card>
        )}
      </Dialog>
    </div>
  );
}
