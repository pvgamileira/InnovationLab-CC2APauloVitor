## 1. Clean and Inject Context in KanbanBoard

- [x] 1.1 Open `components/KanbanBoard.jsx`, clean up any local toast state/helper logic, and import `useToast` from `@/context/ToastContext`.
- [x] 1.2 Consume the context by declaring `const { showToast } = useToast();` inside `KanbanBoard`.
- [x] 1.3 Update notification triggers in `KanbanBoard` to use global `showToast` in Portuguese.

## 2. Clean and Inject Context in Disciplinas Page

- [x] 2.1 Open `app/dashboard/disciplinas/page.jsx`, clean up any local toast state/helper logic, and import `useToast` from `@/context/ToastContext`.
- [x] 2.2 Consume the context by declaring `const { showToast } = useToast();` inside the component.
- [x] 2.3 Update notification triggers in `DisciplinasPage` to use global `showToast` in Portuguese.

## 3. Clean and Inject Context in Dashboard Page

- [x] 3.1 Open `app/dashboard/page.jsx`, clean up any local toast state/helper logic, and import `useToast` from `@/context/ToastContext`.
- [x] 3.2 Consume the context by declaring `const { showToast } = useToast();` inside the component.
- [x] 3.3 Update notification triggers in `DashboardPage` to use global `showToast` in Portuguese.
