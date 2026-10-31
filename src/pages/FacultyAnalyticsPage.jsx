import React from 'react';
import { useFeedback } from '../context/FeedbackContext';
import { Link } from 'react-router-dom';

export default function FacultyAnalyticsPage() {
  const { facultyAnalyticsData, courses } = useFeedback();

  return (
    <div style={{ padding: '2rem 0', flex: 1 }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

        {/* Header Breadcrumb */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--color-secondary)', marginBottom: '0.25rem' }}>
              <Link to="/" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Dashboard</Link>
              <span>/</span>
              <span>Faculty Analytics & AI Sentiment</span>
            </div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-on-surface)' }}>
              Institutional Analytics & AI Sentiment Intelligence
            </h1>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-secondary)' }}>
              Comprehensive faculty feedback clustering, NLP sentiment scores, and curriculum health indices
            </p>
          </div>

          <span className="badge badge-primary" style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}>
            <i className="bi bi-cpu-fill"></i> AI Sentiment Engine v4.2 Active
          </span>
        </div>

        {/* 4 Metric Summary Cards */}
        <div className="kpi-grid">
          <div className="kpi-card">
            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-secondary)' }}>
              Net Satisfaction
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', margin: '0.5rem 0' }}>
              <h3 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                {facultyAnalyticsData.overallSatisfaction}
              </h3>
              <span className="badge badge-completed">Top Tier</span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-secondary)' }}>
              Overall department benchmark across 6 courses
            </p>
          </div>

          <div className="kpi-card">
            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-secondary)' }}>
              Average Likert Score
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', margin: '0.5rem 0' }}>
              <h3 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-emerald-text)' }}>
                {facultyAnalyticsData.averageRating}
              </h3>
              <span style={{ color: 'var(--color-amber)', fontSize: '1.1rem' }}>★★★★★</span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-secondary)' }}>
              Scale of 1.0 (Needs Imp.) to 5.0 (Outstanding)
            </p>
          </div>

          <div className="kpi-card">
            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-secondary)' }}>
              Student Response Rate
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', margin: '0.5rem 0' }}>
              <h3 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-on-surface)' }}>
                {facultyAnalyticsData.responseRate}
              </h3>
              <span className="badge badge-primary">High Turnout</span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-secondary)' }}>
              {facultyAnalyticsData.totalResponses} evaluations gathered this cycle
            </p>
          </div>

          <div className="kpi-card">
            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-secondary)' }}>
              Positive Sentiment
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', margin: '0.5rem 0' }}>
              <h3 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-emerald-text)' }}>
                {facultyAnalyticsData.sentimentClusters.positive}
              </h3>
              <span className="badge badge-completed">+4.2% YoY</span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-secondary)' }}>
              Calculated via NLP comment sentiment classification
            </p>
          </div>
        </div>

        {/* Sentiment Distribution Bar */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-on-surface)' }}>
              Sentiment Cluster Distribution
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-secondary)' }}>
              {facultyAnalyticsData.totalResponses} Total Verbatim Responses Analyzed
            </span>
          </div>

          <div style={{
            display: 'flex',
            height: '14px',
            borderRadius: 'var(--radius-full)',
            overflow: 'hidden',
            marginBottom: '1rem',
            backgroundColor: 'var(--color-surface-container)'
          }}>
            <div style={{ width: facultyAnalyticsData.sentimentClusters.positive, backgroundColor: 'var(--color-emerald)' }} title="Positive: 84.2%"></div>
            <div style={{ width: facultyAnalyticsData.sentimentClusters.neutral, backgroundColor: 'var(--color-amber)' }} title="Neutral: 11.6%"></div>
            <div style={{ width: facultyAnalyticsData.sentimentClusters.flagged, backgroundColor: 'var(--color-rose)' }} title="Flagged: 4.2%"></div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '1rem', fontSize: '0.8125rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--color-emerald)' }}></span>
              <span><strong>Positive ({facultyAnalyticsData.sentimentClusters.positive}):</strong> High praise for instruction & labs</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--color-amber)' }}></span>
              <span><strong>Neutral ({facultyAnalyticsData.sentimentClusters.neutral}):</strong> Infrastructure & pacing suggestions</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--color-rose)' }}></span>
              <span><strong>Flagged ({facultyAnalyticsData.sentimentClusters.flagged}):</strong> Hardware / Lab setup issues</span>
            </div>
          </div>
        </div>

        {/* 2-Column: Criteria Breakdown & Live Feedback Stream */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '2rem'
        }}>
          {/* Left: Criteria Breakdown */}
          <div className="card">
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-on-surface)', marginBottom: '1.25rem' }}>
              Parameter Performance Scores (Out of 5.0)
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {facultyAnalyticsData.criteriaBreakdown.map((item, idx) => {
                const percent = (item.score / 5) * 100;
                return (
                  <div key={idx}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                      <span style={{ fontWeight: 600, color: 'var(--color-on-surface)' }}>{item.name}</span>
                      <span style={{ fontWeight: 800, color: 'var(--color-primary)' }}>{item.score} / 5.0</span>
                    </div>
                    <div style={{
                      width: '100%',
                      height: '8px',
                      backgroundColor: 'var(--color-surface-container)',
                      borderRadius: 'var(--radius-full)',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${percent}%`,
                        height: '100%',
                        backgroundColor: percent > 90 ? 'var(--color-emerald)' : 'var(--color-primary-container)',
                        borderRadius: 'var(--radius-full)',
                        transition: 'width 0.5s ease'
                      }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: AI Sentiment Feed Stream */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-on-surface)' }}>
                Real-Time Student Feedback Stream
              </h3>
              <span className="badge badge-neutral">Live Feed</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {facultyAnalyticsData.studentFeedbackFeed.map((item) => {
                const isPositive = item.sentiment === 'Positive';
                return (
                  <div
                    key={item.id}
                    style={{
                      padding: '1rem',
                      borderRadius: 'var(--radius-lg)',
                      backgroundColor: 'var(--color-surface-container-low)',
                      borderLeft: `4px solid ${isPositive ? 'var(--color-emerald)' : 'var(--color-amber)'}`,
                      border: '1px solid var(--color-border)',
                      borderLeftWidth: '4px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                        {item.course}
                      </span>
                      <span style={{ fontSize: '0.725rem', color: 'var(--color-secondary)' }}>
                        {item.timestamp}
                      </span>
                    </div>

                    <p style={{ fontSize: '0.85rem', color: 'var(--color-on-surface)', lineHeight: 1.5, marginBottom: '0.65rem' }}>
                      "{item.text}"
                    </p>

                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                      <span className={`badge ${isPositive ? 'badge-completed' : 'badge-pending'}`}>
                        {item.sentiment} ({item.rating}★)
                      </span>
                      {item.tags.map((tag, tIdx) => (
                        <span key={tIdx} style={{
                          fontSize: '0.7rem',
                          padding: '0.15rem 0.5rem',
                          borderRadius: 'var(--radius-full)',
                          backgroundColor: '#ffffff',
                          border: '1px solid var(--color-border)',
                          color: 'var(--color-secondary)'
                        }}>
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
