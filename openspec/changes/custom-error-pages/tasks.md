# Tasks: Implement Custom 404 and Error Pages

## 1. Create the 404 Page
- [x] Create `app/not-found.jsx`.
- [x] Import the `MapPinOff` icon from `lucide-react` and the `Link` component from `next/link`.
- [x] Implement the dark theme glassmorphism UI with a blue gradient glow.
- [x] Add the 404 texts and the "Voltar para o Dashboard" CTA button.

## 2. Create the 500 Error Page
- [x] Create `app/error.jsx`.
- [x] Add the `"use client";` directive at the top of the file.
- [x] Import `AlertTriangle` from `lucide-react` and `Link` from `next/link`.
- [x] Export a default component receiving `({ error, reset })`.
- [x] Implement the dark theme glassmorphism UI with a red/amber gradient glow.
- [x] Add the primary "Tentar Novamente" button wired to the `reset` function, and the secondary "Voltar ao Início" link.
