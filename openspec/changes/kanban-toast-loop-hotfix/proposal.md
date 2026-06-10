# Proposal: Prevent Infinite Toast Loop in KanbanBoard

## What are we doing?
We are implementing a `useRef` guard in `components/KanbanBoard.jsx` to prevent the `useEffect` responsible for task alerts from continuously re-firing and triggering a "Maximum update depth exceeded" error.

## Why are we doing this?
The application crashes because `showToast` updates global state, which in turn causes `KanbanBoard` to re-render. Since the overdue/upcoming task condition remains true, the `useEffect` keeps firing `showToast`, creating an infinite loop. Using a `useRef` breaks this cycle by ensuring the toast is only triggered once per state change.
