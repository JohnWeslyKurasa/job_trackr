import React from 'react';

/**
 * Header component displays application branding and real-time derived metrics.
 * Uses refined wine red and light sand tones with clean SVG iconography.
 */
export default function Header({ totalCount, interviewCount, offerCount }) {
  return (
    <header className="app-header" id="app-header">
      <div className="header-top">
        <div className="brand-group">
          <div className="brand-logo" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
          </div>
          <div>
            <h1 className="brand-title">JobTrackr</h1>
            <p className="brand-tagline">Board UI · React Fundamentals</p>
          </div>
        </div>

        {/* Real-time calculated statistics summary */}
        <div className="header-stats-pill" id="header-stats-pill" aria-label="Application statistics summary">
          <span className="stats-metric-item">
            <strong className="stats-num">{totalCount}</strong> {totalCount === 1 ? 'application' : 'applications'}
          </span>
          <span className="stats-dot" aria-hidden="true">·</span>
          <span className="stats-metric-item stats-interview">
            <strong className="stats-num">{interviewCount}</strong> {interviewCount === 1 ? 'interview' : 'interviews'}
          </span>
          <span className="stats-dot" aria-hidden="true">·</span>
          <span className="stats-metric-item stats-offer">
            <strong className="stats-num">{offerCount}</strong> {offerCount === 1 ? 'offer' : 'offers'}
          </span>
        </div>
      </div>
    </header>
  );
}
