## ADDED Requirements

### Requirement: Provide Gemini AI Insights API endpoint
The system SHALL expose a GET endpoint at `/api/gemini-insights` that returns AI-generated strategic insights for the authenticated user based on their academic performance.

#### Scenario: Unauthenticated request
- **WHEN** a request is made to `/api/gemini-insights` without a valid Supabase session
- **THEN** the system returns a 401 Unauthorized status with an appropriate error message in JSON format.

#### Scenario: Successful generation of insights
- **WHEN** an authenticated request is made to `/api/gemini-insights`
- **THEN** the system fetches the user's `subjects` and `academic_tasks` using the authenticated `user.id`
- **THEN** the system calculates metrics such as completed vs pending tasks
- **THEN** the system queries the `gemini-1.5-flash` model with the performance data and the required system prompt
- **THEN** the system returns a 200 OK status containing a JSON response with exactly 3 strategic insights.

#### Scenario: Database retrieval error
- **WHEN** an authenticated request is made but Supabase fails to retrieve `subjects` or `academic_tasks`
- **THEN** the system logs the error and returns a 500 Internal Server Error status.

#### Scenario: Gemini API error
- **WHEN** the system successfully retrieves data but fails to get a response from the Google Generative AI API (e.g., rate limit, timeout)
- **THEN** the system logs the error and returns a 502 Bad Gateway or 500 Internal Server Error status with a fallback response or error message.
