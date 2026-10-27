import React, { useState } from 'react';
import Header from './components/Header';
import ApplicationForm from './components/ApplicationForm';
import Board from './components/Board';
import './App.css';

// Initial sample job applications for a vivid, instant out-of-the-box experience
const INITIAL_APPLICATIONS = [
  {
    id: 'app-seed-1',
    company: 'Stripe',
    role: 'Frontend Infrastructure Engineer',
    status: 'Interview',
    appliedOn: '2026-10-14',
    priority: 'High',
  },
  {
    id: 'app-seed-2',
    company: 'Vercel',
    role: 'React Framework Specialist',
    status: 'Offer',
    appliedOn: '2026-10-02',
    priority: 'High',
  },
  {
    id: 'app-seed-3',
    company: 'Figma',
    role: 'Design Systems Developer',
    status: 'Applied',
    appliedOn: '2026-10-20',
    priority: 'Medium',
  },
  {
    id: 'app-seed-4',
    company: 'GitHub',
    role: 'Web Platform Engineer',
    status: 'Interview',
    appliedOn: '2026-10-18',
    priority: 'High',
  },
  {
    id: 'app-seed-5',
    company: 'Linear',
    role: 'UI Performance Engineer',
    status: 'Applied',
    appliedOn: '2026-10-24',
    priority: 'Medium',
  },
  {
    id: 'app-seed-6',
    company: 'Spotify',
    role: 'Client App Developer',
    status: 'Rejected',
    appliedOn: '2026-09-28',
    priority: 'Low',
  },
];

export default function App() {
  // All applications kept in one lifted-up state
  const [applications, setApplications] = useState(INITIAL_APPLICATIONS);

  // Filters state (only query and priority are stored; the filtered list is strictly derived during render)
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');

  /**
   * =========================================================================================
   * WHY apps.push(x); setApps(apps) DOES NOT RE-RENDER:
   * 
   * In React, state comparisons rely on shallow equality via Object.is (reference checking).
   * When you execute `apps.push(x)`, you mutate the existing array in memory directly, meaning
   * the reference pointer of `apps` remains completely identical.
   * 
   * When you subsequently invoke `setApps(apps)`, React compares the previous state reference
   * to the incoming state reference: `Object.is(previousState, nextState)`.
   * Because both point to the exact same array object in heap memory, React concludes that
   * state has not changed. Consequently, React bails out of scheduling a re-render, and the UI
   * will NOT update to reflect the newly pushed item.
   * 
   * To trigger a re-render correctly, React requires an immutable update: creating a brand-new
   * array reference using array spread `[...apps, x]`, `map()`, or `filter()`. This gives
   * React a new memory reference, signaling that state changed and triggering a UI re-render.
   * =========================================================================================
   */

  // 1. Immutable Add Application using array spread
  const handleAddApplication = (newApp) => {
    setApplications((prevApps) => [newApp, ...prevApps]);
  };

  // 2. Immutable Move to Next Stage using map
  const handleMoveStage = (id) => {
    const stageTransition = {
      Applied: 'Interview',
      Interview: 'Offer',
    };

    setApplications((prevApps) =>
      prevApps.map((app) => {
        if (app.id === id) {
          const nextStatus = stageTransition[app.status] || app.status;
          return { ...app, status: nextStatus };
        }
        return app;
      })
    );
  };

  // 3. Immutable Mark as Rejected using map
  const handleReject = (id) => {
    setApplications((prevApps) =>
      prevApps.map((app) => (app.id === id ? { ...app, status: 'Rejected' } : app))
    );
  };

  // 4. Immutable Delete using filter
  const handleDelete = (id) => {
    setApplications((prevApps) => prevApps.filter((app) => app.id !== id));
  };

  /**
   * DERIVED VALUES (Calculated during render, NEVER stored in state):
   */
  // Derived metric counts for Header:
  const totalCount = applications.length;
  const interviewCount = applications.filter((app) => app.status === 'Interview').length;
  const offerCount = applications.filter((app) => app.status === 'Offer').length;

  // Derived filtered list based on search term (company or role) and priority filter:
  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      !searchQuery.trim() ||
      app.company.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      app.role.toLowerCase().includes(searchQuery.toLowerCase().trim());

    const matchesPriority =
      priorityFilter === 'All' || app.priority.toLowerCase() === priorityFilter.toLowerCase();

    return matchesSearch && matchesPriority;
  });

  return (
    <div className="app-root-layout">
      {/* Header with real-time derived stats */}
      <Header
        totalCount={totalCount}
        interviewCount={interviewCount}
        offerCount={offerCount}
      />

      <div className="main-content-layout">
        {/* Controlled Form with Validation & Duplicate prevention */}
        <ApplicationForm
          onAddApplication={handleAddApplication}
          existingApplications={applications}
        />

        {/* Kanban Board with Columns and Filter controls */}
        <Board
          applications={filteredApplications}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          priorityFilter={priorityFilter}
          onPriorityChange={setPriorityFilter}
          onMoveStage={handleMoveStage}
          onReject={handleReject}
          onDelete={handleDelete}
        />
      </div>

      <footer className="app-footer">
        <p>
          JobTrackr · Day 03 Assignment · Built with React, Vite & Modern CSS
        </p>
      </footer>
    </div>
  );
}
