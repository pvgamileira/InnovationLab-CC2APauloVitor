## Why

The previous attempt to fix the squashed insignias in the Dashboard header (`app/dashboard/page.jsx`) using simple flex constraints was insufficient. The aggressively constrained parent flexbox container is still compressing the child elements because of complex overlapping and relative constraints from surrounding elements. We need a definitive fix: completely replacing the complex insignias block with a rigid, foolproof, and simplified `<Link>` container that guarantees no squashing occurs under any viewport sizes.

## What Changes

1. **Complete Rebuild**: Completely replace the existing `<Link href="/dashboard/perfil">...` block that wraps the "INSÍGNIAS" text and icons.
2. **Simplified Rigid Structure**: Introduce a clean structure using padding-based icons (`p-1.5 rounded-full`) instead of fixed width/height wrappers, ensuring the icons dictate the boundaries without getting crushed by flex behaviors.
3. **Responsive Tweaks**: Ensure the "INSÍGNIAS" label is hidden on smaller screens (`hidden xl:inline-block`) to yield space for the icons themselves, thus preventing the flex container from forcing a squash.

## Capabilities

### Modified Capabilities
- `dashboard-badges-widget`: The insignias widget is now definitively protected against flexbox squashing and maintains perfect fidelity on all screen sizes.

## Impact

- **Affected code**: `app/dashboard/page.jsx`.
- **User Experience**: Icons will render perfectly circular and correctly proportioned on every device, without distortion.
