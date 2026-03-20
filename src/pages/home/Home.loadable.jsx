import React, { Suspense } from "react";
import FullscreenSpinner from "../../components/spinner/FullscreenSpinner";
import lazyWithRetry from "../../utils/lazyWithRetry";

const HomeView = lazyWithRetry(() => import("./Home"));

const HomeLoadable = (props) => (
  <Suspense fallback={<FullscreenSpinner {...props} />}>
    <HomeView {...props} />
  </Suspense>
);

// eslint-disable-next-line react/display-name
export default (props) => <HomeLoadable {...props} />;
