import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions/cart";
import { Redirect } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ModalCard from "../../modals/ModalCard";
import { useTranslation } from "react-i18next";
import { MEMBER_LIST, PRO_MEMBER_LIST } from "../../utils/constants";

export default function SociDialog(props) {
  const { onClose, open, dataRow, setProductData } = props;
  const { isLoggedIn } = useSelector((state) => state.auth);
  const data = useSelector((state) => state.data);
  const { membership = [] } = data;
  const dispatch = useDispatch();
  const [isSubscriber, setIsSubscriber] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const [t] = useTranslation("translation");
  const socisSubs =
  dataRow.filter(function (soci) {
      return MEMBER_LIST.includes(soci.name);
    })[0] || {};
  const socisPro =
  dataRow.filter(function (soci) {
      return PRO_MEMBER_LIST.includes(soci.name);
    })[0] || {};
  const { id, price_range, images, description, benefits = "", has_stock } = isSubscriber
    ? socisSubs
    : socisPro;

    useEffect(() => {
      // Anything in here is fired on component mount.
      return () => {
          setProductData([])
      }
  }, [])

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
      box1Text={description}
      box2Title={t("modal.beneficis")}
      box2Text={benefits}
      type="SOCI"
      colorMode="dark"
      isSubscriber={isSubscriber}
      setIsSubscriber={setIsSubscriber}
      has_stock={has_stock}
    />
  );
}
