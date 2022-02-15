import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions/cart";
import { Redirect } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ModalCard from "../../modals/ModalCard";
import { useTranslation } from "react-i18next";

export default function SociDialog(props) {
  const { onClose, open } = props;
  const { isLoggedIn } = useSelector((state) => state.auth);
  const data = useSelector((state) => state.data);
  const { membership = [] } = data;
  const dispatch = useDispatch();
  const [isSubscriber, setIsSubscriber] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const [t] = useTranslation("translation");
  const socisSubs =
    membership.filter(function (soci) {
      return soci.name === "Suporter";
    })[0] || {};
  const socisPro =
    membership.filter(function (soci) {
      return soci.name === "Pro";
    })[0] || {};

  const { id, price_range, images } = isSubscriber ? socisSubs : socisPro;

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

  return (
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
      box1Text={
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donecornare nulla eros, eu tempor lorem imperdiet eget. Etiam a metus nulla. Vivamus tempor interdum felis viverra dapibus. Ut cursus magna ut pharetra lobortis. Mauris hendrerit risus ante, sed consectetur tellus vestibulum ut. Fusce ut aliquet erat. Donec in lacus maximus, ullamcorper enim vitae, euismod arcu."
      }
      box2Title={t("modal.beneficis")}
      box2Text={
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donecornare nulla eros, eu tempor lorem imperdiet eget. Etiam a metus nulla. Vivamus tempor interdum felis viverra dapibus. Ut cursus magna ut pharetra lobortis. Mauris hendrerit risus ante, sed consectetur tellus vestibulum ut. Fusce ut aliquet erat. Donec in lacus maximus, ullamcorper enim vitae, euismod arcu."
      }
      type="SOCI"
      colorMode="dark"
      isSubscriber={isSubscriber}
      setIsSubscriber={setIsSubscriber}
    />
  );
}
