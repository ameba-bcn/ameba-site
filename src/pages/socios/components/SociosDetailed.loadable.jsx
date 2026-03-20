import React, { Suspense } from "react";
import FullscreenSpinner from "../../../components/spinner/FullscreenSpinner";
import lazyWithRetry from "../../../utils/lazyWithRetry";

const SociosDetailedView = lazyWithRetry(() => import("./SociosDetailed"));

const SociosDetailedLoadable = (props) => (
  <Suspense fallback={<FullscreenSpinner {...props} />}>
    <SociosDetailedView {...props} />
  </Suspense>
);

// eslint-disable-next-line react/display-name
export default (props) => <SociosDetailedLoadable {...props} />;
