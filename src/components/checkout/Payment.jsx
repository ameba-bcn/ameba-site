import React from "react";
import PaymentForm from "../forms/PaymentForm";
import FreeCheckout from "./FreeCheckout";
import { PaymentContent } from "./Payment.style";
import TableProducts from "./TableProducts";

export default function Payment(props) {
  const { isPaymentFree = false } = props;

  return (
    <PaymentContent>
      <TableProducts isBig={false} />
      {isPaymentFree ? <FreeCheckout /> : <PaymentForm />}
    </PaymentContent>
  );
}
