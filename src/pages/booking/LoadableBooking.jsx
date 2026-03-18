import React, { Suspense } from "react";
import FullscreenSpinner from "../../components/spinner/FullscreenSpinner";
import lazyWithRetry from "../../utils/lazyWithRetry";

const BookingView = lazyWithRetry(() => import("./Booking"));

const LoadableBooking = (props) => (
  <Suspense fallback={<FullscreenSpinner {...props} />}>
    <BookingView {...props} />
  </Suspense>
);

// eslint-disable-next-line react/display-name
export default (props) => <LoadableBooking {...props} />;
