## Why

The floating AI widget (`<GlobalMentor />`) is currently considered obsolete and intrusive to the user interface. We are transitioning to a contextual inline AI strategy in the future, rendering this global floating button unnecessary. Removing it now will clean up the UI and prevent user confusion.

## What Changes

- **BREAKING**: Complete removal of the `<GlobalMentor />` component from the main application layout (`app/dashboard/layout.jsx`).
- The import statement for `GlobalMentor` will be deleted from `app/dashboard/layout.jsx`.
- The rendering of `<GlobalMentor />` will be deleted from `app/dashboard/layout.jsx`.

## Capabilities

### New Capabilities
None.

### Modified Capabilities
- `global-mentor`: The global floating mentor widget is being fully deprecated and removed.

## Impact

- `app/dashboard/layout.jsx`: Will no longer import or render `<GlobalMentor />`.
- Other layout components, sidebar routing, and the `ToastProvider` will remain completely unaffected.
