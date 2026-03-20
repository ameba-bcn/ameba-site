import React, { Suspense } from "react";
import FullscreenSpinner from "../../components/spinner/FullscreenSpinner";
import lazyWithRetry from "../../utils/lazyWithRetry";

const CheckoutFinished = lazyWithRetry(() => import("./CheckoutFinished"));

const LoadableCheckoutFinished = (props) => (
  <Suspense fallback={<FullscreenSpinner {...props} />}>
    <CheckoutFinished {...props} />
  </Suspense>
);

// eslint-disable-next-line react/display-name
export default (props) => <LoadableCheckoutFinished {...props} />;
