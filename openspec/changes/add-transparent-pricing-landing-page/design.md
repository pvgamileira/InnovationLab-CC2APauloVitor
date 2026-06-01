# Design: Seção Transparente de Preços na Landing Page

## Componente: Seção de Preços (`app/page.jsx`)
A nova seção será inserida logo acima da tag `<footer>`.

### 1. Elementos Estruturais
- Container principal com margens e preenchimento adequados (`py-20 px-6 md:px-12 w-full`).
- Título principal estruturado com `motion.h2` e subtítulo descritivo em tons cinzentos.
- Grid responsivo de duas colunas para telas médias e superiores (`grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto`).

### 2. Design dos Cards (Glassmorphism)
- **Card Gratuito:**
  - Estilizado com `bg-white/[0.02] border border-white/5 rounded-3xl p-8`.
  - Apresentará o preço `R$ 0 /mês`.
  - Lista de itens de recursos básicos. Ícones indicativos: `Check` para recursos inclusos e `Minus` para ausentes (ou restritos).
  - Botão CTA: "Começar Grátis" apontando para o fluxo de autenticação (`/auth`).

- **Card Pro:**
  - Destacado com uma borda iluminada por brilho azul (`border-[#3a86ff]/50 bg-black/40 shadow-[0_0_40px_rgba(58,134,255,0.15)]`).
  - Apresentará o novo preço agressivo `R$ 9,90 /mês`.
  - Lista contendo recursos avançados (disciplinas ilimitadas, IA ilimitada, tiers auras Platina e Diamante, suporte rápido).
  - Botão CTA: "Conhecer o Pro" apontando para `/auth` ou para `/dashboard/premium` se o usuário já estiver logado. Estilo preenchido com gradiente de destaque.

---

## Paleta de Cores e Estilos Utilizados
- Fundo: Rich Black (`#02040a`)
- Destaque Primário: Metallic Blue (`#3a86ff`)
- Ícones: `Check` (verde/azul para itens inclusos) e `Minus` (cinza escuro para itens limitados).
