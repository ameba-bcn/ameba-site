import React, { Suspense } from "react";
import FullscreenSpinner from "../components/spinner/FullscreenSpinner";
import lazyWithRetry from "../utils/lazyWithRetry";

const CheckoutPage = lazyWithRetry(() => import("./CheckoutPage"));

const CheckoutPageLoadable = (props) => (
  <Suspense fallback={<FullscreenSpinner {...props} />}>
    <CheckoutPage {...props} />
  </Suspense>
);

// eslint-disable-next-line react/display-name
export default (props) => <CheckoutPageLoadable {...props} />;
