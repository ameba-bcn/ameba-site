import React, { Suspense } from "react";
import FullscreenSpinner from "../../components/spinner/FullscreenSpinner";
import lazyWithRetry from "../../utils/lazyWithRetry";

const MembershipsView = lazyWithRetry(() => import("./Memberships"));

const MembershipsLoadable = (props) => (
  <Suspense fallback={<FullscreenSpinner {...props} />}>
    <MembershipsView {...props} />
  </Suspense>
);

// eslint-disable-next-line react/display-name
export default (props) => <MembershipsLoadable {...props} />;
