import React from 'react';
import { useFeedback } from '../context/FeedbackContext';

export default function Toast() {
  const { toast } = useFeedback();

  if (!toast) return null;

  const isSuccess = toast.type === 'success';

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 1000,
        backgroundColor: '#ffffff',
        border: `1px solid ${isSuccess ? 'var(--color-emerald-border)' : 'var(--color-primary-fixed)'}`,
        borderLeft: `5px solid ${isSuccess ? 'var(--color-emerald)' : 'var(--color-primary)'}`,
        borderRadius: 'var(--radius-lg)',
        padding: '1rem 1.25rem',
        boxShadow: 'var(--shadow-xl)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        animation: 'slideUp 0.3s ease-out',
        maxWidth: '420px'
      }}
    >
      <div style={{
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        backgroundColor: isSuccess ? 'var(--color-emerald-bg)' : 'var(--color-primary-fixed)',
        color: isSuccess ? 'var(--color-emerald-text)' : 'var(--color-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.1rem',
        flexShrink: 0
      }}>
        <i className={`bi ${isSuccess ? 'bi-check-circle-fill' : 'bi-info-circle-fill'}`}></i>
      </div>
      <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-on-surface)', lineHeight: 1.4 }}>
        {toast.message}
      </div>
    </div>
  );
}
