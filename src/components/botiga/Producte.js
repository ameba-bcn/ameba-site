import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/actions/cart";
import ModalCard from "../../modals/ModalCard";
import { useTranslation } from "react-i18next";
import FullscreenSpinner from "../spinner/FullscreenSpinner";
import Icon from "../ui/Icon";

export default function ProducteDialog(props) {
  const { onClose, selectedValue, open, dataRow, setProductData, loading } =
    props;
  const {
    id,
    name,
    price_range,
    images,
    description,
    has_stock,
    discount = 0,
    price,
    stock,
  } = dataRow;
  const dispatch = useDispatch();
  const [sizes, setSizes] = useState([]);
  const [t] = useTranslation("translation");

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleAddClick = (size) => {
    const variantsObj = dataRow.variants.filter(
      (x) => x.attributes[0]?.value?.toLowerCase() === size.toLowerCase()
    )[0]?.id;
    const variant_id = variantsObj || "";
    dispatch(addToCart(variant_id));
    handleClose();
  };

  // desmontamos el dialog al cerrarlo
  useEffect(() => {
    return () => {
      setProductData([]);
    };
  }, []);

  useEffect(() => {
    let arr = [];
    if (dataRow.variants) {
      dataRow.variants.forEach((element) => {
        if (element.stock > 0 || element.stock === -1) {
          arr.push(element.attributes[0].value.toUpperCase());
        }
      });
    }
    setSizes(arr);
  }, [dataRow]);

  return loading ? (
    <FullscreenSpinner />
  ) : (
    <ModalCard
      handleClose={handleClose}
      open={open}
      sizes={sizes}
      handleAddClick={handleAddClick}
      id={id}
      title={name}
      price={price}
      price_range={price_range}
      imgArr={images}
      buttonIcon={<Icon icon="shoppingCart" type="hoverable-black" />}
      box1Title={t("modal.descripcio")}
      box1Text={description}
      type="PRODUCTE"
      colorMode="light"
      has_stock={has_stock}
      discount={discount}
      stock={stock}
    />
  );
}
