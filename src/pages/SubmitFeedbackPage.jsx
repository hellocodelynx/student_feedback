import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useFeedback } from '../context/FeedbackContext';
import EvaluationCriteriaRow from '../components/EvaluationCriteriaRow';

export default function SubmitFeedbackPage() {
  const { courses, submitFeedback, evaluationCriteria, showToast } = useFeedback();
  const location = useLocation();
  const navigate = useNavigate();

  // Find course from URL query ?course=xxx or default to first pending course
  const searchParams = new URLSearchParams(location.search);
  const initialCourseId = searchParams.get('course') || courses.find(c => c.status === 'pending')?.id || courses[0]?.id;

  const [selectedCourseId, setSelectedCourseId] = useState(initialCourseId);
  const [scores, setScores] = useState({});
  const [comments, setComments] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [showError, setShowError] = useState(false);

  // Sync when query param changes
  useEffect(() => {
    const param = searchParams.get('course');
    if (param && courses.some(c => c.id === param)) {
      setSelectedCourseId(param);
    }
  }, [location.search, courses]);

  // Current selected course object
  const activeCourse = courses.find(c => c.id === selectedCourseId) || courses[0];
  const isAlreadyCompleted = activeCourse?.status === 'completed';

  const ratedCount = Object.keys(scores).length;
  const totalCriteria = evaluationCriteria.length;
  const progressPercent = Math.round((ratedCount / totalCriteria) * 100);

  const handleScoreChange = (criteriaId, score) => {
    setScores(prev => ({
      ...prev,
      [criteriaId]: score
    }));
    setShowError(false);
  };

  const handleQuickSuggestion = (text) => {
    setComments(prev => (prev ? `${prev} ${text}.` : `${text}.`));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (ratedCount < totalCriteria) {
      setShowError(true);
      showToast(`Please evaluate all 8 parameters before submitting. (${ratedCount} of 8 answered)`, 'error');
      return;
    }

    submitFeedback(activeCourse.id, {
      scores,
      comments,
      isAnonymous
    });

    // Reset local state
    setScores({});
    setComments('');
    navigate('/history');
  };

  return (
    <div style={{ padding: '2rem 0', flex: 1 }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

        {/* Breadcrumb & Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--color-secondary)', marginBottom: '0.35rem' }}>
              <Link to="/" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Dashboard</Link>
              <span>/</span>
              <span>Submit Course Feedback</span>
            </div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-on-surface)' }}>
              Course & Faculty Performance Evaluation
            </h1>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-secondary)' }}>
              Provide anonymous, constructive assessment for academic enhancement and syllabus calibration
            </p>
          </div>

          {/* Course Selector Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <label htmlFor="course-select" style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-secondary)' }}>
              Select Course:
            </label>
            <select
              id="course-select"
              value={selectedCourseId}
              onChange={(e) => {
                setSelectedCourseId(e.target.value);
                setScores({});
                setComments('');
                setShowError(false);
              }}
              style={{
                padding: '0.55rem 1rem',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border)',
                backgroundColor: '#ffffff',
                fontWeight: 600,
                color: 'var(--color-on-surface)',
                fontSize: '0.875rem',
                cursor: 'pointer'
              }}
            >
              {courses.map(c => (
                <option key={c.id} value={c.id}>
                  {c.code} — {c.name} ({c.status === 'completed' ? '✓ Completed' : 'Pending'})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* If course is already completed alert */}
        {isAlreadyCompleted && (
          <div style={{
            backgroundColor: 'var(--color-emerald-bg)',
            border: '1px solid var(--color-emerald-border)',
            borderRadius: 'var(--radius-xl)',
            padding: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <i className="bi bi-check-circle-fill" style={{ fontSize: '1.5rem', color: 'var(--color-emerald-text)' }}></i>
              <div>
                <strong style={{ color: 'var(--color-emerald-text)', display: 'block' }}>
                  Evaluation Already Completed for this Course!
                </strong>
                <span style={{ fontSize: '0.8125rem', color: 'var(--color-emerald-text)' }}>
                  Submitted on {activeCourse.submissionDetails?.date} with score {activeCourse.submissionDetails?.rating} / 5.0.
                </span>
              </div>
            </div>
            <Link to="/history" className="btn btn-secondary btn-sm">
              <i className="bi bi-clock-history"></i> View in Submission History
            </Link>
          </div>
        )}

        {/* 2-Column Evaluation Form Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '2rem'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr)',
            gap: '2rem'
          }}>
            {/* Desktop side-by-side: Left sidebar 340px, Right form content */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '2rem'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '2rem'
              }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2rem'
                }}>
                  {/* Top Bar for Selected Course Profile */}
                  <div className="card" style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '1.5rem',
                    backgroundColor: '#ffffff'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                      <img
                        src={activeCourse.instructor.avatar}
                        alt={activeCourse.instructor.name}
                        style={{
                          width: '64px',
                          height: '64px',
                          borderRadius: 'var(--radius-full)',
                          objectFit: 'cover',
                          border: '2px solid var(--color-primary-fixed)'
                        }}
                      />
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                          <span className="badge badge-primary">{activeCourse.code}</span>
                          <span className="badge badge-neutral">{activeCourse.type}</span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--color-secondary)' }}>{activeCourse.credits} Credits</span>
                        </div>
                        <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-on-surface)' }}>
                          {activeCourse.name}
                        </h2>
                        <p style={{ fontSize: '0.85rem', color: 'var(--color-secondary)' }}>
                          Faculty: <strong>{activeCourse.instructor.name}</strong> • {activeCourse.instructor.title}
                        </p>
                      </div>
                    </div>

                    {/* Circular Progress Meter */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '0.85rem 1.25rem',
                      backgroundColor: 'var(--color-surface-container-low)',
                      borderRadius: 'var(--radius-xl)',
                      border: '1px solid var(--color-border)'
                    }}>
                      <div style={{ position: 'relative', width: '52px', height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="52" height="52" viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)' }}>
                          <circle cx="18" cy="18" r="15.9155" fill="none" stroke="var(--color-surface-container)" strokeWidth="3.5" />
                          <circle
                            cx="18"
                            cy="18"
                            r="15.9155"
                            fill="none"
                            stroke="var(--color-primary-container)"
                            strokeWidth="3.5"
                            strokeDasharray={`${progressPercent}, 100`}
                            strokeLinecap="round"
                            style={{ transition: 'stroke-dasharray 0.3s ease' }}
                          />
                        </svg>
                        <span style={{ position: 'absolute', fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                          {progressPercent}%
                        </span>
                      </div>
                      <div>
                        <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-secondary)', letterSpacing: '0.04em', display: 'block' }}>
                          Evaluation Progress
                        </span>
                        <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--color-on-surface)' }}>
                          {ratedCount} of {totalCriteria} Criteria Rated
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Criteria Matrix */}
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem' }}>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-on-surface)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <i className="bi bi-list-check" style={{ color: 'var(--color-primary)' }}></i>
                        Structured Likert Evaluation (1 = Needs Improvement, 5 = Excellent)
                      </h3>
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-secondary)' }}>
                        All 8 criteria mandatory
                      </span>
                    </div>

                    {showError && (
                      <div style={{
                        padding: '1rem',
                        borderRadius: 'var(--radius-lg)',
                        backgroundColor: 'var(--color-error-container)',
                        color: 'var(--color-on-error-container)',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        <i className="bi bi-exclamation-triangle-fill"></i>
                        <span>Incomplete Form: Please rate all 8 criteria questions before final submission.</span>
                      </div>
                    )}

                    {/* Criteria List */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {evaluationCriteria.map((crit, idx) => (
                        <EvaluationCriteriaRow
                          key={crit.id}
                          criteria={crit}
                          index={idx}
                          currentScore={scores[crit.id]}
                          onSelectScore={handleScoreChange}
                        />
                      ))}
                    </div>

                    {/* Qualitative Remarks Section */}
                    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div>
                        <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: '0.25rem' }}>
                          Qualitative Feedback & Observations
                        </h4>
                        <p style={{ fontSize: '0.8125rem', color: 'var(--color-secondary)' }}>
                          Share specific insights on laboratory demonstrations, code reviews, syllabus pacing, or lecture clarity.
                        </p>
                      </div>

                      {/* Quick Tag Suggestion Pills */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-secondary)', alignSelf: 'center', fontWeight: 600 }}>
                          Quick tags:
                        </span>
                        {[
                          "Clear code architecture",
                          "Engaging lab sessions",
                          "Thorough study materials",
                          "Timely doubt clearance",
                          "Pacing is optimal"
                        ].map((tag, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => handleQuickSuggestion(tag)}
                            style={{
                              fontSize: '0.75rem',
                              padding: '0.25rem 0.65rem',
                              borderRadius: 'var(--radius-full)',
                              backgroundColor: 'var(--color-surface-container)',
                              color: 'var(--color-on-surface-variant)',
                              border: '1px solid var(--color-border)',
                              transition: 'all var(--transition-fast)'
                            }}
                          >
                            + {tag}
                          </button>
                        ))}
                      </div>

                      <textarea
                        rows={4}
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        placeholder="Write constructive observations here (e.g., Prof. Swaminathan explained REST architecture with clean diagrams, though additional focus on JWT authentication would be appreciated)..."
                        style={{
                          width: '100%',
                          padding: '0.85rem 1rem',
                          borderRadius: 'var(--radius-lg)',
                          border: '1px solid var(--color-border)',
                          backgroundColor: 'var(--color-surface-container-low)',
                          color: 'var(--color-on-surface)',
                          fontSize: '0.875rem',
                          lineHeight: 1.6,
                          resize: 'vertical'
                        }}
                      ></textarea>

                      {/* Anonymous Submission Toggle */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.75rem 1rem',
                        backgroundColor: 'var(--color-surface-container)',
                        borderRadius: 'var(--radius-lg)'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <i className="bi bi-incognito" style={{ fontSize: '1.25rem', color: 'var(--color-primary)' }}></i>
                          <div>
                            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-on-surface)', display: 'block' }}>
                              Submit Anonymously
                            </span>
                            <span style={{ fontSize: '0.75rem', color: 'var(--color-secondary)' }}>
                              Your student identity and roll number will be stripped from faculty reports.
                            </span>
                          </div>
                        </div>

                        <label style={{ position: 'relative', display: 'inline-block', width: '44px', height: '24px', cursor: 'pointer' }}>
                          <input
                            type="checkbox"
                            checked={isAnonymous}
                            onChange={(e) => setIsAnonymous(e.target.checked)}
                            style={{ opacity: 0, width: 0, height: 0 }}
                          />
                          <span style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundColor: isAnonymous ? 'var(--color-primary-container)' : '#cbd5e1',
                            borderRadius: '24px',
                            transition: 'all 0.2s ease'
                          }}>
                            <span style={{
                              position: 'absolute',
                              height: '18px',
                              width: '18px',
                              left: isAnonymous ? '23px' : '3px',
                              bottom: '3px',
                              backgroundColor: '#ffffff',
                              borderRadius: '50%',
                              transition: 'all 0.2s ease'
                            }}></span>
                          </span>
                        </label>
                      </div>

                      {/* Submit Action Row */}
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '0.5rem' }}>
                        <Link to="/" className="btn btn-secondary">
                          Cancel
                        </Link>
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg"
                        >
                          <i className="bi bi-send-check"></i>
                          <span>Submit Official Evaluation</span>
                        </button>
                      </div>

                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
