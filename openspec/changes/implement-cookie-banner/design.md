# Design: Global Cookie Consent Banner

## Component: Cookie Banner
**File**: `components/CookieBanner.jsx`
- **Positioning**: `fixed bottom-0 left-0 w-full z-50` to sit persistently at the bottom of the viewport.
- **Styling**: `bg-[#0a0c14]/90 backdrop-blur-md border-t border-[#3a86ff]/30` for a sleek, translucent dark aesthetic.
- **Content**:
  - Text: "Utilizamos cookies para métricas de desempenho e para aprimorar sua experiência com nossa Inteligência Artificial. Ao continuar, você concorda com nossa Política de Privacidade."
  - Buttons Container: Flex row.
  - Secondary Button: "Saber mais" wrapped in a Next.js `<Link href="/privacidade">` (styled as a text link with hover effects).
  - Primary Button: "Entendi" (styled as `bg-[#3a86ff] hover:bg-[#2563eb] text-white font-bold rounded-xl shadow-[0_0_20px_rgba(58,134,255,0.3)]`).
- **State Logic**:
  - `const [showBanner, setShowBanner] = useState(false);`
  - `useEffect`: Check `localStorage.getItem('edutrack_cookie_consent')`. If it does NOT exist, set `showBanner` to `true`.
  - `handleAccept`: Function triggered by the "Entendi" button that sets the `localStorage` item and sets `showBanner` to `false`.
  - Return `null` if `!showBanner`.

## Component: Root Layout
**File**: `app/layout.jsx`
- **Injection**: Import the `CookieBanner` component.
- Place `<CookieBanner />` inside the main `<body>` tag alongside the `children` so it renders globally regardless of the active route.
