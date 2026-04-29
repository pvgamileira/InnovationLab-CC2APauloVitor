# Tasks: Implement Global Cookie Consent Banner

## 1. Create CookieBanner Component
- [x] Create `components/CookieBanner.jsx`.
- [x] Implement the `useState` and `useEffect` logic to check `localStorage` for `'edutrack_cookie_consent'`.
- [x] Build the UI using the specified dark theme and glassmorphism Tailwind classes.
- [x] Add the "Saber mais" link pointing to `/privacidade`.
- [x] Add the "Entendi" button that saves consent to local storage and hides the banner.

## 2. Inject Globally
- [x] Open `app/layout.jsx`.
- [x] Import `CookieBanner` from `@/components/CookieBanner`.
- [x] Render the `<CookieBanner />` component at the bottom of the `<body>` element.
