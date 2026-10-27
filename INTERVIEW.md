# JobTrackr · Day 03 Interview Corner

### 1. What is the virtual DOM, and what does reconciliation do?
The Virtual DOM is a lightweight, in-memory JavaScript representation of the actual browser DOM. When a component's state or props change, React constructs a new Virtual DOM tree. Reconciliation is React's diffing process that compares this new tree with the previous one. It identifies the exact changes required and batches updates to only modify those specific elements in the real DOM, avoiding costly full-DOM manipulations and significantly boosting rendering performance.

*(Word count: 72 words)*

---

### 2. Why do lists need keys, and what goes wrong with the index as a key? What does JSX compile to?
Keys give list items stable identities across renders, helping React determine whether items were inserted, reordered, or deleted. Using array indices as keys fails when list items change position; React misidentifies elements, leading to corrupted input state, incorrect animations, and wasted re-renders. 

Under the hood, JSX compiles into standard JavaScript functions—specifically `React.createElement()` calls (or `_jsx()` via the modern JSX runtime), returning plain objects that describe the UI.

*(Word count: 72 words)*

---

### 3. Why must state be treated as immutable in React?
React relies on shallow reference equality (`Object.is`) to detect state changes. Mutating an array or object in place retains its memory address, so React sees `prevState === nextState` and skips re-rendering. Treating state as immutable and generating new references via spread syntax, `map`, or `filter` ensures React detects updates accurately. Immutability also prevents unpredictable side effects, preserves clean component boundaries, and enables optimizations like shallow prop comparisons and memoization.

*(Word count: 73 words)*
