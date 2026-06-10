# Design: Vanilla Canvas Particles and Smart Footer Routing

## Component Structure

### `ParticleBackground` Component
- **Location:** Inside `components/ParticleBackground.jsx`.
- **Implementation:** 
  - A `<canvas>` element styled with `fixed inset-0 z-0 pointer-events-none` to sit behind all content and not block clicks.
  - A `useEffect` hook to initialize the 2D context and manage the animation loop using `requestAnimationFrame`.
  - ~50-70 small particles floating slowly.
  - A `mousemove` event listener on the `window` to track cursor position.
  - A "constellation effect": If the mouse is within a 100px radius of a particle, draw a subtle, low-opacity line connecting the particle to the mouse cursor.
  - Colors: Inherit from the system's subtle dark theme (e.g., `rgba(255, 255, 255, 0.1)`).

### Landing Page (`app/page.jsx`)
- Place `<ParticleBackground />` at the very top of the return block.
- Locate the footer texts ("Termos de Serviço", "Política de Privacidade").
- Wrap them in Next.js `<Link>` tags pointing to the exact routes:
  - Termos de Serviço -> `href="/termos"`
  - Política de Privacidade -> `href="/privacidade"`
- Add styling: `hover:text-white transition-colors cursor-pointer`.

## Constraints
- Pure JS/JSX. NO TypeScript.
- NO external particle libraries (no `tsparticles`, no `three.js`). Rely entirely on native HTML5 Canvas.
- DO NOT modify, break, or alter the InteractiveNotebook 3D component, the Tabs, the Modals, or the Pricing structure in `app/page.jsx`. Keep them exactly as they are.
