import React, { Suspense } from "react";
import FullscreenSpinner from "../components/spinner/FullscreenSpinner";
import lazyWithRetry from "../utils/lazyWithRetry";

const NotFound = lazyWithRetry(() => import("./NotFound"));

const NotFoundLoadable = (props) => (
  <Suspense fallback={<FullscreenSpinner {...props} />}>
    <NotFound {...props} />
  </Suspense>
);

// eslint-disable-next-line react/display-name
export default (props) => <NotFoundLoadable {...props} />;
