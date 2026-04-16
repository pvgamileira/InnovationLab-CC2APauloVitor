## MODIFIED Requirements

### Requirement: High-End UI Core Aesthetics
The layout MUST uniformly enforce the strict EduTrack AI premium style guidelines without component library fallbacks:
1. Deep "Rich Black" Background (`#000000` or extreme dark variants).
2. Metallic Blue Accents for primary actions, glow effects, and progress bars (`#3a86ff` base).
3. Translucent Glassmorphism on all active cards (utilizing `backdrop-blur` boundaries arrayed on `.bg-white/5` elements).
4. Modern sans-serif hierarchical typography emphasizing tracking and weights.
5. All language nodes across the DOM MUST exclusively map to native Brazilian Portuguese (pt-BR).
6. Iconography MUST exclusively leverage deterministic pure SVGs (e.g., Lucide React or inline `<svg>`), explicitly banning all native localized OS Emojis.

#### Scenario: Visual DOM rendering validation
- **WHEN** elements are constructed on the client DOM
- **THEN** they strictly rely on these overarching custom aesthetic values communicating wholly in pt-BR securely devoid of generic platform emojis
