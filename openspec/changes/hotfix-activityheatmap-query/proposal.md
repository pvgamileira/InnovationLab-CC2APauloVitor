# Proposta: Hotfix ActivityHeatmap Database Query

## Contexto
The newly implemented `ActivityHeatmap` component is currently crashing. The root cause is a Supabase query attempting to filter by `updated_at` on the `academic_tasks` table. The current database schema only contains a `created_at` column for timestamps, leading to a query failure.

## Motivation
- Fix the broken statistics dashboard layout caused by the crashing component.
- Ensure the Activity Heatmap correctly renders the last 30 days of data based on the correct database schema.

## Scope
- Update `components/ActivityHeatmap.jsx` to replace all references of `updated_at` with `created_at`.
- This applies to both the Supabase `.select()` call and the `.gte()` filter, as well as the Javascript parsing logic.

## Success Criteria
- The `ActivityHeatmap` component renders successfully without crashing.
- Data correctly reflects task dates based on the `created_at` column.
- No other styling or logic is altered.
