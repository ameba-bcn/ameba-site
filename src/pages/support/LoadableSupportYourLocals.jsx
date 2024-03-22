import React, { Suspense } from "react";
import FullscreenSpinner from "../../components/spinner/FullscreenSpinner";

const SupportYourLocalsView = React.lazy(() =>
  import("./SupportYourLocals" /* webpackChunkName: "supportYourLocals" */)
);

const LoadableSupportYourLocals = (props) => (
  <Suspense fallback={<FullscreenSpinner {...props} />}>
    <SupportYourLocalsView {...props} />
  </Suspense>
);

// eslint-disable-next-line react/display-name
export default (props) => <LoadableSupportYourLocals {...props} />;
