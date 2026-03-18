import React, { Suspense } from "react";
import FullscreenSpinner from "../../../../components/spinner/FullscreenSpinner";
import lazyWithRetry from "../../../../utils/lazyWithRetry";

const EntrevistaView = lazyWithRetry(() => import("./Entrevista"));

const LoadableEntrevista = (props) => (
  <Suspense fallback={<FullscreenSpinner {...props} />}>
    <EntrevistaView {...props} />
  </Suspense>
);

// eslint-disable-next-line react/display-name
export default (props) => <LoadableEntrevista {...props} />;
