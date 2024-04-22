import React, { Suspense } from "react";
import FullscreenSpinner from "../../components/spinner/FullscreenSpinner";

const HomeView = React.lazy(() =>
  import("./Home" /* webpackChunkName: "home" */)
);

const LoadableHome = (props) => (
  <Suspense fallback={<FullscreenSpinner {...props} />}>
    <HomeView {...props} />
  </Suspense>
);

// eslint-disable-next-line react/display-name
export default (props) => <LoadableHome {...props} />;
