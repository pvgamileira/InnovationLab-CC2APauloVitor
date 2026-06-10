## Why

We are implementing the first "Alive AI" feature: Predictive Task Estimation. When a user types a new task title, the AI should seamlessly predict the estimated time to complete it and display it as a "ghost tag" without any manual clicks. This reduces friction and enhances the futuristic feel of the platform.

## What Changes

- **Add Prediction State**: Introduce `isPredicting` and `aiEstimate` states to the Task Creation Modal.
- **Implement Debounced Estimation**: A `useEffect` hook that listens to the `titulo` input state and triggers a simulated AI evaluation (using a timeout for debouncing).
- **Render Ghost Tag UI**: Add a pulsing loading indicator and a sleek, glassmorphic "Ghost Tag" to display the calculated time directly below or inside the title input container.

## Capabilities

### New Capabilities
- `ai-ghost-estimation`: The capability of predicting task effort in real-time as the user types, using mocked or actual Gemini AI responses.

### Modified Capabilities

## Impact

- **Affected code**: Task Creation Modal component (e.g., `components/NovaTarefaModal.jsx` or equivalent).
- **User Experience**: Adds an interactive, intelligent layer to task creation, directly aligning with the core "EduTrack AI" value proposition.
