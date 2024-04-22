import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { MiniTableContent } from "./MiniTableProducts.style";

export default function MiniTableProducts() {
  const { cart_data = {} } = useSelector((state) => state.cart);
  const { item_variants = [] } = cart_data;
  const [t] = useTranslation("translation");

  return (
    <MiniTableContent>
      <tbody>
        {item_variants?.map((item, i) => (
          <tr key={i}>
            <td>
              {`${item.item_name} `}
              {item?.variant_details?.size !== "unique"
                ? `${t("modal.talla")} ${item?.variant_details?.size}`
                : ""}
            </td>
            <td>{item.price}</td>
          </tr>
        ))}
      </tbody>
    </MiniTableContent>
  );
}
