import React, { Suspense } from "react";
import FullscreenSpinner from "../../components/spinner/FullscreenSpinner";
import lazyWithRetry from "../../utils/lazyWithRetry";

const SubscriptionFinished = lazyWithRetry(() =>
  import("./SubscriptionFinished"),
);

const SubscriptionFinishedLoadable = (props) => (
  <Suspense fallback={<FullscreenSpinner {...props} />}>
    <SubscriptionFinished {...props} />
  </Suspense>
);

// eslint-disable-next-line react/display-name
export default (props) => <SubscriptionFinishedLoadable {...props} />;
