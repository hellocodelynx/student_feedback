import React from 'react';
import { Link } from 'react-router-dom';

export default function CourseCard({ course, onViewDetails }) {
  const isPending = course.status === 'pending';

  return (
    <div className="course-card">
      <div className={`course-card-accent-strip ${isPending ? 'pending' : 'completed'}`}></div>

      <div>
        {/* Header tags */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
          <span style={{
            fontSize: '0.725rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            backgroundColor: 'var(--color-surface-container-high)',
            color: 'var(--color-on-surface-variant)',
            padding: '0.2rem 0.5rem',
            borderRadius: 'var(--radius-sm)'
          }}>
            {course.code} • {course.type}
          </span>

          {isPending ? (
            <span className="badge badge-pending">
              <i className="bi bi-clock-history"></i> Pending
            </span>
          ) : (
            <span className="badge badge-completed">
              <i className="bi bi-check-circle-fill"></i> Completed
            </span>
          )}
        </div>

        {/* Course title & subtitle */}
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-on-surface)', lineHeight: 1.3, marginBottom: '0.25rem' }}>
          {course.name}
        </h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--color-secondary)', lineHeight: 1.5, minHeight: '2.4rem' }}>
          {course.subtitle}
        </p>

        {/* Instructor Block */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          margin: '1rem 0',
          padding: '0.65rem 0.85rem',
          borderRadius: 'var(--radius-lg)',
          backgroundColor: 'var(--color-surface-container-low)',
          border: '1px solid var(--color-border)'
        }}>
          <img
            src={course.instructor.avatar}
            alt={course.instructor.name}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-full)',
              objectFit: 'cover',
              border: '1px solid var(--color-border-subtle)'
            }}
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--color-secondary)', display: 'block', textTransform: 'uppercase', fontWeight: 600 }}>
              Instructor
            </span>
            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-on-surface)', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {course.instructor.name}
            </span>
            <span style={{ fontSize: '0.7rem', color: 'var(--color-secondary)', display: 'block' }}>
              {course.instructor.cabin}
            </span>
          </div>
        </div>

        {/* Meta info */}
        <div style={{ fontSize: '0.775rem', color: 'var(--color-secondary)', display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Credits:</span>
            <span style={{ fontWeight: 600, color: 'var(--color-on-surface)' }}>{course.credits} Credits</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Evaluation Window:</span>
            {isPending ? (
              <span style={{ fontWeight: 700, color: 'var(--color-amber-text)' }}>
                Deadline: {course.deadline}
              </span>
            ) : (
              <span style={{ fontWeight: 600, color: 'var(--color-emerald-text)' }}>
                Submitted: {course.submissionDetails?.date} (★ {course.submissionDetails?.rating})
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Button */}
      {isPending ? (
        <Link
          to={`/feedback?course=${course.id}`}
          className="btn btn-primary"
          style={{ width: '100%' }}
        >
          <i className="bi bi-pencil-square"></i>
          <span>Submit Feedback</span>
        </Link>
      ) : (
        <button
          onClick={() => onViewDetails && onViewDetails(course)}
          className="btn btn-secondary"
          style={{ width: '100%' }}
        >
          <i className="bi bi-eye"></i>
          <span>View Submission Details</span>
        </button>
      )}
    </div>
  );
}
