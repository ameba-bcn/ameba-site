import React, { Suspense } from "react";
import FullscreenSpinner from "../../components/spinner/FullscreenSpinner";
import lazyWithRetry from "../../utils/lazyWithRetry";

const SupportYourLocalsView = lazyWithRetry(() => import("./SupportYourLocals"));

const LoadableSupportYourLocals = (props) => (
  <Suspense fallback={<FullscreenSpinner {...props} />}>
    <SupportYourLocalsView {...props} />
  </Suspense>
);

// eslint-disable-next-line react/display-name
export default (props) => <LoadableSupportYourLocals {...props} />;
