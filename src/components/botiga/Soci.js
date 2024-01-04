import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions/cart";
import { Redirect } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ModalCard from "../../modals/ModalCard";
import { useTranslation } from "react-i18next";
import FullscreenSpinner from "../spinner/FullscreenSpinner";

export default function SociDialog(props) {
  const { onClose, open, dataRow = [], setProductData, loading } = props;
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { membership = [] } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const [isSubscriber, setIsSubscriber] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const [t] = useTranslation("translation");
  const adaptedData = dataRow.length > 0 ? dataRow : membership[0];

  const {
    id,
    price_range,
    images,
    description,
    benefits = "",
    has_stock,
    discount = 0,
  } = adaptedData;

  useEffect(() => {
    // component unmount.
    return () => {
      setProductData && setProductData([]);
    };
  }, []);

  const handleClose = () => {
    onClose();
  };

  const handleAddClick = (id) => {
    const selectedMembershipId =
      membership.filter(function (soci) {
        return soci.id === id;
      })[0]?.variants[0] || {};
    dispatch(addToCart(selectedMembershipId));
    onClose();
    setRedirect(true);
  };

  if (redirect) {
    return isLoggedIn ? null : <Redirect to="/login" />;
  }

  return loading ? (
    <FullscreenSpinner />
  ) : (
    <ModalCard
      handleClose={handleClose}
      open={open}
      handleAddClick={handleAddClick}
      id={id}
      title={`${t("banners.soci-curt")}!`}
      price={price_range}
      imgArr={images}
      buttonText={t("modal.afegir")}
      buttonIcon={<ShoppingCartIcon />}
      box1Title={t("modal.descripcio")}
      box1Text={description}
      box2Title={t("modal.beneficis")}
      box2Text={benefits}
      type="SOCI"
      colorMode="dark"
      isSubscriber={isSubscriber}
      setIsSubscriber={setIsSubscriber}
      has_stock={has_stock}
      discount={discount}
    />
  );
}
