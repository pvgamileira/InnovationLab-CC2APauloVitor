## ADDED Requirements

### Requirement: Consuming Global Toast Context in KanbanBoard
The `KanbanBoard` component SHALL import `useToast` from `@/context/ToastContext` and trigger notifications using the global context hook. Any local toasts state, timeout, or local `showToast` function MUST be completely removed.

#### Scenario: KanbanBoard consumes global toast context
- **WHEN** KanbanBoard is rendered
- **THEN** it retrieves `showToast` from `useToast` context and removes all local state references to toasts.

### Requirement: Consuming Global Toast Context in Disciplinas Page
The `Disciplinas` page component SHALL import `useToast` from `@/context/ToastContext` and trigger notifications using the global context hook. Any local toasts state, timeout, or local `showToast` function MUST be completely removed.

#### Scenario: Disciplinas page consumes global toast context
- **WHEN** Disciplinas page is rendered
- **THEN** it retrieves `showToast` from `useToast` context and removes all local state references to toasts.

### Requirement: Consuming Global Toast Context in Dashboard Page
The `Dashboard` page component SHALL import `useToast` from `@/context/ToastContext` and trigger notifications using the global context hook. Any local toasts state, timeout, or local `showToast` function MUST be completely removed.

#### Scenario: Dashboard page consumes global toast context
- **WHEN** Dashboard page is rendered
- **THEN** it retrieves `showToast` from `useToast` context and removes all local state references to toasts.

### Requirement: Brazilian Portuguese Messages for Toast Alerts
All notifications triggered within the dashboard components MUST be in Brazilian Portuguese.

#### Scenario: Notifications are in Portuguese
- **WHEN** any notification is triggered
- **THEN** the text message displayed is written in Brazilian Portuguese.
