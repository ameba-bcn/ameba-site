import React, { Suspense } from "react";
import FullscreenSpinner from "../components/spinner/FullscreenSpinner";
import lazyWithRetry from "../utils/lazyWithRetry";

const PasswordRecovery = lazyWithRetry(() => import("./PasswordRecovery"));

const LoadablePasswordRecovery = (props) => (
  <Suspense fallback={<FullscreenSpinner {...props} />}>
    <PasswordRecovery {...props} />
  </Suspense>
);

// eslint-disable-next-line react/display-name
export default (props) => <LoadablePasswordRecovery {...props} />;
