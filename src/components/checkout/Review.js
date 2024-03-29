import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import DiscountCode from "../forms/DiscountForm/DiscountCode";
import {
  ReviewContent,
  ReviewFooter,
  ReviewRowSeparator,
  ReviewTotalRow,
} from "./Review.style";
import TableProducts from "./TableProducts";

function Review() {
  const [t] = useTranslation("translation");
  const { cart_data = {} } = useSelector((state) => state.cart);
  const { total, item_variants } = cart_data;
  const noAllSub = (element) => element.is_subscription === false;
  const hasNoSubscription = item_variants.some(noAllSub);
  return (
    <ReviewContent>
      <ReviewTotalRow>
        <div> Total</div>
        <div> {total}</div>
      </ReviewTotalRow>
      <ReviewRowSeparator isBig={true} />
      <TableProducts />
      <ReviewRowSeparator isBig={true} />
      <DiscountCode />
      <ReviewRowSeparator isBig={true} />
      <ReviewFooter>
        {hasNoSubscription ? (
          <>
            {t("checkout.review-footer-1")} <br />
            {t("checkout.review-footer-3")}{" "}
          </>
        ) : (
          <>{t("checkout.review-footer-4")}</>
        )}
      </ReviewFooter>
    </ReviewContent>
  );
}

export default Review;
