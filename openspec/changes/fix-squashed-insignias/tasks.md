## 1. Apply Flex Constraints to Insignias
- [x] 1.1 Open `app/dashboard/page.jsx`.
- [x] 1.2 Locate the `<Link href="/dashboard/perfil">` wrapper containing the "INSÍGNIAS" block (around line 312).
- [x] 1.3 Find the `<div>` inside that wraps the three insignia badges (`<div className="flex items-center">` or similar inner container).
- [x] 1.4 For the Moon badge `<div>` wrapper, append `flex-shrink-0 aspect-square` to its classes. Add `flex-shrink-0` to the `<Moon>` component itself.
- [x] 1.5 For the Target badge `<div>` wrapper, append `flex-shrink-0 aspect-square` to its classes. Add `flex-shrink-0` to the `<Target>` component itself.
- [x] 1.6 For the Flame badge `<div>` wrapper, append `flex-shrink-0 aspect-square` to its classes. Add `flex-shrink-0` to the `<Flame>` component itself.
