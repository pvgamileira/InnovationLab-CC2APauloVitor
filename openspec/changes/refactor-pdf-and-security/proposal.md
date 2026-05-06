# Proposal: Refactor PDF Generation and Add Security Rate Limiting

## Problem
The current PDF generation in `app/api/generate-report/route.js` relies on a Python child process. This architectural choice is extremely fragile for Vercel or standard Node.js Next.js deployments, often leading to serverless function crashes or missing dependencies in production. Additionally, the application currently lacks basic HTTP security headers, leaving it vulnerable to clickjacking, MIME-type sniffing, and cross-site scripting (XSS).

## Proposed Solution
1. **Native PDF Generation**: Completely remove the Python dependency. Rewrite the `generate-report` route to utilize `jspdf` and `jspdf-autotable`. These native JS libraries will generate the PDF buffer entirely within the Node.js runtime, ensuring compatibility with serverless environments.
2. **Security Headers**: Update `next.config.mjs` to inject standard security headers (`X-Frame-Options`, `X-Content-Type-Options`, and `Content-Security-Policy`) into all server responses.

## Benefits
- Drastically improves deployment stability by removing the Python runtime requirement.
- Reduces API latency by generating PDFs natively in memory without spawning child processes.
- Strengthens application security and compliance against basic web vulnerabilities.
