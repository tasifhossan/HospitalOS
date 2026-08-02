'use client';

import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary] Caught error:', error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div
          className="flex flex-col items-center justify-center min-h-[300px] p-8 rounded-xl border text-center"
          style={{
            background: 'var(--surface)',
            borderColor: 'var(--danger-muted)',
            boxShadow: 'var(--shadow-glow-danger)',
          }}
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
            style={{ background: 'var(--danger-muted)' }}
          >
            <AlertTriangle className="w-6 h-6" style={{ color: 'var(--danger)' }} />
          </div>

          <h2
            className="text-lg font-semibold mb-2"
            style={{ color: 'var(--text-primary)' }}
          >
            Component Error
          </h2>

          <p className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>
            An unexpected error occurred in this component.
          </p>

          {this.state.error && (
            <code
              className="block text-[11px] font-mono px-3 py-2 rounded-lg mt-2 mb-4 max-w-md break-all"
              style={{
                background: 'var(--background)',
                color: 'var(--danger)',
                border: '1px solid var(--border)',
              }}
            >
              {this.state.error.message}
            </code>
          )}

          <button
            onClick={this.handleReset}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            style={{
              background: 'var(--primary-muted)',
              color: 'var(--primary-hover)',
              border: '1px solid var(--primary-glow)',
            }}
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
