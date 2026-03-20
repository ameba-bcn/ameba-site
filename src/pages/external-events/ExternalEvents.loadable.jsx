import React, { Suspense } from "react";
import FullscreenSpinner from "../../components/spinner/FullscreenSpinner";
import lazyWithRetry from "../../utils/lazyWithRetry";

const ExternalEventsView = lazyWithRetry(() => import("./ExternalEvents"));

const ExternalEventsLoadable = (props) => (
  <Suspense fallback={<FullscreenSpinner {...props} />}>
    <ExternalEventsView {...props} />
  </Suspense>
);

// eslint-disable-next-line react/display-name
export default (props) => <ExternalEventsLoadable {...props} />;
