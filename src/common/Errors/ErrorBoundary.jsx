// ErrorBoundary.jsx
import React, { Component } from "react";
import Error404 from "./Error404";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can log error messages to an error reporting service here
    console.error("Uncaught error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      // Render the error page as a fallback UI
      return <Error404 />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
