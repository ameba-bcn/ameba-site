import React, { Suspense } from "react";
import FullscreenSpinner from "../../components/spinner/FullscreenSpinner";

const ProfileView = React.lazy(() =>
  import("./Profile" /* webpackChunkName: "Profile" */)
);

const LoadableProfile = (props) => (
  <Suspense fallback={<FullscreenSpinner {...props} />}>
    <ProfileView {...props} />
  </Suspense>
);

// eslint-disable-next-line react/display-name
export default (props) => <LoadableProfile {...props} />;
