import React, { Suspense } from "react";
import FullscreenSpinner from "../../components/spinner/FullscreenSpinner";

const SociosView = React.lazy(() =>
  import("./Socios" /* webpackChunkName: "socios" */)
);

const LoadableSocios = (props) => (
  <Suspense fallback={<FullscreenSpinner {...props} />}>
    <SociosView {...props} />
  </Suspense>
);

// eslint-disable-next-line react/display-name
export default (props) => <LoadableSocios {...props} />;
