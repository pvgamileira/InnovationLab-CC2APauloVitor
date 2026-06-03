## Contexto

A página de perfil é acessível por meio da barra lateral (sidebar) e dos links de conta mobile. Ela precisa alcançar um equilíbrio entre um dashboard acadêmico profissional e uma "Ficha de Personagem de RPG" gamificada. Utilizaremos dados estáticos (placeholders) exclusivamente para aperfeiçoar o layout e as animações antes de conectá-los às métricas reais do backend em uma fase posterior.

## Objetivos / Não-Objetivos

**Objetivos:**
- Entregar um Profile Header premium e visualmente atraente, destacando "Paulo Vitor", "Analista de Suporte de TI" e "Ciência da Computação - 2º Semestre (Noturno)".
- Renderizar uma barra de progresso de XP "Level 12" altamente estilizada e brilhando com a cor `#3a86ff`.
- Construir uma grade de estatísticas de 2 a 4 cartões (Tarefas Concluídas, Horas Estudadas, etc.) usando acentos em Metallic Gray e Neon Blue.
- Implementar animações de entrada em cascata via `framer-motion` (`staggerChildren`).
- Usar localização estrita em PT-BR.

**Não-Objetivos:**
- Criar novos esquemas de `users_meta` no Supabase. Esta é puramente uma solicitação de implementação de interface de usuário (UI).
- Mecanismos de upload de foto de perfil (usaremos um ícone vetorial elegante ou avatar placeholder).

## Decisões

- **Framework de Animação:** Variantes do `framer-motion` (ex: `container` e `item`) serão definidas no topo do arquivo para escalonar a renderização do Profile Header, da Barra de XP e dos Cartões de Estatísticas, fazendo com que a interface pareça se "projetar" na tela.
- **Arquitetura de Estilização:** Aderindo ao sistema global estabelecido: `#05070e/80` para fundos de cartões, `backdrop-blur-xl`, `border-white/5`.
- **Layout Responsivo:** Empilhar verticalmente no mobile (`flex-col`), mudando para combinações horizontais ou grades no desktop (`md:grid-cols-2` ou `lg:grid-cols-3`).

## Riscos / Trade-offs

- **Risco:** Hardcodear strings estáticas quebra a arquitetura orientada a dados do restante da aplicação.
  *Mitigação:* O usuário solicitou explicitamente: "Use realistic placeholder data for the layout structure". Isso garante que possamos aperfeiçoar a interface do usuário sem nos preocuparmos com junções complexas do Postgres para a lógica de Horas de Estudo neste momento.
