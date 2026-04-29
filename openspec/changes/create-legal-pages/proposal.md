# Proposal: Add Legal Pages (Privacy & Terms)

## Problem
Currently, the application lacks standard legal documentation outlining terms of use and privacy practices. With the integration of AI (Google Gemini) and user data collection, it is crucial to transparently explain how data is stored, processed, and utilized solely for academic mentoring. The footer links on the Landing Page are currently dead links.

## Proposed Solution
Create two new dedicated pages:
1. `/privacidade`: A Privacy Policy page detailing data collection (Supabase) and AI processing (Google Gemini API).
2. `/termos`: A Terms of Service page outlining user responsibilities, non-commercial use, and an AI disclaimer.

Both pages will utilize a clean, highly readable layout maintaining the application's premium dark theme (`#02040a`) and glassmorphism UI. The Landing Page footer links will be updated to point to these new routes.

## Benefits
- Establishes trust with users regarding their personal and academic data.
- Complies with basic SaaS operational standards.
- Replaces dead links in the Landing Page footer.
