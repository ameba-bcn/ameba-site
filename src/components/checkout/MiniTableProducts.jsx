import React from "react";
import { useSelector } from "react-redux";
import { MiniTableContent } from "./MiniTableProducts.style";

export default function MiniTableProducts() {
  const { cart_data = {} } = useSelector((state) => state.cart);
  const { item_variants = [] } = cart_data;

  return (
    <MiniTableContent>
      <tbody>
        {item_variants?.map((item, i) => (
          <tr key={i}>
            <td>{item.name}</td>
            <td>{item.price}</td>
          </tr>
        ))}
      </tbody>
    </MiniTableContent>
  );
}
