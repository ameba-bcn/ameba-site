import React, { Suspense } from "react";
import FullscreenSpinner from "../components/spinner/FullscreenSpinner";
import lazyWithRetry from "../utils/lazyWithRetry";

const QrClient = lazyWithRetry(() => import("./QrClient"));

const QrClientLoadable = (props) => (
  <Suspense fallback={<FullscreenSpinner {...props} />}>
    <QrClient {...props} />
  </Suspense>
);

// eslint-disable-next-line react/display-name
export default (props) => <QrClientLoadable {...props} />;
