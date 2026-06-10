## 1. Clean Up and Dependency Setup

- [x] 1.1 Open `app/page.jsx`.
- [x] 1.2 Inspect existing layout to find the native system color classes (or inspect `app/auth/page.jsx` or global CSS).
- [x] 1.3 Ensure `framer-motion` is imported at the top of the file (or the newly created interactive component file).

## 2. Interactive Notebook Component (3D Parallax)

- [x] 2.1 Create a new client component `InteractiveNotebook` inside `app/page.jsx` (or a separate file if preferred). Add `"use client";` to the top if creating a new file, or ensure the component is isolated if `app/page.jsx` remains a server component.
- [x] 2.2 Inside `InteractiveNotebook`, initialize `useMotionValue` for `x` and `y`.
- [x] 2.3 Use `useTransform` to map `x` and `y` to `rotateX` and `rotateY` (e.g., input range `[-0.5, 0.5]`, output range `[-15, 15]`).
- [x] 2.4 Add `handleMouseMove` to calculate relative coordinates and update `x` and `y`.
- [x] 2.5 Add `handleMouseLeave` to smoothly animate `x` and `y` back to `0`.
- [x] 2.6 Render a `<motion.div>` for the card using glassmorphism classes (`bg-white/5 border border-white/10 rounded-xl backdrop-blur-md p-6`) and apply the calculated `rotateX` and `rotateY` styles.
- [x] 2.7 Add mock content inside the card representing a dashboard/notebook snippet.

## 3. Hero Section and Routing Integration

- [x] 3.1 In the main `Home` component, ensure it does NOT contain any server-side redirects (like `redirect('/dashboard')`).
- [x] 3.2 Update the Hero headline to "A Primeira IDE de Produtividade Acadêmica".
- [x] 3.3 Update the CTA `<Link href="/auth">Começar a Estudar</Link>` and apply the native system primary color classes discovered in step 1.2.
- [x] 3.4 Wrap the headline and CTA in `<motion.div>` with `initial={{ opacity: 0, y: 20 }}` and `animate={{ opacity: 1, y: 0 }}` for fluid entry animations.
- [x] 3.5 Place the `InteractiveNotebook` component prominently within the Hero or below it.
