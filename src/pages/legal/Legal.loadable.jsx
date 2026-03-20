import React, { Suspense } from "react";
import FullscreenSpinner from "../../components/spinner/FullscreenSpinner";
import lazyWithRetry from "../../utils/lazyWithRetry";

const LegalView = lazyWithRetry(() => import("./Legal"));

const LegalLoadable = (props) => (
  <Suspense fallback={<FullscreenSpinner {...props} />}>
    <LegalView {...props} />
  </Suspense>
);

// eslint-disable-next-line react/display-name
export default (props) => <LegalLoadable {...props} />;
