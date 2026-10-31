import React, { useState } from 'react';
import { useFeedback } from '../context/FeedbackContext';
import MetricCard from '../components/MetricCard';
import CourseCard from '../components/CourseCard';
import SubmissionDetailsModal from '../components/SubmissionDetailsModal';
import { Link } from 'react-router-dom';

export default function DashboardPage() {
  const {
    student,
    courses,
    filter,
    setFilter,
    totalCourses,
    completedCourses,
    pendingCourses,
    completionPercentage,
    resetAllData
  } = useFeedback();

  const [selectedCourseForModal, setSelectedCourseForModal] = useState(null);

  // Filtered course list
  const filteredCourses = courses.filter((c) => {
    if (filter === 'pending') return c.status === 'pending';
    if (filter === 'completed') return c.status === 'completed';
    return true;
  });

  return (
    <div style={{ padding: '2rem 0', flex: 1 }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* Section 1: Welcome Banner / Alert Header */}
        <section className="card" style={{
          position: 'relative',
          overflow: 'hidden',
          padding: '1.75rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          backgroundColor: '#ffffff'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.25rem'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                <span className="badge badge-primary">
                  <i className="bi bi-mortarboard-fill"></i> Student Portal Active
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-secondary)' }}>
                  Session 2024–2025
                </span>
              </div>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-on-surface)', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                Welcome back, {student.name}!
              </h1>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-secondary)', marginTop: '0.2rem' }}>
                {student.program} — {student.semester} • Roll No: <strong>{student.rollNo}</strong>
              </p>
            </div>

            {/* Active Window Countdown Pill */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              backgroundColor: 'var(--color-amber-bg)',
              border: '1px solid var(--color-amber-border)',
              borderRadius: 'var(--radius-xl)',
              padding: '0.85rem 1.25rem'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: '#fef3c7',
                color: 'var(--color-amber-text)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
                flexShrink: 0
              }}>
                <i className="bi bi-alarm-fill"></i>
              </div>
              <div>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-amber-text)', letterSpacing: '0.05em', display: 'block' }}>
                  Mid-Term Evaluation Window
                </span>
                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#451a03' }}>
                  Closes in <span style={{ textDecoration: 'underline', color: 'var(--color-amber-text)' }}>{student.daysRemaining} Days</span> ({student.evaluationDeadline})
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: 4 KPI Summary Cards */}
        <section className="kpi-grid">
          <MetricCard
            title="Total Enrolled"
            value={`${totalCourses} Courses`}
            subtitle="Full Semester Load"
            badge="Sem III"
            color="primary"
            icon={<i className="bi bi-book-half"></i>}
          />
          <MetricCard
            title="Feedback Submitted"
            value={`${completedCourses} Completed`}
            subtitle={`+${completedCourses} verified submissions`}
            badge={`${completionPercentage}%`}
            color="emerald"
            icon={<i className="bi bi-check-circle-fill"></i>}
          />
          <MetricCard
            title="Pending Action"
            value={`${pendingCourses} Pending`}
            subtitle={pendingCourses > 0 ? "Requires Immediate Submission" : "All Feedback Completed"}
            badge={pendingCourses > 0 ? "Action Req." : "All Done"}
            color={pendingCourses > 0 ? "amber" : "emerald"}
            icon={<i className="bi bi-clock-history"></i>}
          />
          <MetricCard
            title="Completion Rate"
            value={`${completionPercentage}%`}
            subtitle={`Progress: ${completedCourses} of ${totalCourses}`}
            progress={completionPercentage}
            color="primary"
            icon={<i className="bi bi-pie-chart-fill"></i>}
          />
        </section>

        {/* Section 3: Course Feedback Grid */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            borderBottom: '1px solid var(--color-border)',
            paddingBottom: '1rem'
          }}>
            <div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-on-surface)' }}>
                Enrolled MCA Courses & Feedback Status
              </h2>
              <p style={{ fontSize: '0.8125rem', color: 'var(--color-secondary)' }}>
                Evaluate instructional quality, syllabus coverage, and laboratory sessions
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {/* Filter Tabs */}
              <div className="filter-pill-group">
                <button
                  onClick={() => setFilter('all')}
                  className={`filter-pill ${filter === 'all' ? 'active' : ''}`}
                >
                  All ({totalCourses})
                </button>
                <button
                  onClick={() => setFilter('pending')}
                  className={`filter-pill ${filter === 'pending' ? 'active' : ''}`}
                >
                  Pending ({pendingCourses})
                </button>
                <button
                  onClick={() => setFilter('completed')}
                  className={`filter-pill ${filter === 'completed' ? 'active' : ''}`}
                >
                  Completed ({completedCourses})
                </button>
              </div>

              {/* Demo Reset */}
              <button
                onClick={resetAllData}
                title="Reset demo data to initial state"
                style={{ fontSize: '0.75rem', color: 'var(--color-secondary)', padding: '0.4rem 0.6rem', border: '1px dashed var(--color-border)', borderRadius: 'var(--radius-md)' }}
              >
                <i className="bi bi-arrow-counterclockwise"></i> Reset Demo
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="course-grid">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onViewDetails={(c) => setSelectedCourseForModal(c)}
              />
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '3rem',
              backgroundColor: '#ffffff',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--color-border)'
            }}>
              <i className="bi bi-inbox" style={{ fontSize: '2.5rem', color: 'var(--color-secondary)' }}></i>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '0.5rem' }}>No Courses Found</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-secondary)' }}>
                There are no courses matching the "{filter}" filter.
              </p>
            </div>
          )}
        </section>

      </div>

      {/* Submission Detail Modal */}
      {selectedCourseForModal && (
        <SubmissionDetailsModal
          course={selectedCourseForModal}
          onClose={() => setSelectedCourseForModal(null)}
        />
      )}
    </div>
  );
}
