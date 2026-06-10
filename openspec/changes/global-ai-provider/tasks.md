## 1. Create the AI Context
- [x] 1.1 Create the file `contexts/AiContext.jsx`.
- [x] 1.2 Implement the `AiProvider` with `use client`.
- [x] 1.3 Add `aiStatus` and `globalInsight` state variables.
- [x] 1.4 Add the `useEffect` hook to simulate the health scan with a 2-second timeout, falling back gracefully in a `catch` block.
- [x] 1.5 Export `useAi` custom hook.

## 2. Create the Status Bar Component
- [x] 2.1 Create the file `components/GlobalStatusBar.jsx`.
- [x] 2.2 Add `use client`, and import `useAi` from the context.
- [x] 2.3 Import `CheckCircle2, AlertTriangle, Loader2, WifiOff, Terminal` from `lucide-react`.
- [x] 2.4 Build the UI logic to map the `aiStatus` to the correct icons, colors, and text.
- [x] 2.5 Implement the absolute bottom fixed container (`fixed bottom-0 z-50 h-8`) and the right-side mock IDE info.

## 3. Inject into Global Layout
- [x] 3.1 Open `app/dashboard/layout.jsx`.
- [x] 3.2 Import `AiProvider` and `GlobalStatusBar`.
- [x] 3.3 Wrap the `{children}` and surrounding dashboard shell inside `<AiProvider>`.
- [x] 3.4 Append `<GlobalStatusBar />` just before the closing tag of the layout, ensuring it sits outside scrollable bounds.
- [x] 3.5 Ensure the main content wrapper (e.g., the `div` managing the scrolling area) has `pb-8` to prevent content from being hidden behind the status bar.
