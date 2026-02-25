import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../store/actions/cart";
import { Redirect } from "react-router-dom";
import ModalCard from "../../../modals/ModalCard";
import { useTranslation } from "react-i18next";
import FullscreenSpinner from "../../../components/spinner/FullscreenSpinner";
import Icon from "../../../components/ui/Icon";

export default function ActivitatDialog(props) {
  const { onClose, selectedValue, open, dataRow, setEventData, loading } =
    props;
  const {
    id,
    name,
    price_range,
    images,
    description,
    datetime,
    discount = 0,
    address,
    header = "",
    has_stock,
    maps_url = null,
    cancelled,
    stock,
    price,
  } = dataRow;

  const [redirect, setRedirect] = useState(false);
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const { user_profile = "" } = profile;
  const [t] = useTranslation("translation");

  const handleClose = () => {
    onClose(selectedValue);
  };
  // desmontamos el dialog al cerrarlo
  useEffect(() => {
    return () => {
      setEventData([]);
    };
  }, []);

  const handleAddClick = () => {
    const { variants = [] } = dataRow;
    dispatch(addToCart(variants[0].id));
    handleClose();
    setRedirect(true);
  };
  const checkoutRedirect = user_profile === "LOGGED" ? "/checkout" : "/login";

  if (redirect) return <Redirect to={checkoutRedirect} />;

  return loading ? (
    <FullscreenSpinner />
  ) : (
    <ModalCard
      handleClose={handleClose}
      open={open}
      handleAddClick={handleAddClick}
      id={id}
      title={name}
      price_range={price_range}
      price={price}
      imgArr={images}
      datetime={datetime}
      address={address}
      buttonIcon={<Icon icon="receipt" type="hoverable-black" />}
      box1Title={t("modal.descripcio")}
      box1Text={description}
      header={header}
      discount={discount}
      type="ACTIVITAT"
      colorMode="light"
      has_stock={has_stock}
      maps_url={maps_url}
      cancelled={cancelled}
      stock={stock}
    />
  );
}
