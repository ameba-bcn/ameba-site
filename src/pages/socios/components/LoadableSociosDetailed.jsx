import React, { Suspense } from "react";
import FullscreenSpinner from "../../../components/spinner/FullscreenSpinner";

const SociosDetailedView = React.lazy(() =>
  import("./SociosDetailed" /* webpackChunkName: "sociosDetailed" */)
);

const LoadableSociosDetailed = (props) => (
  <Suspense fallback={<FullscreenSpinner {...props} />}>
    <SociosDetailedView {...props} />
  </Suspense>
);

// eslint-disable-next-line react/display-name
export default (props) => <LoadableSociosDetailed {...props} />;
