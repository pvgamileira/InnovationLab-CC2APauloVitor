## 1. 3D Card Content Injection

- [x] 1.1 Open `app/page.jsx`.
- [x] 1.2 Locate the `InteractiveNotebook` component.
- [x] 1.3 Replace its mock content with a more sophisticated visual representation: use light gray placeholder bars for code, ghost text snippets, and add a miniature Status Bar at the bottom displaying `🟢 IA: Monitorando Banco de Dados`. Ensure the parallax math remains strictly untouched.

## 2. Interactive Tabs System

- [x] 2.1 Inside the main `Home` component, add a new state `const [activeTab, setActiveTab] = useState('kanban')` (ensure `useState` is imported from React).
- [x] 2.2 Below the Hero section, create a tab navigation container with three buttons: "🗂️ Kanban Preditivo", "📖 Caderno Inteligente", "⏱️ Cronômetro Dinâmico". Style the active tab using the project's native accent color (e.g. `#3a86ff` background with text-white), and inactive tabs with a subtle glassmorphism look.
- [x] 2.3 Create a content area below the tabs that conditionally renders content based on `activeTab`. The content should visually align with the `auth/dashboard` design language.

## 3. Technical Specification Modals

- [x] 3.1 Inside `Home`, add states for the modal: `const [isModalOpen, setIsModalOpen] = useState(false)` and `const [modalContent, setModalContent] = useState(null)`.
- [x] 3.2 In each tab's active content panel, add a secondary button labeled "Ver Especificação Técnica".
- [x] 3.3 Configure the button's `onClick` handler to set the respective technical specification text into `modalContent` and set `isModalOpen` to `true`.
- [x] 3.4 Build the modal component (conditionally rendered when `isModalOpen === true`): A fixed, centered `z-[100]` overlay with `backdrop-blur-md bg-black/60`.
- [x] 3.5 Inside the modal, render a gorgeous glassmorphism container displaying `modalContent` and a clear "Fechar" button.

## 4. Pricing Section

- [x] 4.1 Below the Tabs section, replace or augment the existing Pro banner with a full side-by-side Pricing Grid.
- [x] 4.2 Create Card 1 (Plano Gratuito): Display "R$ 0", highlighting basic features like manual kanban, linear notebook, and fixed timer.
- [x] 4.3 Create Card 2 (Plano PRO): Display "R$ 19,90", styled with a premium glowing border (using native colors, e.g. `#3a86ff`), highlighting "Sistema Nervoso Central Ativo" and AI features.

## 5. Legal Footer

- [x] 5.1 At the absolute bottom of `page.jsx`, add a sleek, low-contrast footer (`text-gray-500` or similar).
- [x] 5.2 Add the copyright string: `© 2026 EduTrack-Ai. Todos os direitos reservados.`
- [x] 5.3 Add minimalistic, inline text links for "Termos de Serviço" and "Política de Privacidade" (styled lightly, e.g., `hover:text-gray-300`).
