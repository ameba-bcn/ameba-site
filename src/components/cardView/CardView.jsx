import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { productKinds } from "../../utils/constants";
import { urlify } from "../../utils/utils";
import ImageCarousel from "../images/ImageCarousel";
import Icon from "../ui/Icon";
import CartToast from "../toast/CartToast";
import CardViewButton from "./CardViewButton";
import ItemDetails from "./ItemDetails";
import "./CardView.css";

const CardView = ({ productData = {}, kind = "", handleAddClick }) => {
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
    header = "",
    discount = 0,
    price = 0,
    stock = 0,
    cancelled = false,
  } = productData;

  const [t] = useTranslation("translation");
  const navigate = useNavigate();
  const [activeSize, setActiveSize] = useState([]);
  const [selectSizeError, setSelectSizeError] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [copied, setCopied] = useState(false);

  const breadcrumbMap = {
    activitat: { path: "/activitats", label: "ACTIVITATS" },
    producte: { path: "/botiga", label: "BOTIGA" },
    soci: { path: "/memberships", label: "SOCIS" },
  };
  const breadcrumb = breadcrumbMap[kind] || breadcrumbMap.activitat;

  const modalStyle = productKinds.includes(kind)
    ? kind.toUpperCase()
    : productKinds[0].toUpperCase();

  const productSoldOut =
    modalStyle === "PRODUCTE" ? sizes.length === 0 : !has_stock;

  const buttonIcon =
    modalStyle === "ACTIVITAT" ? (
      <Icon icon="receipt" type="hoverable-black" />
    ) : (
      <Icon icon="shoppingCart" type="hoverable-black" />
    );

  const displayTitle =
    modalStyle === "ACTIVITAT"
      ? header || name
      : modalStyle === "SOCI"
        ? `${t("banners.soci-curt")}!`
        : name;

  useEffect(() => {
    if (!variants || variants.length === 0) return;
    const available = [];
    variants.forEach((element) => {
      if (element.attributes && (element.stock > 0 || element.stock === -1)) {
        available.push(element.attributes[0].value.toUpperCase());
      }
    });
    setSizes(available);
  }, [variants]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddToCart = () => {
    if (activeSize.length === 0 && modalStyle === "PRODUCTE") {
      setSelectSizeError(true);
      return;
    }
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
  };

  return (
    <div className="card-view">
      <div className="card-view__breadcrumbs">
        <span onClick={() => navigate(breadcrumb.path)}>
          {breadcrumb.label}
        </span>{" "}
        / {name}
      </div>
      <div className="card-view__header">
        <div className="card-view__title-box">{displayTitle}</div>
      </div>
      <div className="card-view__row">
        <div className="card-view__col-image">
          <ImageCarousel imgList={images} />
          <CardViewButton
            type={modalStyle}
            price={price}
            stock={stock}
            cancelled={cancelled}
            datetime={datetime}
            maps_url={maps_url}
            buttonIcon={buttonIcon}
            onAddToCart={handleAddToCart}
            productSoldOut={productSoldOut}
            activeSize={activeSize}
          />
        </div>
        <div className="card-view__col-details">
          <ItemDetails
            type={modalStyle}
            datetime={datetime}
            address={address}
            maps_url={maps_url}
            price={price}
            price_range={price_range}
            discount={discount}
            stock={stock}
            sizes={sizes}
            activeSize={activeSize}
            setActiveSize={setActiveSize}
            selectSizeError={selectSizeError}
            setSelectSizeError={setSelectSizeError}
            productSoldOut={productSoldOut}
          />
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
          <div className="card-view__description-title">
            {t("modal.descripcio")}
          </div>
          <div className="card-view__description-content">
            {urlify(description)}
          </div>
          {modalStyle === "SOCI" && benefits && (
            <>
              <div className="card-view__description-title">
                {t("modal.beneficis")}
              </div>
              <div className="card-view__description-content">
                {urlify(benefits)}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardView;
