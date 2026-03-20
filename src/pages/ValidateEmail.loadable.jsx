import React, { Suspense } from "react";
import FullscreenSpinner from "../components/spinner/FullscreenSpinner";
import lazyWithRetry from "../utils/lazyWithRetry";

const ValidateEmail = lazyWithRetry(() => import("./ValidateEmail"));

const ValidateEmailLoadable = (props) => (
  <Suspense fallback={<FullscreenSpinner {...props} />}>
    <ValidateEmail {...props} />
  </Suspense>
);

// eslint-disable-next-line react/display-name
export default (props) => <ValidateEmailLoadable {...props} />;
