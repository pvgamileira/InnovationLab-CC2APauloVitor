## 1. Implement State
- [x] 1.1 Open `app/dashboard/perfil/page.jsx`.
- [x] 1.2 Ensure `'use client'` is at the top of the file.
- [x] 1.3 Add a new state variable: `const [activeTab, setActiveTab] = useState('geral');`.

## 2. Create Tab UI
- [x] 2.1 Locate the closing tag of the main header (`</header>`).
- [x] 2.2 Immediately below the header, create a `<div>` with classes `flex gap-6 border-b border-white/10 mb-6`.
- [x] 2.3 Inside the container, add the "Visão Geral" `<button>`. Set its `onClick` to `() => setActiveTab('geral')`.
- [x] 2.4 Inside the container, add the "Conquistas" `<button>`. Set its `onClick` to `() => setActiveTab('conquistas')`.
- [x] 2.5 Apply dynamic styling to both buttons. Use `text-white border-b-2 border-[#3a86ff] pb-3 font-bold transition-all` if active, and `text-gray-400 hover:text-gray-200 pb-3 font-medium transition-all` if inactive.

## 3. Implement Conditional Rendering
- [x] 3.1 Locate the `grid grid-cols-1 lg:grid-cols-3 gap-8` container that holds the user information, stats, and mastery bars.
- [x] 3.2 Wrap this container in a conditional block: `{activeTab === 'geral' && ( ... )}`.
- [x] 3.3 Locate the `<h3 className="text-2xl font-bold mt-10 mb-6 text-white">Minhas Conquistas</h3>` and the subsequent `<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">` (which maps `BADGES_LIST`).
- [x] 3.4 Wrap both the `<h3>` and the `grid` inside a conditional block: `{activeTab === 'conquistas' && ( ... )}`. Ensure the inner code structure is preserved exactly as it was.
