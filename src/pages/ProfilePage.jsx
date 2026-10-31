import React from 'react';
import { useFeedback } from '../context/FeedbackContext';
import { Link } from 'react-router-dom';

export default function ProfilePage() {
  const { student, courses, showToast } = useFeedback();

  const handleSaveSettings = (e) => {
    e.preventDefault();
    showToast('Student notification preferences updated successfully!', 'success');
  };

  return (
    <div style={{ padding: '2rem 0', flex: 1 }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

        {/* Header Breadcrumb */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--color-secondary)', marginBottom: '0.25rem' }}>
            <Link to="/" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Dashboard</Link>
            <span>/</span>
            <span>Student Profile</span>
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-on-surface)' }}>
            Academic Profile & Identity Registry
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-secondary)' }}>
            Official student dossier and verified institutional credentials
          </p>
        </div>

        {/* 2-Column Profile Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          alignItems: 'start'
        }}>
          {/* Left Column: Student Avatar & Summary */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="card" style={{ textAlign: 'center', padding: '2.5rem 1.5rem' }}>
              <div style={{ position: 'relative', display: 'inline-block', marginBottom: '1.25rem' }}>
                <img
                  src={student.avatar}
                  alt={student.name}
                  style={{
                    width: '110px',
                    height: '110px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '4px solid var(--color-primary-fixed)',
                    boxShadow: 'var(--shadow-md)'
                  }}
                />
                <span style={{
                  position: 'absolute',
                  bottom: '4px',
                  right: '6px',
                  width: '18px',
                  height: '18px',
                  backgroundColor: 'var(--color-emerald)',
                  borderRadius: '50%',
                  border: '3px solid #ffffff'
                }}></span>
              </div>

              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-on-surface)' }}>
                {student.name}
              </h2>
              <span style={{
                display: 'inline-block',
                marginTop: '0.25rem',
                padding: '0.25rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-primary-fixed)',
                color: 'var(--color-on-primary-fixed)',
                fontWeight: 700,
                fontSize: '0.75rem'
              }}>
                Roll No: {student.rollNo}
              </span>

              <p style={{ fontSize: '0.875rem', color: 'var(--color-secondary)', marginTop: '0.75rem', lineHeight: 1.5 }}>
                {student.program}<br />
                {student.department}<br />
                {student.institution}
              </p>

              {/* Status Chips */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '0.75rem',
                marginTop: '1.5rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid var(--color-border)'
              }}>
                <div style={{ backgroundColor: 'var(--color-surface-container-low)', padding: '0.75rem', borderRadius: 'var(--radius-lg)' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--color-secondary)', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>
                    Cumulative GPA
                  </span>
                  <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                    {student.cgpa} / 10.0
                  </span>
                </div>
                <div style={{ backgroundColor: 'var(--color-surface-container-low)', padding: '0.75rem', borderRadius: 'var(--radius-lg)' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--color-secondary)', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>
                    Attendance
                  </span>
                  <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-emerald)' }}>
                    {student.attendance}
                  </span>
                </div>
              </div>
            </div>

            {/* Academic Standing Card */}
            <div className="card">
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <i className="bi bi-award-fill" style={{ color: 'var(--color-primary)' }}></i>
                Official Academic Standing
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
                <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--color-border)', paddingBottom: '0.4rem' }}>
                  <span style={{ color: 'var(--color-secondary)' }}>Academic Status:</span>
                  <span style={{ fontWeight: 700, color: 'var(--color-emerald-text)' }}>Regular / Good Standing</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--color-border)', paddingBottom: '0.4rem' }}>
                  <span style={{ color: 'var(--color-secondary)' }}>Batch Year:</span>
                  <span style={{ fontWeight: 600 }}>2023–2025 (2-Year Program)</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--color-border)', paddingBottom: '0.4rem' }}>
                  <span style={{ color: 'var(--color-secondary)' }}>Registered Email:</span>
                  <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{student.email}</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-secondary)' }}>Faculty Mentor:</span>
                  <span style={{ fontWeight: 600 }}>Dr. Sunita Kulkarni</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Enrolled Courses Ledger & Notification Settings */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Courses Ledger Card */}
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-on-surface)' }}>
                  Semester III Course Ledger ({courses.length} Registered)
                </h3>
                <span className="badge badge-primary">21 Total Credits</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {courses.map(course => (
                  <div
                    key={course.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.85rem 1rem',
                      borderRadius: 'var(--radius-lg)',
                      backgroundColor: 'var(--color-surface-container-low)',
                      border: '1px solid var(--color-border)'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                          {course.code}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-secondary)' }}>• {course.type} ({course.credits} Credits)</span>
                      </div>
                      <span style={{ fontWeight: 700, color: 'var(--color-on-surface)', fontSize: '0.9rem', display: 'block' }}>
                        {course.name}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-secondary)' }}>
                        Instructor: {course.instructor.name}
                      </span>
                    </div>

                    <div>
                      {course.status === 'completed' ? (
                        <span className="badge badge-completed">
                          <i className="bi bi-check-circle-fill"></i> Feedback Submitted
                        </span>
                      ) : (
                        <Link to={`/feedback?course=${course.id}`} className="btn btn-primary btn-sm">
                          Evaluate
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notification & Confidentiality Preferences */}
            <div className="card">
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-on-surface)', marginBottom: '0.5rem' }}>
                Portal Settings & Feedback Privacy
              </h3>
              <p style={{ fontSize: '0.8125rem', color: 'var(--color-secondary)', marginBottom: '1.25rem' }}>
                Manage how your evaluation reminders and departmental communications are handled
              </p>

              <form onSubmit={handleSaveSettings} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                  <div>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-on-surface)', display: 'block' }}>
                      Email Evaluation Window Reminders
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-secondary)' }}>
                      Receive alerts 48 hours prior to the mid-term feedback deadline.
                    </span>
                  </div>
                  <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', accentColor: 'var(--color-primary-container)' }} />
                </label>

                <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                  <div>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-on-surface)', display: 'block' }}>
                      Blind Review Identity Protection
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-secondary)' }}>
                      Strictly mask your student ID across faculty survey exports.
                    </span>
                  </div>
                  <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', accentColor: 'var(--color-primary-container)' }} />
                </label>

                <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                  <div>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-on-surface)', display: 'block' }}>
                      Course Grade Withholding Safeguard
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-secondary)' }}>
                      Ensures faculty cannot view course-specific reports until final end-semester grades are published.
                    </span>
                  </div>
                  <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', accentColor: 'var(--color-primary-container)' }} />
                </label>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                  <button type="submit" className="btn btn-secondary">
                    Save Preferences
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
