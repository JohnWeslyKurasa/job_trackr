import React from 'react';

/**
 * ApplicationCard displays job application details with stage movement,
 * rejection, and deletion actions. Minimalist styling with wine red accents and no emojis.
 */
export default function ApplicationCard({ application, onMoveStage, onReject, onDelete }) {
  const { id, company, role, status, appliedOn, priority } = application;

  const nextStageMap = {
    Applied: 'Interview',
    Interview: 'Offer',
  };

  const nextStage = nextStageMap[status];

  const handleDeleteClick = () => {
    const confirmed = window.confirm(`Are you sure you want to delete "${role} at ${company}"?`);
    if (confirmed) {
      onDelete(id);
    }
  };

  // Format date nicely (e.g. Oct 24, 2026)
  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const [year, month, day] = dateString.split('-');
      const date = new Date(year, month - 1, day);
      return date.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <article className="app-card" id={`app-card-${id}`}>
      <div className="card-top-row">
        <span className={`priority-badge priority-${priority.toLowerCase()}`}>
          {priority} Priority
        </span>
        <button
          type="button"
          className="delete-card-btn"
          onClick={handleDeleteClick}
          title="Delete application"
          id={`delete-btn-${id}`}
          aria-label={`Delete ${role} at ${company}`}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
        </button>
      </div>

      <div className="card-content">
        <h4 className="card-role" title={role}>{role}</h4>
        <p className="card-company">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 21h18M3 7v14M21 7v14M6 7V3h12v4M9 11h2M9 15h2M13 11h2M13 15h2" />
          </svg>
          {company}
        </p>
      </div>

      <div className="card-meta">
        <span className="card-date">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="18" y2="10"></line>
          </svg>
          {formatDate(appliedOn)}
        </span>
      </div>

      <div className="card-actions">
        {nextStage && (
          <button
            type="button"
            className="action-btn advance-btn"
            onClick={() => onMoveStage(id)}
            id={`advance-btn-${id}`}
            title={`Move to ${nextStage}`}
          >
            <span>Advance to {nextStage}</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        )}

        {status === 'Offer' && (
          <div className="card-offer-badge">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>Offer Received</span>
          </div>
        )}

        {status !== 'Rejected' && (
          <button
            type="button"
            className="action-btn reject-btn"
            onClick={() => onReject(id)}
            id={`reject-btn-${id}`}
            title="Mark as Rejected"
          >
            <span>Reject</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}

        {status === 'Rejected' && (
          <div className="card-rejected-badge">
            <span>Archived / Rejected</span>
          </div>
        )}
      </div>
    </article>
  );
}
