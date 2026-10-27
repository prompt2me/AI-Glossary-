import React, { Component, ErrorInfo, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class RootErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in AI Glossary:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 text-gray-900">
          <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-gray-200 shadow-sm text-center">
            <h1 className="text-xl font-bold mb-2 text-gray-900">Something went wrong</h1>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              An unexpected error occurred while loading The AI Glossary:
              <br />
              <span className="font-mono text-xs text-red-600 mt-2 block bg-red-50 p-2 rounded border border-red-100">
                {this.state.error?.message || 'Unknown error'}
              </span>
            </p>
            <button
              type="button"
              onClick={() => {
                try {
                  localStorage.clear();
                } catch {}
                window.location.reload();
              }}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
            >
              Reset &amp; Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <RootErrorBoundary>
        <App />
      </RootErrorBoundary>
    </React.StrictMode>
  );
}
