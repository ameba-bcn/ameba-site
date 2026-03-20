import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useAuthStore from "../../stores/useAuthStore";
import useDataStore from "../../stores/useDataStore";
import PageLayout from "../../components/layout/PageLayout/PageLayout";
import { MOBILE_NORMAL } from "../../utils/constants";
import useCartStore from "../../stores/useCartStore";
import "../../components/externalEvents/ExternalEvent.css";
import "./Memberships.css";
import ImageCarousel from "../../components/images/ImageCarousel";
import Button from "../../components/button/Button";
import InteractiveModalBox from "../../modals/InteractiveModalBox";
import { toast } from "react-toastify";
import { isMemberCheckout, urlify } from "../../utils/utils";
import { NavLink } from "react-router-dom";
import CartToast from "../../components/toast/CartToast";
import DisclaimerBox from "../../components/disclaimerBox/DisclaimerBox";
import Icon from "../../components/ui/Icon";
import useMediaQuery from "../../hooks/use-media-query";

const Memberships = () => {
  const [t] = useTranslation("translation");
  const { membership = [] } = useDataStore();
  const [productData, setProductData] = useState(membership[0]);
  const isMobile = useMediaQuery(MOBILE_NORMAL);
  const { cart_data = {}, addToCart } = useCartStore();
  const { item_variants = [] } = cart_data;
  const hasMembershipInCart = isMemberCheckout(item_variants);

  const {
    price_range = "",
    images = [],
    datetime = "",
    description = "",
    variants = [],
    benefits = "",
    has_stock = true,
    id = null,
    maps_url = null,
  } = productData || {};

  const colorMode = "";
  const [activeSize, setActiveSize] = useState([]);
  const [selectSizeError, setSelectSizeError] = useState(false);
  const { isLoggedIn } = useAuthStore();
  const modalStyle = "SOCI";
  const productSoldOut = !has_stock;
  const buttonText = t("modal.afegir");
  const box1Title = t("modal.descripcio");
  const box2Title = t("modal.beneficis");
  const checkoutRedirect = isLoggedIn ? "/checkout" : "/login";

  useEffect(() => {
    setProductData(membership[0]);
  }, [membership]);

  const handleAddClick = () => {
    addToCart(variants[0]);
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

  const buttons = [membership[0]?.name];

  return (
    <PageLayout
      className={`membership-box${membership.length === 0 ? " membership-box--empty" : ""}`}
      title={`${t("banners.soci-curt")}!`}
      titleProps={{ autoScale: false, maxSize: 100 }}
      banner={{
        sentence: t("banners.soci-curt"),
        link: "/memberships",
        color: "var(--color-rojo)",
      }}
    >
      {membership.length > 0 ? (
        <div className="external-event-box">
          <div className="rowExternal">
            <div className="external-event__col1">
              <ImageCarousel imgList={images} />
              <div className="external-event__button-box">
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
                  onClick={() => {
                    !productSoldOut && handleAddClick(id);
                  }}
                >
                  {buttonText}
                </Button>
              </div>
            </div>
            <div className="external-event__col2">
              <InteractiveModalBox
                modalStyle={modalStyle}
                isMobile={isMobile}
                productSoldOut={productSoldOut}
                sizes={[]}
                activeSize={activeSize}
                setActiveSize={setActiveSize}
                selectSizeError={selectSizeError}
                setSelectSizeError={setSelectSizeError}
                extraButtons={buttons}
                datetime={datetime}
                handleAddClick={handleAddClick}
                price={price_range}
                maps_url={maps_url}
                colorMode={colorMode}
              />

              <div className="interactiveDataBox-activitat__row">
                <span className="modal-card___title_small">
                  <Icon icon="money" /> <span>{t("modal.preu")} / &nbsp;</span>
                </span>
                <span className="interactiveDataBox-activitat__text-data">
                  {price_range}
                </span>
              </div>
              <div className="modal-card__description-title-external">
                {box1Title}
              </div>
              <div className="modal-card__description-content">
                {urlify(description)}
              </div>
              {box2Title && (
                <>
                  {benefits && (
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
              {hasMembershipInCart && (
                <DisclaimerBox
                  text={
                    <NavLink to={checkoutRedirect}>
                      {t("soci.disclaimer")}
                    </NavLink>
                  }
                  closable
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="disclaimer-frame">
          <DisclaimerBox text="No data available" closable />
        </div>
      )}
    </PageLayout>
  );
};

export default Memberships;
