import React, { Suspense } from "react";
import FullscreenSpinner from "../components/spinner/FullscreenSpinner";
import lazyWithRetry from "../utils/lazyWithRetry";

const LogSession = lazyWithRetry(() => import("./LogSession"));

const LogSessionLoadable = (props) => (
  <Suspense fallback={<FullscreenSpinner {...props} />}>
    <LogSession {...props} />
  </Suspense>
);

// eslint-disable-next-line react/display-name
export default (props) => <LogSessionLoadable {...props} />;
