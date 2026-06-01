## Contexto

O arquivo `app/page.jsx` atual serve como a rota raiz do projeto, mas não possui uma landing page polida voltada para marketing. A primeira impressão é crítica para a aquisição de usuários. Este design estabelece a arquitetura visual, a estratégia de animação e o esqueleto estrutural que eventualmente abrigará um robô 3D do Spline — um elemento-chave do design premium.

## Objetivos / Não-Objetivos

**Objetivos:**
- Construir `app/page.jsx` como um componente cliente (`"use client"`).
- Usar Framer Motion para animações de entrada com fade-up escalonado (staggered) na coluna esquerda.
- Obter um layout de hero dividido em 50/50 com uma navbar superior absoluta.
- Manter a Coluna Direita apenas como uma div de placeholder — sem integração com o Spline nesta etapa.
- Todos os textos voltados ao usuário em pt-BR.

**Não-Objetivos:**
- Integrar Spline ou qualquer biblioteca 3D.
- Implementar fluxos de autenticação nesta página (os links apenas apontarão para `/auth`).
- Modificar `app/dashboard/page.jsx`, rotas de API ou qualquer outra página.
- Otimização responsiva/mobile completa (apenas a base).

## Decisões

- **`"use client"`**: Obrigatório, uma vez que os hooks do Framer Motion (`useAnimation`, `motion`) dependem das APIs do navegador e não podem ser executados em React Server Components.
- **Framer Motion em detrimento de animações CSS**: Fornece orquestração declarativa, combinável e facilmente ajustável para animações escalonadas (stagger) — essencial para a sensação de entrada premium.
- **`staggerChildren` no variante do container**: Cada elemento filho é animado sequencialmente com um pequeno atraso, proporcionando uma sensação polida sem a necessidade de temporizadores em JavaScript.
- **Navbar: posicionamento absoluto**: Mantém a barra sobreposta visualmente ao hero sem impactar o fluxo do layout. Logo à direita, links de navegação à esquerda, combinando com a especificação do design.
- **Coluna direita: div vazia para placeholder**: Impõe um limite estrito entre o esqueleto e o futuro trabalho com o Spline. O comentário `{/* SPLINE 3D ROBOT GOES HERE */}` é obrigatório como o contrato de integração.
- **Dependência `framer-motion`**: Já é comum em stacks Next.js / React. Deve ser instalada via npm se ainda não estiver presente.

## Riscos / Trade-offs

- **Risco**: `framer-motion` não instalado ainda → **Mitigação**: A Tarefa 1.1 verifica e o instala explicitamente.
- **Risco**: Sobrescrever o conteúdo de `app/page.jsx` existente → **Mitigação**: A tarefa é escopada para recriar o arquivo inteiramente; qualquer conteúdo existente valioso deve ser preservado manualmente antes.
- **Risco**: O limite de `"use client"` pode entrar em conflito com layouts baseados em servidor no nível do app → **Mitigação**: O Next.js App Router suporta componentes cliente em qualquer lugar; o layout raiz permanece como um componente de servidor.
