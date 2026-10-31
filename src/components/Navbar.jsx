import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useFeedback } from '../context/FeedbackContext';

export default function Navbar() {
  const { student, activeRole, setActiveRole, pendingCourses } = useFeedback();
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="portal-header">
      {/* Top Notice Bar */}
      <div className="header-top-bar">
        <div className="container header-top-bar-content">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontWeight: 600, color: 'var(--color-primary)' }}>
              <i className="bi bi-mortarboard-fill"></i> MCA Student Portal
            </span>
            <span>•</span>
            <span>Session: Academic Year 2024–2025</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <i className="bi bi-shield-check text-emerald-600" style={{ color: 'var(--color-emerald)' }}></i>
              <span>Confidential & PDO Secure</span>
            </span>
            <span className="hidden sm:inline-block">•</span>
            <span className="hidden sm:inline-block">Evaluation Closes: Nov 20, 2024</span>
          </div>
        </div>
      </div>

      {/* Main Header Inner */}
      <div className="container header-inner">
        {/* Brand */}
        <Link to="/" className="brand-badge" id="nav-brand-logo">
          <div className="brand-icon-box">
            <svg width="22" height="22" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z" fill="currentColor" />
            </svg>
          </div>
          <div>
            <span className="brand-text-title">MCA Feedback Portal</span>
            <span className="brand-text-sub">Academic Intelligence</span>
          </div>
        </Link>

        {/* Navigation Items */}
        <nav>
          <ul className="nav-links">
            <li>
              <Link to="/" className={`nav-item-link ${isActive('/') ? 'active' : ''}`}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/feedback" className={`nav-item-link ${isActive('/feedback') ? 'active' : ''}`}>
                Submit Feedback
                {pendingCourses > 0 && (
                  <span style={{
                    marginLeft: '0.4rem',
                    padding: '0.1rem 0.45rem',
                    borderRadius: '12px',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    backgroundColor: 'var(--color-amber-bg)',
                    color: 'var(--color-amber-text)',
                    border: '1px solid var(--color-amber-border)'
                  }}>
                    {pendingCourses}
                  </span>
                )}
              </Link>
            </li>
            <li>
              <Link to="/history" className={`nav-item-link ${isActive('/history') ? 'active' : ''}`}>
                Submission History
              </Link>
            </li>
            <li>
              <Link to="/analytics" className={`nav-item-link ${isActive('/analytics') ? 'active' : ''}`}>
                Faculty Analytics
              </Link>
            </li>
            <li>
              <Link to="/profile" className={`nav-item-link ${isActive('/profile') ? 'active' : ''}`}>
                Student Profile
              </Link>
            </li>
          </ul>
        </nav>

        {/* Profile / Actions */}
        <div className="header-user-profile">
          {/* Switch Role Pill */}
          <button
            onClick={() => setActiveRole(activeRole === 'student' ? 'faculty' : 'student')}
            title="Toggle between Student View and Faculty Analytics View"
            style={{
              padding: '0.35rem 0.75rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.75rem',
              fontWeight: 600,
              backgroundColor: activeRole === 'student' ? 'var(--color-surface-container)' : 'var(--color-primary-fixed)',
              color: activeRole === 'student' ? 'var(--color-on-surface-variant)' : 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              border: '1px solid var(--color-border)'
            }}
          >
            <i className={`bi ${activeRole === 'student' ? 'bi-person-badge' : 'bi-graph-up'}`}></i>
            <span>{activeRole === 'student' ? 'Role: Student' : 'Role: Faculty'}</span>
          </button>

          {/* User Avatar */}
          <Link to="/profile" className="user-avatar-wrap" title={`${student.name} (${student.rollNo})`}>
            <img src={student.avatar} alt={student.name} className="user-avatar-img" />
            <span className="status-online-dot"></span>
          </Link>
        </div>
      </div>
    </header>
  );
}
