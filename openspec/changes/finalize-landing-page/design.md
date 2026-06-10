# Design: Finalize Landing Page

## 1. Hero H1 Copy
- **File:** `app/page.jsx`
- **Location:** Inside the main `<main>` section's hero block.
- **Change:** Replace "A Primeira IDE de Produtividade Acadêmica" with "Domine o Caos do Seu Semestre com Inteligência Artificial."

## 2. Particle Interaction Tweak
- **File:** `components/ParticleBackground.jsx`
- **Location:** Inside the `animate()` loop where the mouse distance is calculated.
- **Change:** Update the distance threshold from `100` to `150`. Ensure both the constellation effect logic and the mouse interaction logic reflect this larger interaction radius.

## 3. Legal Footer Links
- **File:** `app/page.jsx`
- **Location:** Footer `<Link>` tags.
- **Change:** Verify and apply `<Link href="/termos">` and `<Link href="/privacidade">` wrapping the texts "Termos de Serviço" and "Política de Privacidade". Ensure the class `hover:text-white transition-colors cursor-pointer` is applied.

## Constraints
- Pure JS/JSX. NO TypeScript.
- Do NOT alter the InteractiveNotebook 3D tilt logic or any other layout sections.
