import React, { Suspense } from "react";
import FullscreenSpinner from "../../components/spinner/FullscreenSpinner";
import lazyWithRetry from "../../utils/lazyWithRetry";

const QrLanding = lazyWithRetry(() => import("./QrLanding"));

const QrLandingLoadable = (props) => (
  <Suspense fallback={<FullscreenSpinner {...props} />}>
    <QrLanding {...props} />
  </Suspense>
);

// eslint-disable-next-line react/display-name
export default (props) => <QrLandingLoadable {...props} />;
