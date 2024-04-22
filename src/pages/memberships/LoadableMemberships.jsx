import React, { Suspense } from "react";
import FullscreenSpinner from "../../components/spinner/FullscreenSpinner";

const MembershipsView = React.lazy(() =>
  import("./Memberships" /* webpackChunkName: "Memberships" */)
);

const LoadableMemberships = (props) => (
  <Suspense fallback={<FullscreenSpinner {...props} />}>
    <MembershipsView {...props} />
  </Suspense>
);

// eslint-disable-next-line react/display-name
export default (props) => <LoadableMemberships {...props} />;
