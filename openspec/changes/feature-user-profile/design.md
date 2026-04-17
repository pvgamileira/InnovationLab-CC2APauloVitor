## Context

The profile page is accessible via the sidebar and mobile account links. It needs to strike a balance between a professional academic dashboard and a gamified "RPG Character Sheet". We will use placeholder data exclusively to perfectly nail the layout and animations before hooking it into real backend metrics in a later phase.

## Goals / Non-Goals

**Goals:**
- Deliver a premium, visually arresting Profile Header highlighting "Paulo Vitor", "Analista de Suporte de TI", and "Ciência da Computação - 2º Semestre (Noturno)".
- Render a highly stylized "Level 12" XP Progress Bar glowing with `#3a86ff`.
- Construct a 2-4 card stats grid (Tasks Completed, Hours Studied, etc.) using Metallic Gray and Neon Blue accents.
- Implement cascading entrance animations via `framer-motion` (`staggerChildren`).
- Use strict PT-BR localization.

**Non-Goals:**
- Creating new `users_meta` schemas in Supabase. This is purely a UI implementation request.
- Profile picture uploading mechanics (We will use a sleek vector icon or placeholder avatar).

## Decisions

- **Animation Framework**: `framer-motion` variants (e.g., `container` and `item`) will be defined at the top of the file to stagger the rendering of the Profile Header, XP Bar, and Stat Cards, making the UI feel like it "warps in".
- **Styling Architecture**: Adhering to the established global system: `#05070e/80` for card backgrounds, `backdrop-blur-xl`, `border-white/5`.
- **Responsive Layout**: Stack vertically on mobile (`flex-col`), switch to horizontal combinations or grids on desktop (`md:grid-cols-2` or `lg:grid-cols-3`).

## Risks / Trade-offs

- **Risk**: Hardcoding placeholder strings breaks the data-driven architecture of the rest of the application.
  *Mitigation*: The user explicitly commanded "Use realistic placeholder data for the layout structure". This guarantees we can perfect the UI without worrying about complex Postgres joins for Study Hours logic right now.
