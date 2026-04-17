## 1. Setup

- [x] 1.1 Check `package.json` for `framer-motion`; install it with `npm install framer-motion` if not present.

## 2. Page Implementation

- [x] 2.1 Create/overwrite `app/page.jsx` with `"use client"` at the top and a Rich Black (`#02040a`) full-viewport root container.
- [x] 2.2 Implement the absolute top navigation bar: "Login" and "Cadastrar-se" links on the top-left, Logo text on the top-right.
- [x] 2.3 Implement the 50/50 `<main>` split layout with `min-h-screen` and `flex` structure.
- [x] 2.4 Build the Left Column: define Framer Motion `containerVariants` with `staggerChildren` and `itemVariants` with fade-up transition.
- [x] 2.5 Animate the Left Column children: title ("Eleve sua eficiência acadêmica"), subtitle copy (pt-BR, about AI routines), and two CTA buttons ("Vamos começar", "Conheça nosso projeto!").
- [x] 2.6 Build the Right Column: render an empty `<div className="w-full h-full relative">` with only the comment `{/* SPLINE 3D ROBOT GOES HERE */}` inside — no Spline imports.

## 3. Verification

- [x] 3.1 Confirm the dev server compiles without errors and the root `/` route loads the new landing page.
- [x] 3.2 Confirm the stagger animation is visible in the browser on page load.
