import React from "react";
import * as Sentry from "@sentry/react";
import ErrorPage from "./ErrorPage";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    // to keep track of when an error occurs
    // and the error itself
    this.state = {
      hasError: false,
      error: undefined,
    };
  }

  // update the component state when an error occurs
  static getDerivedStateFromError(error) {
    // specify that the error boundary has caught an error
    return {
      hasError: true,
      error: error,
    };
  }

  // defines what to do when an error gets caught
  componentDidCatch(error, errorInfo) {
    console.error(error);
    console.error(errorInfo);
    Sentry.captureException(error, { extra: errorInfo });
  }
  render() {
    // if an error occurred
    if (this.state.hasError) {
      return <ErrorPage />;
    } else {
      // default behavior
      return this.props.children;
    }
  }
}
