import React, { Suspense } from "react";
import FullscreenSpinner from "../../../../components/spinner/FullscreenSpinner";

const EntrevistaView = React.lazy(() =>
  import("./Entrevista" /* webpackChunkName: "entrevista" */)
);

const LoadableEntrevista = (props) => (
  <Suspense fallback={<FullscreenSpinner {...props} />}>
    <EntrevistaView {...props} />
  </Suspense>
);

// eslint-disable-next-line react/display-name
export default (props) => <LoadableEntrevista {...props} />;
