import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import LettersMove from "../components/layout/LettersMove";
import { MOBILE_NORMAL } from "../utils/constants";
import { addToCart } from "../redux/actions/cart";
import {
  StyledExternalButtonBox,
  StyledExternalEventBox,
  StyledExternalEventCol1,
  StyledExternalEventCol2,
  StyledTitleBox,
} from "../components/externalEvents/StyledExternalEvent";
import { ReactFitty } from "react-fitty";
import ImageCarousel from "../components/images/ImageCarousel";
import Button from "../components/button/Button";
import InteractiveModalBox from "../modals/InteractiveModalBox";
import { toast } from "react-toastify";
import { isMemberCheckout, urlify } from "../utils/utils";
import { NavLink } from "react-router-dom";
import CartToast from "../components/toast/CartToast";
import DisclaimerBox from "../components/disclaimerBox/DisclaimerBox";
import Icon from "../components/ui/Icon";
import useMediaQuery from "../hooks/use-media-query";

const SyledMembershipBox = styled.div`
  height: 100%;
  background-color: #fae6c5;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Memberships = () => {
  const [t] = useTranslation("translation");
  const dispatch = useDispatch();
  const { membership = [] } = useSelector((state) => state.data);
  const [productData, setProductData] = useState(membership[0]);
  const isMobile = useMediaQuery(MOBILE_NORMAL);
  const { cart_data = {} } = useSelector((state) => state.cart);
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
  const { isLoggedIn } = useSelector((state) => state.auth);
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
    dispatch(addToCart(variants[0]));
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
    <SyledMembershipBox>
      <>
        {membership.length > 0 ? (
          <StyledExternalEventBox>
            <StyledTitleBox>
              <ReactFitty maxSize={75}>{`${t(
                "banners.soci-curt"
              )}!`}</ReactFitty>
            </StyledTitleBox>
            <div className="rowExternal">
              <StyledExternalEventCol1>
                <ImageCarousel imgList={images} />
                <StyledExternalButtonBox>
                  {/* // eslint-disable-line */}
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
                </StyledExternalButtonBox>
              </StyledExternalEventCol1>
              <StyledExternalEventCol2>
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
                    <Icon icon="money" />{" "}
                    <span>{t("modal.preu")} / &nbsp;</span>
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
                  <NavLink to={checkoutRedirect}>
                    <DisclaimerBox text={t("soci.disclaimer")} />
                  </NavLink>
                )}
              </StyledExternalEventCol2>
            </div>
          </StyledExternalEventBox>
        ) : (
          <DisclaimerBox text="No data available" />
        )}
      </>
      <LettersMove
        className="lettersMoveDiv"
        sentence={t("banners.soci-curt")}
        link="/memberships"
        color="#EB5E3E"
      />
    </SyledMembershipBox>
  );
};

export default Memberships;
