import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle, AlertTriangle, Info, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '1.5rem',
      right: '1.5rem',
      zIndex: 99999,
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      maxWidth: '420px',
      width: '100%',
      pointerEvents: 'none'
    }}>
      {toasts.map(toast => {
        let borderColor = 'rgba(0, 240, 255, 0.4)';
        let bgGlow = 'rgba(0, 240, 255, 0.1)';
        let Icon = Info;
        let iconColor = '#00f0ff';

        if (toast.type === 'success') {
          borderColor = 'rgba(16, 185, 129, 0.5)';
          bgGlow = 'rgba(16, 185, 129, 0.15)';
          Icon = CheckCircle;
          iconColor = '#10b981';
        } else if (toast.type === 'warning' || toast.type === 'danger') {
          borderColor = 'rgba(245, 158, 11, 0.5)';
          bgGlow = 'rgba(245, 158, 11, 0.15)';
          Icon = AlertTriangle;
          iconColor = '#f59e0b';
        }

        return (
          <div
            key={toast.id}
            style={{
              background: '#0d182e',
              border: `1px solid ${borderColor}`,
              borderRadius: '12px',
              padding: '1rem 1.25rem',
              boxShadow: `0 10px 30px rgba(0,0,0,0.6), 0 0 20px ${bgGlow}`,
              backdropFilter: 'blur(16px)',
              pointerEvents: 'auto',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.85rem',
              animation: 'toastSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <Icon size={20} color={iconColor} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div style={{ flex: 1 }}>
              <div style={{ color: '#ffffff', fontWeight: 600, fontSize: '0.92rem', marginBottom: '0.2rem' }}>
                {toast.title}
              </div>
              <div style={{ color: '#94a3b8', fontSize: '0.82rem', lineHeight: 1.4 }}>
                {toast.message}
              </div>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#64748b',
                cursor: 'pointer',
                padding: '2px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
