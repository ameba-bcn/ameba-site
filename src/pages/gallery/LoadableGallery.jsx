import React, { Suspense } from "react";
import FullscreenSpinner from "../../components/spinner/FullscreenSpinner";

const GalleryView = React.lazy(() =>
  import("./Gallery" /* webpackChunkName: "Gallery" */)
);

const LoadableGallery = (props) => (
  <Suspense fallback={<FullscreenSpinner {...props} />}>
    <GalleryView {...props} />
  </Suspense>
);

// eslint-disable-next-line react/display-name
export default (props) => <LoadableGallery {...props} />;
