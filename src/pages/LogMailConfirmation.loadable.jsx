import React, { Suspense } from "react";
import FullscreenSpinner from "../components/spinner/FullscreenSpinner";
import lazyWithRetry from "../utils/lazyWithRetry";

const LogMailConfirmation = lazyWithRetry(() =>
  import("./LogMailConfirmation"),
);

const LogMailConfirmationLoadable = (props) => (
  <Suspense fallback={<FullscreenSpinner {...props} />}>
    <LogMailConfirmation {...props} />
  </Suspense>
);

// eslint-disable-next-line react/display-name
export default (props) => <LogMailConfirmationLoadable {...props} />;
