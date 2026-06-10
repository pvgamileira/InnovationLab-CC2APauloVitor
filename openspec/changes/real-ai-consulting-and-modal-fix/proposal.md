# Proposal: Real AI Consulting via Native REST and Modal State Fix

## What are we doing?
We are bridging the EduTrack-Ai platform to real Artificial Intelligence without compromising build stability. We will implement a native REST API route to interface directly with the Gemini 1.5 Flash endpoint, avoiding problematic SDK dependencies. This powers the "Consultoria IA" tab to deliver true, context-aware tactical feedback based on the user's real XP and task backlog. Additionally, we are enforcing strict state cleanup on the Discipline deletion modal.

## Why are we doing this?
1. **Real AI Integration:** The previous heuristic was a placeholder. By passing live data (`xp`, `tarefas`) to Gemini via a lightweight native `fetch`, we achieve the core value proposition of an "AI IDE" while guaranteeing 100% build stability (zero external package bloat).
2. **Modal Deletion Bug:** Preventing ghost interactions and duplicate state bugs when deleting a discipline is critical for data integrity. Explicitly closing the modal and updating the render tree immediately post-deletion ensures a flawless UX.
