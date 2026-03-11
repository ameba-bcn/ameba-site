import React from "react";
import { useTranslation } from "react-i18next";
import DiscountCode from "../forms/DiscountForm/DiscountCode";
import useCartStore from "../../stores/useCartStore";
import "./Review.style.css";
import TableProducts from "./TableProducts";

function Review() {
  const [t] = useTranslation("translation");
  const { cart_data = {} } = useCartStore();
  const { total, item_variants } = cart_data;
  const noAllSub = (element) => element.is_subscription === false;
  const hasNoSubscription = item_variants.some(noAllSub);
  const hasArticle = (element) => element.item_type === "article";

  return (
    <div className="review-content">
      <div className="review-total-row">
        <div> Total</div>
        <div> {total}</div>
      </div>
      <div className="review-row-separator review-row-separator--big" />
      <TableProducts />
      <div className="review-row-separator review-row-separator--big" />
      <DiscountCode />
      <div className="review-row-separator review-row-separator--big" />
      <div className="review-footer">
        {hasNoSubscription ? (
          <>
            {t("checkout.review-footer-1")} <br />
            <br />
            {hasArticle ? (
              <>
                {t("checkout.review-footer-5")} <br />
                <br />
              </>
            ) : null}
            {t("checkout.review-footer-3")}{" "}
          </>
        ) : (
          <>
            {t("checkout.review-footer-1")} <br />
            <br />
            {t("checkout.review-footer-4")}
          </>
        )}
      </div>
    </div>
  );
}

export default Review;
