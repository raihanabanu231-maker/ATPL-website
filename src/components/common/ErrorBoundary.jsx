import React from 'react';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ATPL App Error Caught:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
    window.location.hash = '';
    window.location.href = window.location.origin + window.location.pathname;
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: this.props.compact ? '300px' : '70vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2.5rem 1.5rem',
          backgroundColor: '#060b14',
          color: '#ffffff',
          textAlign: 'center',
          borderRadius: this.props.compact ? '16px' : '0',
          margin: this.props.compact ? '1.5rem' : '0'
        }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '14px',
            backgroundColor: 'rgba(239, 68, 68, 0.12)',
            border: '2px solid rgba(239, 68, 68, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.25rem',
            color: '#ef4444'
          }}>
            <AlertTriangle size={28} />
          </div>

          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.5rem', color: '#ffffff' }}>
            {this.props.title || 'Module View Reload Needed'}
          </h2>
          
          <p style={{ color: '#94a3b8', maxWidth: '480px', lineHeight: 1.5, marginBottom: '1.25rem', fontSize: '0.95rem' }}>
            {this.props.description || 'The requested view or graphics component experienced a temporary rendering glitch. Click below to reload cleanly.'}
          </p>

          {this.state.error && (
            <div style={{
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '8px',
              padding: '1rem',
              maxWidth: '700px',
              width: '100%',
              marginBottom: '1.5rem',
              textAlign: 'left',
              fontFamily: 'monospace',
              fontSize: '0.85rem',
              color: '#fca5a5',
              overflowX: 'auto'
            }}>
              <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                Error: {this.state.error.message || String(this.state.error)}
              </div>
              {this.state.error.stack && (
                <pre style={{ margin: 0, fontSize: '0.75rem', opacity: 0.8, whiteSpace: 'pre-wrap', maxHeight: '150px', overflowY: 'auto' }}>
                  {this.state.error.stack}
                </pre>
              )}
            </div>
          )}

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={this.handleReset}
              style={{
                backgroundColor: '#0071ba',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '0.75rem 1.5rem',
                fontSize: '0.9rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 15px rgba(0, 113, 186, 0.4)'
              }}
            >
              <Home size={16} />
              <span>Return to Homepage</span>
            </button>

            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                padding: '0.75rem 1.5rem',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <RotateCcw size={16} />
              <span>Reload Page</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
