## MODIFIED Requirements

### Requirement: Premium Landing Page
The system SHALL serve a high-converting, premium-styled landing page on the root route (`/`) that is accessible to all users (no aggressive redirects for unauthenticated users). It MUST explain the core "Alive AI" features and provide a clear path to enter the application using the native system color palette and smooth `framer-motion` animations.

#### Scenario: User visits the root URL
- **WHEN** the user navigates to the application's root URL (`/`), even if unauthenticated
- **THEN** the system displays a dark-themed Hero section with a massive headline, fading in smoothly via `framer-motion`, and a CTA button ("Começar a Estudar") linking to `/auth` styled with native system colors.

#### Scenario: User interacts with the 3D Parallax component
- **WHEN** the user hovers and moves their mouse over the interactive AI notebook snippet
- **THEN** the component physically tilts (rotateX, rotateY) in response to the cursor movement, calculated strictly on the client side using `framer-motion` CSS 3D transforms.

#### Scenario: User views feature documentation
- **WHEN** the user scrolls down on the landing page
- **THEN** the system displays three distinct glassmorphism cards detailing "Sistema Nervoso (Linter)", "Kanban Preditivo", and "Pomodoro Dinâmico" with appropriate icons.

#### Scenario: User views pricing/monetization teaser
- **WHEN** the user scrolls to the bottom of the landing page
- **THEN** the system displays a wide gradient banner teasing the "Plano Pro" to indicate commercial viability.
