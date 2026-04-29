# Proposal: Implement Global Cookie Consent Banner

## Problem
In order to comply with the General Data Protection Law (LGPD), the application must explicitly inform users about the use of cookies and local storage for performance metrics and AI enhancement before they navigate the site extensively. Currently, the platform lacks a mechanism to capture and respect this initial consent.

## Proposed Solution
Develop a `CookieBanner` component that appears globally across the application. It will persist at the bottom of the screen until the user clicks "Entendi". The banner will utilize `localStorage` to save the user's consent choice so that it does not repeatedly prompt them on subsequent visits. The banner will be injected directly into the global `app/layout.jsx` to guarantee its presence on all routes (Landing Page, Auth, Dashboard, etc.).

## Benefits
- Ensures LGPD compliance and legal transparency.
- Educates the user on how their data supports the Gemini AI.
- Provides a direct link to the Privacy Policy for detailed information.
- Maintains the application's premium aesthetic through a non-intrusive, glassmorphism design.
