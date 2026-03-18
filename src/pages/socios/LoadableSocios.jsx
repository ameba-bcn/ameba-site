import React, { Suspense } from "react";
import FullscreenSpinner from "../../components/spinner/FullscreenSpinner";
import lazyWithRetry from "../../utils/lazyWithRetry";

const SociosView = lazyWithRetry(() => import("./Socios"));

const LoadableSocios = (props) => (
  <Suspense fallback={<FullscreenSpinner {...props} />}>
    <SociosView {...props} />
  </Suspense>
);

// eslint-disable-next-line react/display-name
export default (props) => <LoadableSocios {...props} />;
