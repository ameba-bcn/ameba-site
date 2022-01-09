import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import DiscountCode from "../forms/DiscountForm/DiscountCode";
import ErrorBox from "../forms/error/ErrorBox";
import {
  ReviewContent,
  ReviewFooter,
  ReviewRowSeparator,
  ReviewTotalRow,
} from "./Review.style";
import TableProducts from "./TableProducts";

function Review({ setError: setCheckoutError }, error) {
  const [t] = useTranslation("translation");
  const { cart_data = {} } = useSelector((state) => state.cart);
  const { total } = cart_data;

  return (
    <ReviewContent>
      <ReviewTotalRow>
        <div> Total</div>
        <div> {total}</div>
      </ReviewTotalRow>
      <ReviewRowSeparator isBig={true} />
      <TableProducts setError={setCheckoutError} />
      <ReviewRowSeparator isBig={true} />
      <DiscountCode />
      <ReviewRowSeparator isBig={true} />
      <ReviewFooter>
        {t("checkout.review-footer-1")} <br />
        {t("checkout.review-footer-2")} <br />
        {t("checkout.review-footer-3")}
      </ReviewFooter>
      {error === true && <ErrorBox isError={error} />}
    </ReviewContent>
  );
}

export default Review;
