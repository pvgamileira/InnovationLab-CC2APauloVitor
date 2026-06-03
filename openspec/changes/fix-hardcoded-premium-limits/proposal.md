## Why

Premium users are currently blocked by hardcoded Free Tier limits (maximum of 3 subjects and 20 tasks per month) within the Dashboard UI. This change is needed immediately to ensure paying users can actually utilize their unlimited tier benefits.

## What Changes

- Modify the "Nova Disciplina" submit button and logic to bypass the 3-subject limit if `isPremium` is true.
- Modify the "Nova Tarefa" and "Adicionar Demanda" buttons to bypass the 20-task limit if `isPremium` is true.
- Update the warning text in both modals so it only renders when the user is NOT premium AND they have reached their limit.

## Capabilities

### New Capabilities

- `premium-limits`: Defines the unlimited usage parameters for Premium accounts versus the hardcoded restrictions for Free Tier accounts.

### Modified Capabilities

## Impact

- Modifies the dashboard page UI logic (`app/dashboard/page.jsx`).
- Ensures Premium users have unrestricted usage across core features (Subjects and Kanban tasks).
