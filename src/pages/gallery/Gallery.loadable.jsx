import React, { Suspense } from "react";
import FullscreenSpinner from "../../components/spinner/FullscreenSpinner";
import lazyWithRetry from "../../utils/lazyWithRetry";

const GalleryView = lazyWithRetry(() => import("./Gallery"));

const GalleryLoadable = (props) => (
  <Suspense fallback={<FullscreenSpinner {...props} />}>
    <GalleryView {...props} />
  </Suspense>
);

// eslint-disable-next-line react/display-name
export default (props) => <GalleryLoadable {...props} />;
