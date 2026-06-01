# Design: Landing Page Premium

## Componente: Landing Page
**Arquivo:** `app/page.jsx`

### Estrutura Geral
- **Fundo (Background):** Substituir o fundo sólido por `#02040a` e uma sobreposição sutil de grade baseada em CSS (utilizando um gradiente linear repetido ou um padrão de grade em SVG).
- **Navegação:** Manter o logotipo existente e os botões de login/cadastro, garantindo que flutuem acima da grade.

### Seção Hero
- **Título:** "Sua jornada acadêmica, elevada por Inteligência Artificial."
- **Subtítulo:** "O ecossistema definitivo para estudantes de tecnologia organizarem tarefas, notas e desempenho com mentoria proativa."
- **Chamada para Ação (CTA):** Botão "Começar Agora" vinculando a `/auth`, estilizado com um gradiente azul brilhante (`bg-[#3a86ff]`, `shadow-[0_0_30px_rgba(58,134,255,0.4)]`).

### Seção Bento Grid
Criar um layout CSS Grid (`grid-cols-1 md:grid-cols-3`) contendo quatro cartões distintos estilizados com glassmorphism (`bg-white/5`, `backdrop-blur-lg`, `border border-white/10`):
1. **Mentor IA (Grande - ocupa 2 colunas no desktop):** Explica como o motor do Gemini analisa a rotina acadêmica. (Ícone: Sparkles)
2. **Kanban Inteligente:** Gerenciamento visual de tarefas. (Ícone: Layout)
3. **Caderno Copiloto:** Reestruturação de notas de estudo com IA. (Ícone: BookOpen)
4. **Insights de Burnout:** Análise preditiva de estresse. (Ícone: Activity/HeartPulse)

### Rodapé (Footer)
- Um container flex simples na parte inferior com "EduTrack AI © 2026" e placeholders para "Termos" e "Privacidade".

### Stack Técnica
- `lucide-react` para os ícones.
- `framer-motion` para animações sutis de fade-in e slide-up ao entrar na página.
- Tailwind CSS para toda a estilização e ajustes de layout responsivo.
