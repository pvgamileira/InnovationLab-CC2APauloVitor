# Proposal: Fix Notebook Markdown and Settings Logic

## Problem
Currently, the Notebook Copilot feature renders AI responses as plain text, exposing raw markdown symbols (`#`, `*`) which ruins the user experience. Additionally, the Settings page is incomplete: the "Delete Account" button does not function properly, and the "Help Center" tab lacks useful information about how the platform's core features (Mentor IA and Kanban) operate.

## Proposed Solution
1. **Markdown Formatting**: Introduce the `react-markdown` library in `app/dashboard/caderno/page.jsx` to properly parse and render the Gemini AI's responses with rich HTML elements (headings, lists, bold text), styled using Tailwind CSS for our dark theme.
2. **Account Deletion**: Implement a secure data wipe sequence in `app/dashboard/configuracoes/page.jsx` that deletes the user's records from `academic_tasks`, `subjects`, and `user_profiles` before signing them out and redirecting to the Landing Page.
3. **Help Center**: Build a clean, glassmorphism FAQ section in the "Ajuda" tab of the Settings page to educate users on utilizing the Mentor IA and Intelligent Kanban.

## Benefits
- Drastically improves the readability of AI-generated study notes.
- Empowers users with control over their data (LGPD/GDPR compliance).
- Reduces user friction by providing built-in documentation.
