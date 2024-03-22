import React, { Suspense } from "react";
// locals

const LoadingScreen = () => <>Loading</>;

const HomeView = React.lazy(() =>
  import("./Home" /* webpackChunkName: "home" */)
);

const LoadableHome = (props) => (
  <Suspense fallback={<LoadingScreen {...props} />}>
    <HomeView {...props} />
  </Suspense>
);

// eslint-disable-next-line react/display-name
export default (props) => <LoadableHome {...props} />;
