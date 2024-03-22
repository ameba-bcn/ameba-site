import React, { Suspense } from "react";
import FullscreenSpinner from "../../components/spinner/FullscreenSpinner";

const BookingView = React.lazy(() =>
  import("./Booking" /* webpackChunkName: "booking" */)
);

const LoadableBooking = (props) => (
  <Suspense fallback={<FullscreenSpinner {...props} />}>
    <BookingView {...props} />
  </Suspense>
);

// eslint-disable-next-line react/display-name
export default (props) => <LoadableBooking {...props} />;
