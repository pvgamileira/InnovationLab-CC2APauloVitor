## Context

We have successfully implemented the Crash-Proof 3D Landing Page with native system colors. To complete the premium SaaS storefront experience, we need to add a functional tabbed documentation section, technical modals for deeper feature explanation, a pricing tier grid, and a sleek legal footer. It is critical that we preserve the existing 3D parallax math and strict color scheme while doing so.

## Goals / Non-Goals

**Goals:**
- Inject highly polished mock content inside the `InteractiveNotebook` component without breaking the `framer-motion` parallax math.
- Implement a responsive Tab system in pure React (using state `activeTab`) to toggle explanatory panels below the Hero section.
- Implement an `isModalOpen` state to trigger a centralized, blurred glassmorphism modal containing technical specifications for the active feature.
- Design a clear, two-column pricing section (Plano Gratuito vs Plano PRO).
- Append a minimal, text-based legal footer at the bottom.

**Non-Goals:**
- Introducing new color palettes. We will strictly use the project's native `#3a86ff` / `#2563eb` and standard Tailwind neutral/dark classes.
- Modifying the existing routing behavior or the math for the 3D tilt.

## Decisions

- **State Management**: Simple React `useState` will be used for both the Tabs (`activeTab`) and the Modals (`isModalOpen` and `modalContent`). No complex state libraries are necessary for this presentational logic.
- **Component Structure**: Given the page is becoming complex, we will still keep it within `app/page.jsx` for simplicity of deployment, but logically divide it into clear functional blocks (Hero, Tabs Section, Pricing, Footer). 
- **Modal Implementation**: The modal will be an absolutely or fixed positioned div with `z-[100]`, using `backdrop-blur-md bg-black/60` to dim the background while retaining visibility of the premium layout underneath.
- **3D Content**: Inside `InteractiveNotebook`, we will add HTML elements styled to look like code blocks, ghost text (opacity-50), and a footer status bar (`🟢 IA: Monitorando Banco de Dados`) to sell the "Alive AI" concept.

## Risks / Trade-offs

- **Risk**: Adding too many state-driven components (tabs, modals) in a single file might make `app/page.jsx` large and harder to maintain.
  - **Mitigation**: We will keep the components clean and well-commented, utilizing Tailwind's utility classes to avoid external CSS dependencies.
- **Risk**: Modifying `InteractiveNotebook` could accidentally break the `useTransform` logic.
  - **Mitigation**: We will strictly target only the *children* of the `motion.div` that handles the 3D transforms, leaving the outer motion logic untouched.
