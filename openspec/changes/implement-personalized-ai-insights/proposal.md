# Proposal: Implement Personalized AI Insights with Profile Context

## Problem
Currently, the Gemini Insights API gives generic advice because it only knows the number of tasks the user has. It does not utilize the rich context collected during the onboarding phase, such as the user's course, institution, shift, and occupation.

## Proposed Solution
Enhance the AI integration by feeding the user's profile data into the Gemini prompt. The AI will provide ultra-personalized advice, including technical tips related to their specific course and a "Burnout Radar" if the user has many pending tasks and a demanding routine (e.g., working and studying). The UI will also reflect this personalization with a new badge.

## Benefits
- Drastically increases the value of the AI mentor.
- Shows users that the information they provided during onboarding is actually being used.
- Proactively helps students manage their mental health.
