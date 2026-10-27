# JobTrackr · Board UI

A modern, responsive job application tracking board built with React, Vite, and custom CSS. Built for **Day 03: React Fundamentals** (MERN Stack + AI Development Program).

---

## Overview

Job hunting involves dozens of applications progressing across stages. **JobTrackr** manages applications on a Kanban board powered by local React state (no backend), designed with an editorial **Wine Red & Light Sand** theme, clean SVG iconography, and zero unnecessary emojis.

---

## Features

- **Component Architecture**: Structured into dedicated modular components:
  - `Header`: Displays application branding and real-time calculated statistics.
  - `ApplicationForm`: Controlled form with field validations and duplicate detection.
  - `Board`: Layout container managing search, priority filtering, and status columns.
  - `Column`: Status column (`Applied`, `Interview`, `Offer`, `Rejected`) displaying counts and handling empty states (`Nothing here yet.`).
  - `ApplicationCard`: Interactive card featuring priority badges, formatted dates, stage advancement, rejection, and confirmed deletion.
- **Controlled Form & Validation**:
  - `company` & `role`: Required, 2–60 characters.
  - `status`: Default `Applied`, options: `Applied`, `Interview`, `Offer`, `Rejected`.
  - `appliedOn`: Date picker with max bound to today (cannot be in the future).
  - `priority`: `Low`, `Medium`, `High`.
  - **Duplicate Prevention**: Rejects duplicate entries with identical company and role (case-insensitive).
  - Individual inline error messages rendered directly under each field.
- **Stage Progression & Immutable Updates**:
  - Advance card to next stage (`Applied` → `Interview` → `Offer`).
  - Mark as `Rejected` from any active stage.
  - Delete card with window confirmation dialog.
  - All state updates use immutable operations (`map`, `filter`, and spread syntax `[...apps]`).
- **Derived Values During Render (Zero Stored Redundancy)**:
  - Header statistics (`X applications · Y interviews · Z offers`) calculated during render.
  - Live search (company or role) and priority filtering computed on-the-fly during render.
- **Interview Corner (`INTERVIEW.md`)**:
  - Concise answers (<80 words each) for Virtual DOM/Reconciliation, list keys, JSX compilation, and state immutability in React.

---

## State Management & Immutability

All applications are stored in a single, lifted-up state hook in `App.jsx`:

```jsx
const [applications, setApplications] = useState(INITIAL_APPLICATIONS);
```

### Why `apps.push(x); setApps(apps)` Does Not Re-render:
> React relies on reference equality (`Object.is`) to detect state changes. Mutating an array via `apps.push(x)` alters the array in place, keeping the exact same memory reference. When passing `apps` back to `setApps(apps)`, React sees `prevState === nextState` and skips re-rendering. To trigger an update, you must create a new reference using array spread: `setApplications(prev => [newApp, ...prev])`.

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Dev Server
```bash
npm run dev
```
Open `http://localhost:5173/` in your browser.

### 3. Build for Production
```bash
npm run build
```

---

## Project Structure

```
job_trackr/
├── index.html
├── package.json
├── vite.config.js
├── INTERVIEW.md
├── README.md
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── components/
│       ├── Header.jsx
│       ├── ApplicationForm.jsx
│       ├── Board.jsx
│       ├── Column.jsx
│       └── ApplicationCard.jsx
```

---

## License
MIT
