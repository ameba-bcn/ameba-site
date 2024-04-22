import React, { Suspense } from "react";
import FullscreenSpinner from "../../components/spinner/FullscreenSpinner";

const ProjectsView = React.lazy(() =>
  import("./Projects" /* webpackChunkName: "projects" */)
);

const LoadableProjects = (props) => (
  <Suspense fallback={<FullscreenSpinner {...props} />}>
    <ProjectsView {...props} />
  </Suspense>
);

// eslint-disable-next-line react/display-name
export default (props) => <LoadableProjects {...props} />;
