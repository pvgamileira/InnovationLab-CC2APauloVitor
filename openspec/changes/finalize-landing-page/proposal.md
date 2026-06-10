# Proposal: Finalize Landing Page

## What are we doing?
We are applying the final polish to the Landing Page (`app/page.jsx`) and the Particle Background component (`components/ParticleBackground.jsx`) before production deployment. This involves updating the main hero copy, tweaking the interaction radius for the particle background, and ensuring the legal footer links point to the exact correct routes with the proper styling.

## Why are we doing this?
1. **Hero Copy Update:** The new copy ("Domine o Caos do Seu Semestre com Inteligência Artificial.") provides a stronger, more engaging value proposition for students.
2. **Particle Background:** Increasing the interaction radius from 100px to 150px will create a denser and more reactive constellation effect, making the background feel more alive.
3. **Legal Routes:** The build log confirms the exact paths for the legal pages (`/termos`, `/privacidade`). We need to ensure the footer links use these exact routes with Next.js `<Link>` to prevent 404 errors in production and provide a seamless navigation experience.
