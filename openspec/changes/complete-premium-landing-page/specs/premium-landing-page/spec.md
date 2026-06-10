## MODIFIED Requirements

### Requirement: Premium Landing Page
The system SHALL serve a high-converting, premium-styled landing page on the root route (`/`) that is accessible to all users (no aggressive redirects for unauthenticated users). It MUST explain the core "Alive AI" features using tabs and technical modals, provide a clear pricing grid, and include a legal footer, all while using the native system color palette and smooth `framer-motion` animations.

#### Scenario: User visits the root URL
- **WHEN** the user navigates to the application's root URL (`/`), even if unauthenticated
- **THEN** the system displays a dark-themed Hero section with a massive headline, fading in smoothly via `framer-motion`, and a CTA button ("Começar a Estudar") linking to `/auth` styled with native system colors.

#### Scenario: User interacts with the 3D Parallax component
- **WHEN** the user hovers and moves their mouse over the interactive AI notebook snippet
- **THEN** the component physically tilts (rotateX, rotateY) in response to the cursor movement, calculated strictly on the client side using `framer-motion` CSS 3D transforms, displaying simulated code, ghost text, and an active status bar.

#### Scenario: User interacts with explanatory tabs
- **WHEN** the user clicks on the "Kanban Preditivo", "Caderno Inteligente", or "Cronômetro Dinâmico" tabs below the hero
- **THEN** the system smoothly swaps the active content panel to display relevant feature documentation.

#### Scenario: User opens technical specification modal
- **WHEN** the user clicks "Ver Especificação Técnica" inside a tab panel
- **THEN** the system displays a centered, glassmorphism modal with a backdrop blur containing the engineering details of that feature.

#### Scenario: User views pricing grid
- **WHEN** the user scrolls down past the tabs
- **THEN** the system displays a side-by-side pricing grid comparing "Plano Gratuito" and "Plano PRO".

#### Scenario: User views legal footer
- **WHEN** the user reaches the absolute bottom of the page
- **THEN** the system displays a minimalist footer with copyright text and plain text links to Terms of Service and Privacy Policy.
