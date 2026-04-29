# Design: Premium Landing Page

## Component: Landing Page
**File**: `app/page.jsx`

### Overall Structure
- **Background**: Replace the solid background with `#02040a` and a CSS-based subtle grid overlay (using a repeating linear gradient or an SVG background pattern).
- **Navigation**: Keep the existing logo and login/signup buttons but ensure they float above the grid.

### Hero Section
- **Title**: "Sua jornada acadêmica, elevada por Inteligência Artificial."
- **Subtitle**: "O ecossistema definitivo para estudantes de tecnologia organizarem tarefas, notas e desempenho com mentoria proativa."
- **CTA**: "Começar Agora" button linking to `/auth`, styled with a glowing blue gradient (`bg-[#3a86ff]`, `shadow-[0_0_30px_rgba(58,134,255,0.4)]`).

### Bento Grid Section
Create a CSS Grid layout (`grid-cols-1 md:grid-cols-3`) containing four distinct cards styled with glassmorphism (`bg-white/5`, `backdrop-blur-lg`, `border border-white/10`):
1. **Mentor IA (Large - spans 2 columns on desktop)**: Explains how the Gemini engine analyzes the academic routine. (Icon: Sparkles)
2. **Kanban Inteligente**: Visual task management. (Icon: Layout)
3. **Caderno Copiloto**: Note restructuring with AI. (Icon: BookOpen)
4. **Insights de Burnout**: Predictive stress analysis. (Icon: Activity/HeartPulse)

### Footer
- Simple flex container at the bottom with "EduTrack AI © 2026" and placeholders for "Termos" and "Privacidade".

### Technical Stack
- `lucide-react` for icons.
- `framer-motion` for subtle fade-in and slide-up entry animations.
- Tailwind CSS for all styling and responsive layout adjustments.
