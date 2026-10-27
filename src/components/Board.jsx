import React from 'react';
import Column from './Column';

/**
 * Board renders the 4 columns of the Kanban workflow ('Applied', 'Interview', 'Offer', 'Rejected')
 * alongside search and priority filter controls.
 */
export default function Board({
  applications,
  searchQuery,
  onSearchChange,
  priorityFilter,
  onPriorityChange,
  onMoveStage,
  onReject,
  onDelete,
}) {
  const statuses = ['Applied', 'Interview', 'Offer', 'Rejected'];

  return (
    <main className="board-container" id="job-board">
      {/* Board Controls: Search and Priority Filter */}
      <section className="board-toolbar" aria-label="Filter applications">
        <div className="search-box-wrapper">
          <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="search"
            id="search-input"
            className="search-input"
            placeholder="Search by company or role..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search by company or role"
          />
          {searchQuery && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => onSearchChange('')}
              title="Clear search"
              aria-label="Clear search"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
        </div>

        <div className="filter-group">
          <label htmlFor="priority-filter" className="filter-label">
            Priority:
          </label>
          <div className="select-wrapper">
            <select
              id="priority-filter"
              className="filter-select"
              value={priorityFilter}
              onChange={(e) => onPriorityChange(e.target.value)}
            >
              <option value="All">All Priorities</option>
              <option value="Low">Low Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="High">High Priority</option>
            </select>
            <span className="select-chevron">▾</span>
          </div>
        </div>
      </section>

      {/* Kanban Columns */}
      <div className="columns-grid">
        {statuses.map((status) => {
          // Derive applications belonging to this column from the filtered applications list
          const columnApps = applications.filter((app) => app.status === status);
          return (
            <Column
              key={status}
              status={status}
              applications={columnApps}
              onMoveStage={onMoveStage}
              onReject={onReject}
              onDelete={onDelete}
            />
          );
        })}
      </div>
    </main>
  );
}
