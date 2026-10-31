import React from 'react';

export default function MetricCard({ title, value, subtitle, icon, color = 'primary', badge, progress }) {
  const getColorClasses = () => {
    switch (color) {
      case 'emerald':
        return {
          iconBg: 'var(--color-emerald-bg)',
          iconColor: 'var(--color-emerald-text)',
          border: 'var(--color-emerald-border)',
          progressColor: 'var(--color-emerald)'
        };
      case 'amber':
        return {
          iconBg: 'var(--color-amber-bg)',
          iconColor: 'var(--color-amber-text)',
          border: 'var(--color-amber-border)',
          progressColor: 'var(--color-amber)'
        };
      case 'primary':
      default:
        return {
          iconBg: 'var(--color-primary-fixed)',
          iconColor: 'var(--color-primary)',
          border: 'var(--color-border)',
          progressColor: 'var(--color-primary-container)'
        };
    }
  };

  const scheme = getColorClasses();

  return (
    <div className="kpi-card">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-secondary)' }}>
          {title}
        </span>
        <div style={{
          width: '38px',
          height: '38px',
          borderRadius: 'var(--radius-lg)',
          backgroundColor: scheme.iconBg,
          color: scheme.iconColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.2rem'
        }}>
          {icon}
        </div>
      </div>

      <div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.25rem' }}>
          <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-on-surface)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            {value}
          </h3>
          {badge && (
            <span className="badge" style={{
              backgroundColor: scheme.iconBg,
              color: scheme.iconColor,
              border: `1px solid ${scheme.border}`,
              fontSize: '0.7rem'
            }}>
              {badge}
            </span>
          )}
        </div>

        {progress !== undefined ? (
          <div style={{ marginTop: '0.5rem' }}>
            <div style={{
              width: '100%',
              height: '8px',
              backgroundColor: 'var(--color-surface-container)',
              borderRadius: 'var(--radius-full)',
              overflow: 'hidden',
              marginBottom: '0.35rem'
            }}>
              <div style={{
                width: `${progress}%`,
                height: '100%',
                backgroundColor: scheme.progressColor,
                borderRadius: 'var(--radius-full)',
                transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
              }}></div>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-secondary)', display: 'flex', justifyContent: 'space-between' }}>
              <span>{subtitle}</span>
              <span style={{ fontWeight: 600 }}>{progress}%</span>
            </p>
          </div>
        ) : (
          <p style={{ fontSize: '0.775rem', color: 'var(--color-secondary)', fontWeight: 500 }}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
