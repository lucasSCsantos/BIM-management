import { Component, type ErrorInfo, type ReactNode } from 'react';

/** Props for {@link ErrorBoundary}. */
export interface ErrorBoundaryProps {
  /** UI rendered when a child throws during render. */
  fallback: ReactNode;
  /** Subtree protected by the boundary. */
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * Generic React error boundary. Isolates render failures in its subtree so the
 * rest of the app keeps working, and logs the error to the console.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    // Log locally for debugging. This is where an observability tool
    // (e.g. Sentry) would be wired up, e.g. Sentry.captureException(error).
    console.error('[ErrorBoundary] Uncaught error:', error, info);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}
