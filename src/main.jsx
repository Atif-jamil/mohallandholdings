import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Application Error Caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#062b23] text-white flex flex-col items-center justify-center p-6 text-center font-sans">
          <div className="max-w-md w-full bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl">
            <h1 className="text-2xl font-bold text-[#ffe098] mb-3">Something went wrong</h1>
            <p className="text-xs text-gray-300 mb-6">
              An unexpected error occurred. Please refresh the page to restore your session.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-[#ffe098] text-[#062b23] rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-white transition-colors cursor-pointer"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
)