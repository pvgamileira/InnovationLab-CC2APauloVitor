## ADDED Requirements

### Requirement: Smart Insights UI Component
The system SHALL display a "Smart Insights" panel on the `estatisticas` dashboard page, showing AI-generated strategic advice to the student.

#### Scenario: Displaying insights successfully
- **WHEN** the `estatisticas` page loads successfully
- **THEN** the system fetches data from `/api/gemini-insights`
- **THEN** a glassmorphism card (Rich Black background with metallic blue accents) is rendered at the top of the page
- **THEN** the card contains a `Sparkles` icon and displays the 3 returned strategic insights in Portuguese (PT-BR).

#### Scenario: Loading state
- **WHEN** the API request to `/api/gemini-insights` is pending
- **THEN** the system displays a glowing skeleton loading state in the location of the Smart Insights card.

#### Scenario: Error state handling
- **WHEN** the API request fails or returns an error
- **THEN** the system either hides the Smart Insights card gracefully or displays a subtle error message without breaking the surrounding layout.

#### Scenario: Existing layout integrity
- **WHEN** the new Smart Insights panel is rendered
- **THEN** the existing Recharts visualizations and Kanban elements on the page remain fully functional and visually intact.
