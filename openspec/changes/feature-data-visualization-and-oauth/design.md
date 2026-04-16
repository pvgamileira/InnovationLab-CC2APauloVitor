## Context
We are dramatically upgrading user engagement vectors via direct visual analytics pipelines (Pie Charts) and significantly lowering the initial account-creation friction via federated External Providers (Google OAuth). Both additions require uncompromising adherence to the previously codified aesthetic specifications (Rich Black, Metallic Blue).

## Goals / Non-Goals

**Goals:**
- Construct a Recharts-led Donut/Pie Chart actively reacting and interpreting the fetched `academic_tasks` payload into a split distribution (Done vs Pending).
- Create a pure JS "Login com Google" mechanism in `app/auth/page.jsx` utilizing the Supabase identity logic.
- Enforce the Deep Black / Glassmorphism design rules upon the injected third-party chart components avoiding white backgrounds natively drawn by charts.

**Non-Goals:**
- Implementation of advanced multi-axis analytics (this phase strictly targets the singular visual donut metric MVP).
- Authorizing any providers beyond Google.

## Decisions
- **Analytics Dependency:** We finalized the selection of `recharts` over alternatives (like `chart.js`) due to superior native React-hook compatibility directly matching our pure frontend React workflow in Next.js.
- **Auth Trigger Design:** The Google Auth architecture relies natively on `supabase.auth.signInWithOAuth({ provider: 'google' })`.
- **UI Chart Architecture:** We will inject the visual chart as a modular card arrayed adjacently to our existing numerical Summary nodes prioritizing inline `<Pie>` elements configured with explicit metallic colors (`fill="#3a86ff"` and `#433aff`).

## Risks / Trade-offs
- [Responsiveness Breaks on SVG Charts] → Trade-off: Native SVG node drawing often overflows bounds on varying screens. Mitigation: Wrapping all graphs rigorously within Recharts `ResponsiveContainer` tags constraining width/height strictly.
