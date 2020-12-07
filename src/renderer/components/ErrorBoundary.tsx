import React, { Component, ComponentPropsWithoutRef, ReactNode, ErrorInfo } from 'react';
import { UncontrolledAlert } from 'reactstrap';

export interface ErrorBoundaryProps {
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<ComponentPropsWithoutRef<'div'>, ErrorBoundaryProps> {
  // eslint-disable-next-line no-restricted-syntax
  constructor(props: ComponentPropsWithoutRef<'div'>) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch = (error: Error, info: ErrorInfo): void => {
    this.setState({ error, errorInfo: info });
  };

  render = (): ReactNode => {
    if (this.state.errorInfo) {
      return (
        <UncontrolledAlert color="danger">
          <summary>Something went wrong</summary>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            {this.state.errorInfo.componentStack}
          </details>
        </UncontrolledAlert>
      );
    }
    return this.props.children;
  };
}

export default ErrorBoundary;
