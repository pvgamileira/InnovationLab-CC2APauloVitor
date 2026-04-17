## 1. Scaffold and Setup

- [ ] 1.1 Create the directory structure `app/dashboard/perfil/` and initialize `page.jsx` with `"use client"`.
- [ ] 1.2 Import `framer-motion` (`motion`) and define a top-level staggered container variant and an item variant.

## 2. RPG Character Sheet UI

- [ ] 2.1 Build the primary Identity Card: Wrap in `<motion.div>`. Include a large metallic placeholder avatar ring. Populate with the exact placeholder strings: "Paulo Vitor", "Analista de Suporte de TI", and "Ciência da Computação - 2º Semestre (Noturno) na Faculdade Impacta".
- [ ] 2.2 Style the Identity Card using Rich Black aesthetics (`bg-[#0a0c14]/80 backdrop-blur-2xl border border-white/5`). Add metallic text accents (e.g., `text-gray-400`).

## 3. Gamification Matrix

- [ ] 3.1 Build the XP / Level block: Display "Level 12". Include a thin, elegant progress bar (e.g., 65% width) with a neon glow (`shadow-[0_0_15px_rgba(58,134,255,0.6)]`) and matching `#3a86ff` fill.
- [ ] 3.2 Build the Stats Grid below the XP bar (`grid-cols-2`). Include distinct, smaller glassmorphism cards for 'Tarefas Concluídas' (e.g., 148) and 'Horas de Estudo' (e.g., 34h). Use `lucide-react` icons.

## 4. Final Verification

- [ ] 4.1 Ensure the layout cleanly stacks on mobile and expands safely on desktop sizes (`max-w-5xl` constraint).
- [ ] 4.2 Verify that no database queries are inadvertently breaking the structure, keeping the UI completely static as requested.
