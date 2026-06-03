## Context

The system utilizes `app/dashboard/page.jsx` as the central hub for creating "Disciplinas" (Subjects) and "Tarefas" (Tasks). The `isPremium` variable is already present and accurately populated by reading `user.user_metadata.premium` from the Supabase session, but the client-side UI limitations are hardcoding Free Tier limits (3 subjects and 20 tasks per month) for all users, indiscriminately blocking Premium users.

## Goals / Non-Goals

**Goals:**
- Dynamically disable the "Limit Reached" restrictions for Premium users in the Dashboard.
- Prevent the warning messages from displaying for Premium users.

**Non-Goals:**
- Creating a new payment endpoint.
- Enforcing backend validation rules in this specific change (this change is strictly UI-focused based on user specifications).

## Decisions

- **In-Place Conditionals (`!isPremium && limitReached`)**: Rather than abstracting the logic into complex helper functions or separate components, we will modify the boolean logic directly in the existing ternary conditions.
  - *Rationale*: This strictly follows the requirement to "NOT remove the existing logic or variables, just inject the `!isPremium &&` check". It minimizes risk and avoids breaking any React hooks or component states.

## Risks / Trade-offs

- **Client-Side Override**: A sophisticated user could technically modify the React DOM to re-enable buttons. 
  - *Mitigation*: Supabase Row Level Security and backend enforcement (already implemented in another change) will block the actual insertions. This UI change purely resolves the front-end friction for legitimately upgraded users.
