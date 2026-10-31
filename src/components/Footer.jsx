import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="portal-footer">
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2rem',
          paddingBottom: '2rem',
          borderBottom: '1px solid var(--color-border)'
        }}>
          {/* Col 1 */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '6px',
                backgroundColor: 'var(--color-primary-container)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.85rem'
              }}>
                <i className="bi bi-mortarboard-fill"></i>
              </div>
              <span style={{ fontWeight: 700, color: 'var(--color-on-surface)', fontSize: '0.95rem' }}>
                MCA Feedback System
              </span>
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-secondary)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
              University Institute of Technology • Department of Computer Applications. Standardized Course and Faculty Evaluation Framework.
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: 'var(--color-emerald-text)', backgroundColor: 'var(--color-emerald-bg)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
              <i className="bi bi-shield-lock-fill"></i>
              <span>ISO 9001:2015 Academic Quality Assured</span>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-on-surface)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
              Portal Links
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.8125rem' }}>
              <li><Link to="/" style={{ color: 'var(--color-secondary)' }}>Student Dashboard</Link></li>
              <li><Link to="/feedback" style={{ color: 'var(--color-secondary)' }}>Submit Course Feedback</Link></li>
              <li><Link to="/history" style={{ color: 'var(--color-secondary)' }}>Evaluation History & Receipts</Link></li>
              <li><Link to="/analytics" style={{ color: 'var(--color-secondary)' }}>Faculty Sentiment Analytics</Link></li>
              <li><Link to="/profile" style={{ color: 'var(--color-secondary)' }}>Student Academic Profile</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-on-surface)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
              Data Protocol & Security
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.8125rem', color: 'var(--color-secondary)' }}>
              <li>• Anonymity encryption protocol</li>
              <li>• Anti-coercion blind review system</li>
              <li>• Unique student session integrity</li>
              <li>• Internal Quality Assurance Cell (IQAC)</li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-on-surface)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
              Academic Helpdesk
            </h4>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-secondary)', lineHeight: 1.6, marginBottom: '0.5rem' }}>
              Need assistance with your evaluation form or encountering course registration anomalies?
            </p>
            <a href="mailto:support.iqac@campus.edu.in" className="btn btn-secondary btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
              <i className="bi bi-envelope"></i>
              <span>Contact Academic Cell</span>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          paddingTop: '1.25rem',
          fontSize: '0.75rem'
        }}>
          <div>
            © 2024–2026 Department of Computer Applications. All Rights Reserved.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>Privacy Charter</span>
            <span>Evaluation Guidelines</span>
            <span>Student Code of Conduct</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
