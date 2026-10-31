import React from 'react';
import { evaluationCriteria } from '../data/initialData';

export default function SubmissionDetailsModal({ course, onClose }) {
  if (!course || !course.submissionDetails) return null;

  const { submissionDetails } = course;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '2rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <span className="badge badge-completed">
                <i className="bi bi-shield-check"></i> Verified Evaluation Record
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-secondary)' }}>
                {submissionDetails.date} at {submissionDetails.time}
              </span>
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-on-surface)' }}>
              {course.name} ({course.code})
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-secondary)' }}>
              Faculty: <strong>{course.instructor.name}</strong> • {course.type}
            </p>
          </div>
          <button onClick={onClose} style={{ fontSize: '1.5rem', color: 'var(--color-secondary)', padding: '0.25rem' }}>
            ✕
          </button>
        </div>

        {/* Rating summary banner */}
        <div style={{
          backgroundColor: 'var(--color-surface-container-low)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.5rem',
          border: '1px solid var(--color-border)'
        }}>
          <div>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 700, color: 'var(--color-secondary)', letterSpacing: '0.05em' }}>
              Aggregated Score
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.2rem' }}>
              <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                {submissionDetails.rating}
              </span>
              <span style={{ color: 'var(--color-amber)', fontSize: '1.25rem' }}>★★★★★</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-secondary)' }}>/ 5.0</span>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-secondary)', display: 'block' }}>Submission Mode</span>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: submissionDetails.isAnonymous ? 'var(--color-secondary)' : 'var(--color-primary)'
            }}>
              <i className={`bi ${submissionDetails.isAnonymous ? 'bi-incognito' : 'bi-person-check'}`}></i>
              {submissionDetails.isAnonymous ? 'Anonymous' : 'Attributed'}
            </span>
          </div>
        </div>

        {/* 8 Criteria Score List */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Criteria Score Breakdown
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {evaluationCriteria.map((crit, idx) => {
              const score = submissionDetails.scores ? submissionDetails.scores[idx] : 5;
              return (
                <div
                  key={crit.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: '#ffffff',
                    border: '1px solid var(--color-border)',
                    fontSize: '0.85rem'
                  }}
                >
                  <span style={{ color: 'var(--color-on-surface)', fontWeight: 500 }}>
                    {idx + 1}. {crit.title}
                  </span>
                  <span style={{
                    fontWeight: 700,
                    color: score >= 4 ? 'var(--color-emerald-text)' : 'var(--color-amber-text)',
                    backgroundColor: score >= 4 ? 'var(--color-emerald-bg)' : 'var(--color-amber-bg)',
                    padding: '0.15rem 0.6rem',
                    borderRadius: '4px'
                  }}>
                    {score} / 5
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Qualitative Comments */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Qualitative Feedback Remarks
          </h4>
          <blockquote style={{
            padding: '1rem',
            backgroundColor: 'var(--color-surface-container-low)',
            borderRadius: 'var(--radius-md)',
            borderLeft: '4px solid var(--color-primary-container)',
            fontSize: '0.875rem',
            color: 'var(--color-on-surface)',
            fontStyle: 'italic',
            lineHeight: 1.6
          }}>
            "{submissionDetails.comments}"
          </blockquote>
        </div>

        {/* Footer actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <button
            onClick={() => {
              alert(`Receipt for ${course.code} downloaded to your local device.`);
            }}
            className="btn btn-secondary"
          >
            <i className="bi bi-download"></i> Download PDF Receipt
          </button>
          <button onClick={onClose} className="btn btn-primary">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
