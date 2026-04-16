## ADDED Requirements

### Requirement: Premium Dashboard Layout Engine
The Next.js `/dashboard` route MUST establish a structured responsive wireframe containing natively three explicit components: Top Overview Cards, a Central Subjects Grid, and a dedicated Tasks List.

#### Scenario: User visits core dashboard
- **WHEN** a user logs in and navigates to the `/dashboard` route
- **THEN** they are presented directly with the orchestrated grid arrangement of Overviews, Subjects, and Tasks elements

### Requirement: High-End UI Core Aesthetics
The layout MUST uniformly enforce the strict EduTrack AI premium style guidelines without component library fallbacks:
1. Deep "Rich Black" Background (`#000000` or extreme dark variants).
2. Metallic Blue Accents for primary actions, glow effects, and progress bars (`#3a86ff` base).
3. Translucent Glassmorphism on all active cards (utilizing `backdrop-blur` boundaries arrayed on `.bg-white/5` elements).
4. Modern sans-serif hierarchical typography emphasizing tracking and weights.

#### Scenario: Visual DOM rendering validation
- **WHEN** elements are constructed on the client DOM
- **THEN** they strictly rely on these overarching custom aesthetic values rather than generic flat styling
