import React, { Suspense } from "react";
import FullscreenSpinner from "../../components/spinner/FullscreenSpinner";
import lazyWithRetry from "../../utils/lazyWithRetry";

const ProfileView = lazyWithRetry(() => import("./Profile"));

const ProfileLoadable = (props) => (
  <Suspense fallback={<FullscreenSpinner {...props} />}>
    <ProfileView {...props} />
  </Suspense>
);

// eslint-disable-next-line react/display-name
export default (props) => <ProfileLoadable {...props} />;
