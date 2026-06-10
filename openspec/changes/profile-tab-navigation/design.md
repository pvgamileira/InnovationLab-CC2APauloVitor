## Architecture

- **Page**: `app/dashboard/perfil/page.jsx`
- **State**: Introduce `activeTab` using `useState('geral')`.

## UI Components

### 1. Tab Navigation Wrapper
- Placed immediately after the `<header>` block.
- Container CSS: `flex gap-6 border-b border-white/10 mb-6`.

### 2. Tab Buttons
- **Visão Geral Button**:
  - `onClick={() => setActiveTab('geral')}`
  - Styles when active: `text-white border-b-2 border-[#3a86ff] pb-3 font-bold transition-all`
  - Styles when inactive: `text-gray-400 hover:text-gray-200 pb-3 font-medium transition-all`
- **Conquistas Button**:
  - `onClick={() => setActiveTab('conquistas')}`
  - Styles when active: `text-white border-b-2 border-[#3a86ff] pb-3 font-bold transition-all`
  - Styles when inactive: `text-gray-400 hover:text-gray-200 pb-3 font-medium transition-all`

### 3. Conditional Rendering Blocks
- **Visão Geral Section**:
  - Encapsulate the `grid grid-cols-1 lg:grid-cols-3 gap-8` (which holds user stats, mastery, etc.) inside `{activeTab === 'geral' && ( ... )}`.
- **Conquistas Section**:
  - Encapsulate the `<h3>` ("Minhas Conquistas") and the `grid` mapping `BADGES_LIST` inside `{activeTab === 'conquistas' && ( ... )}`.

## Constraints

- Pure JS/JSX. NO TypeScript.
- Do not alter or delete the inner logic of the user card, stats, mastery map, or the badges array map. Only wrap them in the conditional rendering logic.
- Ensure the `'use client'` directive remains at the top of the file since we are introducing interactive state.
