# Design: Remove Task Breaker & Add LGPD Consent

## Component: Kanban Board
**File**: `components/KanbanBoard.jsx`
- Remove the `Wand2` import from `lucide-react`.
- Remove the `onBreakTask` and `breakingTaskId` props.
- Remove the `<button>` that triggers the AI Task Breaker inside the `TaskCard` component (the one with the magic wand).

## Component: Dashboard Page
**File**: `app/dashboard/page.jsx`
- Remove the `breakingTaskId` state.
- Remove the `breakDownTask` async function entirely.
- Remove the props `onBreakTask` and `breakingTaskId` passed to the `<KanbanBoard />` component.

## Component: Onboarding Modal
**File**: `components/OnboardingModal.jsx`
- Add a new state: `const [consent, setConsent] = useState(false);`
- Add a checkbox `<input type="checkbox" required />` right above the submit button.
- The label should read: "Li e concordo com os Termos de Uso e Política de Privacidade, e autorizo o processamento dos meus dados pela IA para mentoria acadêmica."
- Wrap "Termos de Uso" and "Política de Privacidade" in `<Link href="...">` tags with an accent color (e.g., `text-[#3a86ff] hover:underline`).
- Disable the submit button if `consent` is false (`disabled={loading || !consent}`).
