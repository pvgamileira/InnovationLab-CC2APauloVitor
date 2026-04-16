## MODIFIED Requirements

### Requirement: Dashboard Listing Route
The Next.js application MUST expose an interactive route at `/dashboard`. This route MUST utilize pure JavaScript to fetch and display the subjects directly assigned to the logged-in user via the Supabase Client API. The rendering module MUST conform the fetched iterations tightly into the bounds of the new Premium Dashboard Subjects Grid natively leveraging Glassmorphism and Deep Black visual values over standard flat lists.

#### Scenario: User lists subjects
- **WHEN** an authenticated user navigates to `/dashboard`
- **THEN** the application fetches from Supabase and renders a visual list of the user's subjects adopting the premium structural aesthetics rather than a generic array block.
