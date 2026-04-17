## ADDED Requirements

### Requirement: Subject-based Tab Navigation
The interface SHALL fetch the user's active disciplines to establish the notebook's categories.

#### Scenario: Switching Notebook Subjects
- **WHEN** the user selects a new subject pill/tab
- **THEN** the active tab highlights with a neon glow transition.
- **AND** the main text area dynamically swaps to display the notes previously associated with that specific subject.

---

### Requirement: Editor Interface
The main text area SHALL be unrestrictive, clean, and styled according to the glassmorphism theme.

#### Scenario: Typing Notes
- **WHEN** the user types in the main area
- **THEN** the input feels instantaneous (controlled React state).
- **AND** a subtle auto-save status indicator signals that data is being preserved locally.

---

### Requirement: Smooth Transitions
The visual movement between states SHALL be highly polished.

#### Scenario: Switching Contexts
- **WHEN** a user switches subjects
- **THEN** the subject title in the main view fades out and in gracefully, maintaining the application's premium aesthetic.
