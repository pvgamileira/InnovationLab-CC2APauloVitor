## Why

Currently, in the Dashboard header (`app/dashboard/page.jsx`), the newly integrated insignias (badges) widget is prone to squashing or flattening when the viewport or adjacent text flexes. Because flexbox children can shrink by default, the perfectly round icons end up looking distorted. We need to enforce strict sizing boundaries to maintain visual fidelity.

## What Changes

1. **Apply Strict Sizing Rules**: Inject `flex-shrink-0` to the badge wrapper containers so they cannot compress.
2. **Force Aspect Ratio**: Ensure the circular badge elements maintain a 1:1 aspect ratio (`aspect-square`) and explicit sizing (`w-8 h-8`).
3. **Container Overflow Control**: Confirm the wrapper `<Link>` or `<div>` handles overflow properly without forcing inner icons to shrink.

## Capabilities

### Modified Capabilities
- `dashboard-badges-widget`: The insignias widget is now fully responsive and immune to layout-induced squashing, ensuring perfectly round icons regardless of available space.

## Impact

- **Affected code**: `app/dashboard/page.jsx`.
- **User Experience**: Improved polish and visual stability on the dashboard page.
