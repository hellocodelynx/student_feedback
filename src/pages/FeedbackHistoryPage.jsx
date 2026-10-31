import React, { useState } from 'react';
import { useFeedback } from '../context/FeedbackContext';
import SubmissionDetailsModal from '../components/SubmissionDetailsModal';
import { Link } from 'react-router-dom';

export default function FeedbackHistoryPage() {
  const { courses, showToast } = useFeedback();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSem, setSelectedSem] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [activeModalCourse, setActiveModalCourse] = useState(null);
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);

  // Filter courses
  const filteredList = courses.filter(course => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      selectedStatus === 'all' || course.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const handleExport = (format) => {
    setIsExportMenuOpen(false);
    showToast(`Generating and downloading ${format} archive for MCA evaluations...`, 'info');
    setTimeout(() => {
      showToast(`Evaluation_Archive_${format}.zip ready in Downloads!`, 'success');
    }, 1500);
  };

  return (
    <div style={{ padding: '2rem 0', flex: 1 }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

        {/* Header and Controls */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.25rem',
          borderBottom: '1px solid var(--color-border)',
          paddingBottom: '1.25rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--color-secondary)', marginBottom: '0.25rem' }}>
              <Link to="/" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Dashboard</Link>
              <span>/</span>
              <span>Submission History</span>
            </div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-on-surface)' }}>
              Feedback Ledger & Evaluation Receipts
            </h1>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-secondary)' }}>
              Audit trail of submitted course assessments, timestamped records, and cryptographically verified receipts
            </p>
          </div>

          {/* Export Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setIsExportMenuOpen(!isExportMenuOpen)}
              className="btn btn-primary"
            >
              <i className="bi bi-download"></i>
              <span>Export CSV / PDF</span>
              <i className="bi bi-chevron-down" style={{ fontSize: '0.75rem' }}></i>
            </button>

            {isExportMenuOpen && (
              <div style={{
                position: 'absolute',
                right: 0,
                marginTop: '0.5rem',
                width: '210px',
                backgroundColor: '#ffffff',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-xl)',
                border: '1px solid var(--color-border)',
                padding: '0.5rem',
                zIndex: 30
              }}>
                <button
                  onClick={() => handleExport('CSV')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: 'var(--color-on-surface)',
                    textAlign: 'left'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface-container-low)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <i className="bi bi-filetype-csv text-emerald-600" style={{ color: 'var(--color-emerald)', fontSize: '1.1rem' }}></i>
                  <span>Export as CSV (.csv)</span>
                </button>
                <button
                  onClick={() => handleExport('PDF')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: 'var(--color-on-surface)',
                    textAlign: 'left'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface-container-low)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <i className="bi bi-file-earmark-pdf text-rose-600" style={{ color: 'var(--color-rose)', fontSize: '1.1rem' }}></i>
                  <span>Export as PDF (.pdf)</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          backgroundColor: '#ffffff',
          padding: '1rem 1.25rem',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--color-border)'
        }}>
          {/* Search Box */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            backgroundColor: 'var(--color-surface-container-low)',
            padding: '0.5rem 0.85rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)',
            flex: 1,
            minWidth: '240px'
          }}>
            <i className="bi bi-search" style={{ color: 'var(--color-secondary)' }}></i>
            <input
              type="text"
              placeholder="Search by course code, course title, or faculty name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                border: 'none',
                background: 'transparent',
                width: '100%',
                outline: 'none',
                fontSize: '0.875rem'
              }}
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} style={{ fontSize: '0.8rem', color: 'var(--color-secondary)' }}>
                ✕
              </button>
            )}
          </div>

          {/* Selectors */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              style={{
                padding: '0.5rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                backgroundColor: '#ffffff',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: 'var(--color-on-surface)'
              }}
            >
              <option value="all">Status: All Records</option>
              <option value="completed">Status: Submitted</option>
              <option value="pending">Status: Pending Action</option>
            </select>

            <select
              value={selectedSem}
              onChange={(e) => setSelectedSem(e.target.value)}
              style={{
                padding: '0.5rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                backgroundColor: '#ffffff',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: 'var(--color-on-surface)'
              }}
            >
              <option value="all">Semester: All (Sem I to III)</option>
              <option value="sem3">Semester III (Current)</option>
              <option value="sem2">Semester II</option>
              <option value="sem1">Semester I</option>
            </select>
          </div>
        </div>

        {/* Ledger Table Card */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{
                  backgroundColor: 'var(--color-surface-container-low)',
                  color: 'var(--color-secondary)',
                  fontSize: '0.725rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontWeight: 700,
                  borderBottom: '1px solid var(--color-border)'
                }}>
                  <th style={{ padding: '0.85rem 1rem', width: '60px', textAlign: 'center' }}>#</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Course Name & Code</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Faculty In-Charge</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Semester</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Submission Timestamp</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Score</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Status</th>
                  <th style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody style={{ divideY: '1px solid var(--color-border)' }}>
                {filteredList.map((course, idx) => {
                  const isSubmitted = course.status === 'completed';
                  return (
                    <tr
                      key={course.id}
                      style={{
                        borderBottom: '1px solid var(--color-border)',
                        transition: 'background-color var(--transition-fast)'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface-container-low)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
                    >
                      <td style={{ padding: '1rem', textAlign: 'center', color: 'var(--color-secondary)', fontWeight: 600 }}>
                        {idx + 1}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <div>
                          <span style={{ fontWeight: 700, color: 'var(--color-on-surface)', display: 'block' }}>
                            {course.name}
                          </span>
                          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                            {course.code} • {course.type}
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                          <img
                            src={course.instructor.avatar}
                            alt={course.instructor.name}
                            style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
                          />
                          <div>
                            <span style={{ fontWeight: 600, color: 'var(--color-on-surface)', display: 'block', fontSize: '0.85rem' }}>
                              {course.instructor.name}
                            </span>
                            <span style={{ fontSize: '0.7rem', color: 'var(--color-secondary)' }}>
                              {course.instructor.title.split(',')[0]}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{
                          backgroundColor: 'var(--color-secondary-container)',
                          color: 'var(--color-on-secondary-fixed)',
                          padding: '0.2rem 0.5rem',
                          borderRadius: '4px',
                          fontSize: '0.75rem',
                          fontWeight: 600
                        }}>
                          Sem III
                        </span>
                      </td>
                      <td style={{ padding: '1rem', color: 'var(--color-secondary)', fontSize: '0.8125rem' }}>
                        {isSubmitted ? (
                          <div>
                            <span style={{ fontWeight: 600, color: 'var(--color-on-surface)', display: 'block' }}>
                              {course.submissionDetails?.date}
                            </span>
                            <span style={{ fontSize: '0.7rem' }}>
                              {course.submissionDetails?.time}
                            </span>
                          </div>
                        ) : (
                          <span style={{ color: 'var(--color-amber-text)', fontStyle: 'italic' }}>
                            Pending (Due {course.deadline})
                          </span>
                        )}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        {isSubmitted ? (
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            padding: '0.2rem 0.6rem',
                            borderRadius: 'var(--radius-full)',
                            backgroundColor: 'var(--color-amber-bg)',
                            color: 'var(--color-amber-text)',
                            fontWeight: 700,
                            fontSize: '0.775rem'
                          }}>
                            ★ {course.submissionDetails?.rating}
                          </span>
                        ) : (
                          <span style={{ color: 'var(--color-secondary)', fontSize: '0.75rem' }}>—</span>
                        )}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        {isSubmitted ? (
                          <span className="badge badge-completed">
                            <i className="bi bi-check-circle-fill"></i> Submitted
                          </span>
                        ) : (
                          <span className="badge badge-pending">
                            <i className="bi bi-clock-history"></i> Pending
                          </span>
                        )}
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'right' }}>
                        {isSubmitted ? (
                          <button
                            onClick={() => setActiveModalCourse(course)}
                            className="btn btn-secondary btn-sm"
                          >
                            <i className="bi bi-eye"></i> View Details
                          </button>
                        ) : (
                          <Link
                            to={`/feedback?course=${course.id}`}
                            className="btn btn-primary btn-sm"
                          >
                            <i className="bi bi-pencil-square"></i> Evaluate Now
                          </Link>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Modal */}
      {activeModalCourse && (
        <SubmissionDetailsModal
          course={activeModalCourse}
          onClose={() => setActiveModalCourse(null)}
        />
      )}
    </div>
  );
}
