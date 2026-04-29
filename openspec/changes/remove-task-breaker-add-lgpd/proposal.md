# Proposal: Remove Task Breaker and Add LGPD Consent

## Problem
The AI Task Breaker feature in the Kanban board has proven to be unintuitive and is cluttering the UI. Additionally, with the recent implementation of the Privacy Policy and Terms of Use, we need explicit user consent for LGPD compliance during the onboarding flow before processing their data with the Gemini API.

## Proposed Solution
1. **Clean Kanban**: Remove all Task Breaker functionality (Wand button, `breakingTaskId` state, and the `breakDownTask` function) from both `components/KanbanBoard.jsx` and `app/dashboard/page.jsx`.
2. **Add LGPD Consent**: Introduce a required consent checkbox in `components/OnboardingModal.jsx` before the submit button. This checkbox will link to the `/termos` and `/privacidade` pages and explicitly state that the user agrees to AI data processing for academic mentoring.

## Benefits
- Simplifies the Kanban interface, reducing cognitive load.
- Ensures full LGPD compliance by obtaining explicit, active consent before any AI data processing occurs.
- Seamlessly integrates the new Legal Pages into the user onboarding journey.
