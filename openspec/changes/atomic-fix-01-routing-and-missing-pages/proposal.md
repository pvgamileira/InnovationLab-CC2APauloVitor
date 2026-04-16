## Why

Currently, the root routing lacks a standardized redirection flow, and critical navigation paths like "Disciplinas" and "Estatísticas" lead to 404 errors. Implementing premium placeholders maintains a high-quality User Experience while these modules are under development.

## What Changes

- Redirection logic applied to the root `app/page.jsx` ensuring visitors correctly land on the `/dashboard`.
- Addition of two new pages (`app/disciplinas/page.jsx` and `app/estatisticas/page.jsx`) serving as "Coming Soon" placeholders.
- Application of the strict "Rich Black" (#02040a) aesthetics and `lucide-react` SVGs.

## Capabilities

### New Capabilities
- None. This serves strictly as UX placeholder bridging.

### Modified Capabilities
- `root-routing`: Seamless redirection into the dashboard module.
- `navigation`: Handling dead navigation links with immersive views.

## Impact

- **Frontend:** Modest layout additions eliminating 404 errors and improving user flow.
