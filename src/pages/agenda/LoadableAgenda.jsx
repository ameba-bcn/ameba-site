import React, { Suspense } from "react";
import FullscreenSpinner from "../../components/spinner/FullscreenSpinner";
import lazyWithRetry from "../../utils/lazyWithRetry";

const Agenda = lazyWithRetry(() => import("./Agenda"));

const LoadableAgenda = (props) => (
  <Suspense fallback={<FullscreenSpinner {...props} />}>
    <Agenda {...props} />
  </Suspense>
);

// eslint-disable-next-line react/display-name
export default (props) => <LoadableAgenda {...props} />;
