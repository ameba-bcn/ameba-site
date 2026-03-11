import React from "react";
import { useTranslation } from "react-i18next";
import { MiniTableContent } from "./MiniTableProducts.style";
import useCartStore from "../../stores/useCartStore";

export default function MiniTableProducts() {
  const { cart_data = {} } = useCartStore();
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
