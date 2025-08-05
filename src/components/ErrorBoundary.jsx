import React from "react";

// ErrorBoundary component to catch errors in child components
// It uses the getDerivedStateFromError lifecycle method to update the state
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  // This lifecycle method is called when an error is thrown in a child component
  // It updates the state to indicate that an error has occurred.
  static getDerivedStateFromError() {
    return { hasError: true };
  };

  // This lifecycle method is called when an error is caught
  // It can be used to log the error or perform side effects.
  componentDidCatch(error, info) {
    console.log(error, info);
  }

  // This method renders the fallback UI when an error has occurred
  // It displays a message passed as a prop or a default message.
  render() {
    if (this.state.hasError) {
      return <h4>{this.props.fallback}</h4>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;