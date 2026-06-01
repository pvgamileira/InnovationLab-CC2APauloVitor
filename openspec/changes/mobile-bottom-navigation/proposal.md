# Proposta: Implement Mobile Bottom Navigation for Dashboard

## Contexto
Currently, the EduTrack AI dashboard lacks comprehensive navigation on mobile devices. Because the desktop sidebar is hidden on small screens (`md:hidden`), users cannot access key pages like "Estatísticas" and "Configurações" via their phones. To ensure a seamless responsive experience, a mobile-first bottom navigation bar is required.

## Motivation
- Unblock mobile users from accessing critical features of the platform.
- Ensure the UI aligns with modern mobile web app standards (bottom navs are ergonomic).
- Maintain the premium, glassmorphism aesthetic across all viewport sizes.

## Scope
- Modify `app/dashboard/layout.jsx` to include a fixed bottom navigation bar visible only on mobile screens (`md:hidden`).
- Populate the bottom navigation with primary routes (`/dashboard`, `/dashboard/estatisticas`, `/dashboard/configuracoes`, etc.) using `lucide-react` icons.
- Add dynamic styling for active vs. inactive states (`#3a86ff` for active, `gray-400` for inactive).
- Adjust the main `children` container padding (`pb-24`) to prevent content from being obscured by the fixed bottom navigation.

## Success Criteria
- On mobile devices, a persistent bottom navigation bar is visible.
- Users can successfully navigate to all major dashboard pages.
- The active tab is visually distinct from inactive tabs.
- The desktop layout (`md:flex`) remains completely unaffected.
- The bottom navigation uses the dark glassmorphism styling (`bg-[#05070e]/95 backdrop-blur-xl`).
