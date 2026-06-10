## Architecture

- **Page**: `app/dashboard/page.jsx`
- **Scope**: CSS classes on the Insignias block elements.

## CSS Adjustments

### 1. The Outer Wrapper
- Locate the `<Link href="/dashboard/perfil">` wrapper.
- Ensure the inner `<div>` has a clean flex layout. It currently uses `flex items-center gap-3 bg-white/[0.02] border border-white/5 rounded-2xl px-4 h-12 relative group select-none animate-in slide-in-from-bottom-3 fade-in duration-700 delay-150 fill-mode-both hover:scale-105 transition-transform cursor-pointer`.
- Add `overflow-hidden` or `flex-shrink-0` to the container if necessary, but primarily we must ensure the inner icons don't shrink. 

### 2. The Individual Icon Wrappers
- Locate the three `<div className="w-8 h-8 rounded-full flex items-center justify-center ...">` wrappers.
- Add the `flex-shrink-0` and `aspect-square` utility classes to each of them.
  - Ex: `w-8 h-8 rounded-full flex items-center justify-center bg-purple-500/20 border border-purple-500/30 z-20 flex-shrink-0 aspect-square`.
- Similarly apply to the emerald and orange badge variants.
- Also, add `flex-shrink-0` to the Lucide icon itself just in case (e.g. `<Moon className="w-4 h-4 text-purple-400 flex-shrink-0" />`).

## Constraints

- Pure JS/JSX. NO TypeScript.
- Do not touch the progress bar or the `useUserContext` logic.
- Do not alter the overarching layout beyond fixing the shrinking bug.
