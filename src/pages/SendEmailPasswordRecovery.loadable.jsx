import React, { Suspense } from "react";
import FullscreenSpinner from "../components/spinner/FullscreenSpinner";
import lazyWithRetry from "../utils/lazyWithRetry";

const SendEmailPasswordRecovery = lazyWithRetry(() =>
  import("./SendEmailPasswordRecovery"),
);

const SendEmailPasswordRecoveryLoadable = (props) => (
  <Suspense fallback={<FullscreenSpinner {...props} />}>
    <SendEmailPasswordRecovery {...props} />
  </Suspense>
);

// eslint-disable-next-line react/display-name
export default (props) => <SendEmailPasswordRecoveryLoadable {...props} />;
