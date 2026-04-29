# Proposal: Implement AI Copilot in Notebook (Caderno)

## Problem
Currently, users can write raw notes in the Caderno page, but they lack an intelligent way to structure them and create review materials automatically.

## Proposed Solution
Introduce an "AI Copilot" feature directly in the Notebook. By clicking a button, the user's raw notes will be sent to a new API Route (`app/api/gemini-copilot/route.js`) powered by Gemini 2.5 Flash. The AI will correct errors, restructure the text into topics, and generate 3 short review flashcards at the end. The formatted response will be displayed elegantly in Markdown below the text area.

## Benefits
- Drastically improves note-taking efficiency.
- Automatically generates study materials (Flashcards) from raw input.
- Enhances the premium feel of the platform using dynamic interactions and glassmorphism.
