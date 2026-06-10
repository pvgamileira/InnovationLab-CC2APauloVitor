## ADDED Requirements

### Requirement: Double-click to Edit Subject
The system SHALL open the Subject Edit modal when a user double-clicks on a Subject card in the Disciplinas page.

#### Scenario: Editing via double-click
- **WHEN** the user double-clicks on a Subject card
- **THEN** the Edit modal opens populated with that subject's current details

### Requirement: Drag-to-Trash Subject
The system SHALL allow users to delete a Subject by dragging its card and dropping it onto a conditionally rendered Trash Dropzone.

#### Scenario: Initiating subject drag
- **WHEN** the user starts dragging a Subject card
- **THEN** the system displays a fixed Trash Dropzone at the bottom of the screen

#### Scenario: Dropping on Trash Zone
- **WHEN** the user drops a Subject card onto the Trash Dropzone
- **THEN** the subject is deleted, the Trash Dropzone hides, and the success toast "🗑️ Disciplina eliminada" is displayed

#### Scenario: Canceling drag
- **WHEN** the user ends dragging without dropping on the Trash Dropzone
- **THEN** the Trash Dropzone hides and no subject is deleted
