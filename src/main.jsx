import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen bg-slate-100 p-6 text-slate-900">
          <div className="mx-auto mt-10 max-w-3xl rounded-lg border border-reliance-line bg-white p-6 shadow-soft">
            <p className="text-sm font-bold uppercase tracking-wide text-reliance-blue">Smart Retail CRM runtime error</p>
            <h1 className="mt-2 text-2xl font-bold text-slate-950">The app hit a render error.</h1>
            <pre className="mt-4 overflow-auto rounded-lg bg-slate-950 p-4 text-sm text-white">
              {this.state.error.message}
            </pre>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
