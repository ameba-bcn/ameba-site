import React from "react";
import ErrorPage from "./ErrorPage";
import { captureException } from "../../sentry";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    // to keep track of when an error occurs
    // and the error itself
    this.state = {
      hasError: false,
      error: undefined,
      errorInfo: undefined,
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
    // Store error info in state for display
    this.setState({
      errorInfo: errorInfo,
    });

    // Log to console in development
    if (process.env.NODE_ENV === "development") {
      console.log("Error caught by Error Boundary!");
      console.error(error);
      console.error(errorInfo);
    }

    // Send error to Sentry with component stack trace
    captureException(error, {
      errorInfo: errorInfo,
      componentStack: errorInfo?.componentStack,
      errorBoundary: true,
    });
  }

  // Method to reset error boundary
  resetError = () => {
    this.setState({
      hasError: false,
      error: undefined,
      errorInfo: undefined,
    });
  };
  render() {
    // if an error occurred
    if (this.state.hasError) {
      return (
        <ErrorPage
          error={this.state.error}
          resetError={this.resetError}
        />
      );
    } else {
      // default behavior
      return this.props.children;
    }
  }
}
