## Why

The PDF Generation capability currently experiences intermittent desynchronization concerning the user context boundary. Relying purely on frontend payloads can lead to malformed PDFs or security bypasses if arbitrary data is injected. Creating a hardened bridge in the backend corrects this vulnerability while keeping the Python generator isolated and safe.

## What Changes

- Deepened the logic inside `app/api/generate-report/route.js`.
- Session checks are strictly enforced server-side before querying.
- The `subjects` and `academic_tasks` tables are directly queried using the verified `user.id`.
- The data is carefully consolidated entirely on the backend and stringified to interface cleanly with the subprocess `sys.stdin`.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `pdf-report-generation`: The data passing schema from Node.js to Python is rewritten to guarantee synchronous and secure behavior.

## Impact

- **Backend:** Exclusive changes to the `generate-report` route. Zero modifications to frontend UI or Python structures.
