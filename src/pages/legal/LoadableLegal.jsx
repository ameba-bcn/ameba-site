import React, { Suspense } from "react";
import FullscreenSpinner from "../../components/spinner/FullscreenSpinner";

const LegalView = React.lazy(() =>
  import("./Legal" /* webpackChunkName: "Profile" */)
);

const LoadableLegal = (props) => (
  <Suspense fallback={<FullscreenSpinner {...props} />}>
    <LegalView {...props} />
  </Suspense>
);

// eslint-disable-next-line react/display-name
export default (props) => <LoadableLegal {...props} />;
