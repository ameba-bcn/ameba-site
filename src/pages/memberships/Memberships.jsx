import React from "react";
import { useTranslation } from "react-i18next";
import useAuthStore from "../../stores/useAuthStore";
import useDataStore from "../../stores/useDataStore";
import PageLayout from "../../components/layout/PageLayout/PageLayout";
import useCartStore from "../../stores/useCartStore";
import ImageCarousel from "../../components/images/ImageCarousel";
import Button from "../../components/button/Button";
import MembershipDetails from "../../components/cardView/MembershipDetails";
import { toast } from "react-toastify";
import { isMemberCheckout, urlify } from "../../utils/utils";
import { NavLink } from "react-router-dom";
import CartToast from "../../components/toast/CartToast";
import DisclaimerBox from "../../components/disclaimerBox/DisclaimerBox";
import Icon from "../../components/ui/Icon";
import "../../components/cardView/CardView.css";
import "./Memberships.css";

const Memberships = () => {
  const [t] = useTranslation("translation");
  const { membership = [] } = useDataStore();
  const productData = membership[0];
  const { cart_data = {}, addToCart } = useCartStore();
  const { item_variants = [] } = cart_data;
  const hasMembershipInCart = isMemberCheckout(item_variants);

  const {
    price_range = "",
    images = [],
    description = "",
    variants = [],
    benefits = "",
    has_stock = true,
    id = null,
  } = productData || {};

  const productSoldOut = !has_stock;
  const buttonText = t("modal.afegir");
  const box1Title = t("modal.descripcio");
  const box2Title = t("modal.beneficis");
  const { isLoggedIn } = useAuthStore();
  const checkoutRedirect = isLoggedIn ? "/checkout" : "/login";

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

  return (
    <PageLayout
      className={`membership-box${membership.length === 0 ? " membership-box--empty" : ""}`}
      title={`${t("banners.soci-curt")}!`}
      titleProps={{ autoScale: false, maxSize: 160, marginTop: "sm" }}
      banner={{
        sentence: t("banners.soci-curt"),
        link: "/memberships",
        color: "var(--color-rojo)",
      }}
    >
      {membership.length > 0 ? (
        <div className="card-view">
          <div className="card-view__row">
            <div className="card-view__col-image">
              <ImageCarousel imgList={images} />
              <div className="card-view__button-wrapper" style={{ paddingTop: 20 }}>
                <Button
                  variant="contained"
                  color="primary"
                  buttonSize="boton--medium"
                  disabled={productSoldOut}
                  buttonStyle="boton--primary--solid"
                  onClick={() => {
                    !productSoldOut && handleAddClick(id);
                  }}
                >
                  {buttonText}
                </Button>
              </div>
            </div>
            <div className="card-view__col-details">
              <MembershipDetails />
              <div className="interactiveDataBox-activitat__row">
                <span className="modal-card___title_small">
                  <Icon icon="money" /> <span>{t("modal.preu")} / &nbsp;</span>
                </span>
                <span className="interactiveDataBox-activitat__text-data">
                  {price_range}
                </span>
              </div>
              <div className="card-view__description-title">
                {box1Title}
              </div>
              <div className="card-view__description-content">
                {urlify(description)}
              </div>
              {box2Title && benefits && (
                <>
                  <div className="card-view__description-title">
                    {box2Title}
                  </div>
                  <div className="card-view__description-content">
                    {urlify(benefits)}
                  </div>
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
