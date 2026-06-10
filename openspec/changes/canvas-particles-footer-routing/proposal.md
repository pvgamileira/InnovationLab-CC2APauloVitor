# Proposal: Implement Vanilla Canvas Particles and Smart Footer Routing

## What are we doing?
We are enhancing the Landing Page (`app/page.jsx`) by adding a premium, interactive particle background to fill the empty space. We are also properly linking the legal footer links to their corresponding pages.

## Why are we doing this?
1. **Aesthetics:** The user approved the final UI structure of the Landing Page, but the background needs a premium, interactive touch.
2. **Functionality:** The footer has legal text placeholders ("Termos de Serviço", "Política de Privacidade") that need to be properly wired to their actual routes (`/termos`, `/privacidade`) to ensure a fully functional landing page.
3. **Performance & Stability:** We are utilizing Vanilla JS and native HTML5 Canvas to ensure zero build errors and absolute stability, without introducing heavy external particle libraries.
