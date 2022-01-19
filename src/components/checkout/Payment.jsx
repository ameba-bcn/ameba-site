import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useSelector } from "react-redux";
import PaymentForm from "../forms/Payment/PaymentForm";
import FreeCheckout from "./FreeCheckout";
import MiniTableProducts from "./MiniTableProducts";
import {
  PayementTotalRow,
  PaymentBox,
  PaymentContent,
  PaymentReview,
  PaymentSummaryBox,
} from "./Payment.style";
import { ReviewRowSeparator } from "./Review.style";

export default function Payment(props) {
  const { isPaymentFree = false } = props;
  const { cart_data = {} } = useSelector((state) => state.cart);
  const { checkout = {} } = useSelector((state) => state.cart);
  const { checkout_stripe = {} } = checkout;
  const { client_secret = "" } = checkout_stripe;
  // const client_secret = checkout_stripe?.client_secret
  const { total } = cart_data;
  const stripePromise = loadStripe(
    "pk_test_51KJ0w2IM50kXLNJHbBXee5ZGs9j0EbbmsBjh0bbbp0CXwEh2gr9smi4E68RUEnKvcAcW5o0SxoaHQUFY3vkX725d00s8R9dCco"
  );
  console.log({checkout},{checkout_stripe},{client_secret})
  const options = {
    clientSecret: client_secret,
    appearance: {
      theme: "stripe",
    },
  };

  return (
    <PaymentContent>
      <PaymentSummaryBox>
        <PaymentReview>
          <PayementTotalRow>
            <div> Total</div>
            <div> {total}</div>
          </PayementTotalRow>
          <ReviewRowSeparator isBig={false} />
          <MiniTableProducts />
          <ReviewRowSeparator isBig={false} />
        </PaymentReview>
      </PaymentSummaryBox>
      {checkout_stripe &&<PaymentBox>
        {isPaymentFree ? (
          <FreeCheckout />
        ) : (
          <Elements stripe={stripePromise} options={options}>
            <PaymentForm />
          </Elements>
        )}
      </PaymentBox>}
    </PaymentContent>
  );
}
