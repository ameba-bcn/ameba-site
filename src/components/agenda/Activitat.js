import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions/cart";
import { Redirect } from "react-router-dom";
import ReceiptIcon from "@material-ui/icons/Receipt";
import ModalCard from "../../modals/ModalCard";
import { useTranslation } from "react-i18next";

export default function ActivitatDialog(props) {
  const { onClose, selectedValue, open, dataRow } = props;
  const {
    id,
    name,
    price_range,
    images,
    description,
    // artists,
    datetime,
    address,
    header='',
    has_stock
  } = dataRow;

  const [redirect, setRedirect] = useState(false);
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const { user_profile = "" } = profile;
  const [t] = useTranslation("translation");

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleAddClick = () => {
    const { variants = [] } = dataRow;
    dispatch(addToCart(variants[0].id));
    handleClose();
    setRedirect(true);
  };
  const checkoutRedirect = user_profile === "LOGGED" ? "/checkout" : "/login";

  if (redirect) return <Redirect to={checkoutRedirect} />;

  return (
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
      // box2Title={"ARTIST / LINE UP"}
      // box2Text={artists}
      type="ACTIVITAT"
      colorMode="light"
      has_stock={has_stock}
    />
  );
}
