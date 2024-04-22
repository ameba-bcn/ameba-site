import React, { Suspense } from "react";
import FullscreenSpinner from "../../components/spinner/FullscreenSpinner";

const ExternalEventsView = React.lazy(() =>
  import("./ExternalEvents" /* webpackChunkName: "ExternalEvents" */)
);

const LoadableExternalEvents = (props) => (
  <Suspense fallback={<FullscreenSpinner {...props} />}>
    <ExternalEventsView {...props} />
  </Suspense>
);

// eslint-disable-next-line react/display-name
export default (props) => <LoadableExternalEvents {...props} />;
