# Proposal: AI Consulting Tab and Modal Hotfix

## What are we doing?
We are implementing the final "Consultoria IA" tab in the Statistics page and fixing a crucial state retention bug in the Disciplines page where deletion does not reset local UI state properly. 

## Why are we doing this?
1. **Disciplines Bug:** Currently, deleting a discipline drops it from the database but fails to explicitly update the local state array, allowing ghost interactions and potential UI inconsistencies.
2. **Consultoria IA Tab:** The Statistics page needs a functional "Consultoria IA" tab that utilizes the user's XP and Task Backlog to deliver tactical, system-native feedback (Terminal style), alerting them if they are at risk of cognitive overload (burnout).
