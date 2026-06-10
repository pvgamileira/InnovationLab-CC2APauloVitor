# Tasks: Canvas Particles & Footer Routing

## 1. Create Particle Background Component
- [x] Create `components/ParticleBackground.jsx`.
- [x] Implement `<canvas>` element with `fixed inset-0 z-0 pointer-events-none`.
- [x] Setup `useEffect` to manage canvas context, resizing, and `requestAnimationFrame` loop.
- [x] Implement ~50-70 floating particles with random velocities.
- [x] Implement `mousemove` listener and "constellation effect" (connecting lines within 100px of cursor).
- [x] Apply subtle dark theme colors for particles and lines (`rgba(255, 255, 255, 0.1)`).

## 2. Update Landing Page Footer Routing
- [x] Open `app/page.jsx`.
- [x] Import `Link` from `next/link`.
- [x] Locate "Termos de Serviço" and wrap it in `<Link href="/termos">` with `hover:text-white transition-colors`.
- [x] Locate "Política de Privacidade" and wrap it in `<Link href="/privacidade">` with `hover:text-white transition-colors`.

## 3. Integrate Particle Background
- [x] Import `ParticleBackground` into `app/page.jsx`.
- [x] Place `<ParticleBackground />` at the very top of the component's return block.
- [x] Verify that other components (InteractiveNotebook, Tabs, Modals, Pricing) remain completely untouched and functional.
