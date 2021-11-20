import React from "react";
import { useSelector } from "react-redux";
import {
  ToastBox,
  ToastLeftInBox,
  ToastRightInBox,
} from "./Toast.style";

export default function Toast() {
  const { cart_data = {} } = useSelector((state) => state.cart);
  const { item_variants = [] } = cart_data;

  return (
      <ToastBox>
        <ToastLeftInBox>
          tens{" "}
          <span>
            {item_variants.length}{" "}
            {item_variants.length > 1 ? "productes" : "producte"}
          </span>{" "}
          a la cistella
        </ToastLeftInBox>
        <ToastRightInBox>{cart_data.total}</ToastRightInBox>
      </ToastBox>
  );
}
