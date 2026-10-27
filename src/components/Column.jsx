import React from 'react';
import ApplicationCard from './ApplicationCard';

/**
 * Column renders one stage of applications (Applied, Interview, Offer, Rejected).
 * Clean typographic headers and minimalist indicators without emojis.
 */
export default function Column({ status, applications, onMoveStage, onReject, onDelete }) {
  const columnConfig = {
    Applied: {
      label: 'Applied',
      badgeClass: 'col-applied',
      indicatorClass: 'indicator-applied',
    },
    Interview: {
      label: 'Interview',
      badgeClass: 'col-interview',
      indicatorClass: 'indicator-interview',
    },
    Offer: {
      label: 'Offer',
      badgeClass: 'col-offer',
      indicatorClass: 'indicator-offer',
    },
    Rejected: {
      label: 'Rejected',
      badgeClass: 'col-rejected',
      indicatorClass: 'indicator-rejected',
    },
  };

  const config = columnConfig[status] || {
    label: status,
    badgeClass: '',
    indicatorClass: '',
  };

  return (
    <section className={`board-column ${config.badgeClass}`} id={`column-${status.toLowerCase()}`}>
      <div className="column-header">
        <div className="column-title-wrap">
          <span className={`column-status-indicator ${config.indicatorClass}`} aria-hidden="true" />
          <h3 className="column-title">{config.label}</h3>
        </div>
        <span className="column-count-badge" id={`count-${status.toLowerCase()}`}>
          {applications.length}
        </span>
      </div>

      <div className="column-cards-list">
        {applications.length === 0 ? (
          <div className="empty-column-state">
            <div className="empty-icon-wrap" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
            </div>
            <p className="empty-column-text">Nothing here yet.</p>
          </div>
        ) : (
          /* Using application.id as the key, NEVER the index */
          applications.map((app) => (
            <ApplicationCard
              key={app.id}
              application={app}
              onMoveStage={onMoveStage}
              onReject={onReject}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </section>
  );
}
