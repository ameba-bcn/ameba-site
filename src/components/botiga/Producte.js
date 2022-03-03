import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { addToCart } from "../../redux/actions/cart";
import ModalCard from "../../modals/ModalCard";
import { useTranslation } from "react-i18next";

export default function ProducteDialog(props) {
  const { onClose, selectedValue, open, dataRow } = props;
  const { id, name, price_range, images, description, has_stock } = dataRow;
  const dispatch = useDispatch();
  const [sizes, setSizes] = useState([]);
  const [t] = useTranslation("translation");

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleAddClick = (size) => {
    const variantsObj = dataRow.variants.filter(x => x.attributes[0].value === size.toLowerCase())[0].id;
    const variant_id = variantsObj || "";
    dispatch(addToCart(variant_id));
    handleClose();
  };

  useEffect(() => {
    let arr = [];
    if (dataRow.variants) {
      dataRow.variants.forEach((element) => {
        if (
          element.stock > 0 || element.stock === -1
          ) {
          arr.push(element.attributes[0].value.toUpperCase());
        }
      });
    }
    setSizes(arr);
  }, [dataRow]);

  return (
    <ModalCard
      handleClose={handleClose}
      open={open}
      sizes={sizes}
      handleAddClick={handleAddClick}
      id={id}
      title={name}
      price={price_range}
      imgArr={images}
      buttonText={t("modal.afegir")}
      buttonIcon={<ShoppingCartIcon />}
      box1Title={t("modal.descripcio")}
      box1Text={description}
      type="PRODUCTE"
      colorMode="light"
      has_stock={has_stock}
    />
  );
}
