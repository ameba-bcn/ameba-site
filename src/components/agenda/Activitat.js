import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions/cart";
import { Redirect } from "react-router-dom";
import ReceiptIcon from "@material-ui/icons/Receipt";
import ModalCard from "../../modals/ModalCard";
import { useTranslation } from "react-i18next";
import FullscreenSpinner from "../spinner/FullscreenSpinner";

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
      price={price_range}
      imgArr={images}
      datetime={datetime}
      address={address}
      buttonText="RESERVA ENTRADA"
      buttonIcon={<ReceiptIcon />}
      box1Title={t("modal.descripcio")}
      box1Text={description}
      header={header}
      discount={discount}
      // box2Title={"ARTIST / LINE UP"}
      // box2Text={artists}
      type="ACTIVITAT"
      colorMode="light"
      has_stock={has_stock}
      maps_url={maps_url}
    />
  );
}
