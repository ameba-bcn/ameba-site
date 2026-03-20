import React, { Suspense } from "react";
import FullscreenSpinner from "../components/spinner/FullscreenSpinner";
import lazyWithRetry from "../utils/lazyWithRetry";

const Botiga = lazyWithRetry(() => import("./Botiga"));

const BotigaLoadable = (props) => (
  <Suspense fallback={<FullscreenSpinner {...props} />}>
    <Botiga {...props} />
  </Suspense>
);

// eslint-disable-next-line react/display-name
export default (props) => <BotigaLoadable {...props} />;
