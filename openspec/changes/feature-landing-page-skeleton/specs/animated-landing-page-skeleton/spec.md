## ADDED Requirements

### Requirement: Client-side landing page root
The system SHALL render `app/page.jsx` as a client component, declared with `"use client"` at the top of the file, to allow browser-dependent animations.

#### Scenario: Page directive
- **WHEN** the file `app/page.jsx` is evaluated by Next.js
- **THEN** `"use client"` is the first statement, enabling client-side rendering

---

### Requirement: Rich Black themed background
The page root container SHALL use `#02040a` as its background color, filling the full viewport (`min-h-screen`).

#### Scenario: Background renders correctly
- **WHEN** a user visits the root `/` route
- **THEN** the full viewport background is `#02040a` (Rich Black), with no other background color visible

---

### Requirement: Absolute top navigation bar
The page SHALL render a navigation bar absolutely positioned at the top of the viewport. The logo SHALL appear on the top-right and "Login" and "Cadastrar-se" links SHALL appear on the top-left.

#### Scenario: Logo and links visible
- **WHEN** the landing page loads
- **THEN** the logo text is pinned to the top-right and both "Login" and "Cadastrar-se" links are visibly positioned on the top-left

---

### Requirement: 50/50 hero split layout
The `<main>` section SHALL split the viewport equally into a left column and a right column, each occupying 50% of the available width, with a minimum height of `100vh`.

#### Scenario: Equal columns
- **WHEN** the page is viewed at full desktop width
- **THEN** the left and right columns each take exactly half the viewport width

---

### Requirement: Framer Motion staggered left column
The left column SHALL use Framer Motion with a `staggerChildren` parent variant, animating children upward from `y: 40` at `opacity: 0` to `y: 0` at `opacity: 1`. Content MUST include (in pt-BR): the title "Eleve sua eficiência acadêmica", a subtitle about AI routines, and two buttons "Vamos começar" and "Conheça nosso projeto!".

#### Scenario: Staggered entrance animation
- **WHEN** the left column mounts in the browser
- **THEN** each child element (title, subtitle, buttons) fades in upward in sequence with a visible stagger delay

#### Scenario: PT-BR copy verification
- **WHEN** the left column renders
- **THEN** the heading reads "Eleve sua eficiência acadêmica" and buttons read "Vamos começar" and "Conheça nosso projeto!"

---

### Requirement: Right column 3D placeholder
The right column SHALL render an empty `<div>` with classes `w-full h-full relative` and contain exactly the JSX comment `{/* SPLINE 3D ROBOT GOES HERE */}` as its sole content. No Spline library SHALL be imported or used.

#### Scenario: Placeholder div present
- **WHEN** the right column renders
- **THEN** a `<div className="w-full h-full relative">` element is present with no children other than the prescribed comment

#### Scenario: No Spline import
- **WHEN** `app/page.jsx` is statically analyzed
- **THEN** there are zero imports from `@splinetool/react-spline` or any Spline package
