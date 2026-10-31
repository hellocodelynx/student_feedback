import React from 'react';

const LIKERT_LABELS = {
  1: 'Poor',
  2: 'Fair',
  3: 'Good',
  4: 'Very Good',
  5: 'Excellent'
};

export default function EvaluationCriteriaRow({ criteria, index, currentScore, onSelectScore }) {
  return (
    <div
      style={{
        padding: '1.25rem',
        borderRadius: 'var(--radius-xl)',
        backgroundColor: currentScore ? 'var(--color-surface-container-low)' : '#ffffff',
        border: `1px solid ${currentScore ? 'var(--color-primary-fixed)' : 'var(--color-border)'}`,
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        transition: 'all var(--transition-fast)'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', gap: '0.85rem', flex: 1, minWidth: '260px' }}>
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: currentScore ? 'var(--color-primary-container)' : 'var(--color-surface-container)',
            color: currentScore ? '#ffffff' : 'var(--color-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.8125rem',
            fontWeight: 800,
            flexShrink: 0
          }}>
            {index + 1}
          </div>
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: '0.2rem' }}>
              {criteria.title}
            </h4>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-secondary)', lineHeight: 1.5 }}>
              {criteria.description}
            </p>
          </div>
        </div>

        {/* Selected Label pill */}
        {currentScore && (
          <span style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            padding: '0.2rem 0.6rem',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--color-primary-fixed)',
            color: 'var(--color-on-primary-fixed)'
          }}>
            Score: {currentScore}/5 ({LIKERT_LABELS[currentScore]})
          </span>
        )}
      </div>

      {/* Likert 1 to 5 Buttons Row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.5rem',
        paddingTop: '0.5rem',
        borderTop: '1px dashed var(--color-border)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          {[1, 2, 3, 4, 5].map((val) => {
            const isSelected = currentScore === val;
            return (
              <button
                key={val}
                type="button"
                onClick={() => onSelectScore(criteria.id, val)}
                className={`likert-btn ${isSelected ? 'selected' : ''}`}
                title={`${val} - ${LIKERT_LABELS[val]}`}
              >
                <span>{val}</span>
              </button>
            );
          })}
        </div>

        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: 'var(--color-secondary)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-rose)' }}></span>
            1 = Needs Imp.
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-emerald)' }}></span>
            5 = Outstanding
          </span>
        </div>
      </div>
    </div>
  );
}
