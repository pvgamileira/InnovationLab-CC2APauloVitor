# Proposal: Implement Smart Onboarding Modal in Dashboard

## Problem
Currently, the AI mentor lacks specific context about the user's educational background, such as their course, study shift, or whether they work and study simultaneously. This limits the AI's ability to provide deeply personalized insights.

## Proposed Solution
Implement a "Progressive Profiling" onboarding modal that appears exactly once when a user logs into the dashboard for the first time. The modal will collect:
- Name
- Institution
- Course
- Study Shift (Manhã, Tarde, Noite, Integral)
- Occupation (Só Estudo, Trabalho e Estudo, Estágio, Outro)

This data will be saved in the `user_profiles` table and subsequently used to feed context into the Gemini AI features. The modal will use a sleek glassmorphism UI to maintain the premium feel of the app.

## Benefits
- Drastically improves AI personalization.
- Enhances user experience with a welcoming first impression.
- Follows modern progressive profiling practices without overwhelming the user during signup.
