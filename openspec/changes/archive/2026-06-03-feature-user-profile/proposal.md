## Por que

A plataforma EduTrack AI carece de um centro de identidade personalizado. Embora os usuários possam acompanhar suas tarefas, disciplinas e tempo de Pomodoro, eles não possuem um local centralizado para visualizar seu progresso geral (meta-progresso). O Dashboard de Perfil do Usuário Premium funciona como uma "Ficha de Personagem" que reforça o sistema de gamificação da aplicação (XP/Níveis) e proporciona um sentimento de identidade coesa para o estudante.

## O que muda

- Criação de `app/dashboard/perfil/page.jsx` utilizando `"use client"`.
- Implementação de um cartão Profile Header em glassmorphism contendo dados acadêmicos estáticos e altamente específicos como placeholders.
- Implementação de uma grade de Estatísticas de Gamificação destacando Nível, XP, Total de Tarefas e Horas de Estudo.
- Uso extensivo do `framer-motion` para animar a sequência de entrada dos blocos de dados do usuário, proporcionando uma sensação de aplicação nativa e premium.

## Funcionalidades

### Novas Funcionalidades
- `user-profile-identity`: Uma representação visual de alto nível do usuário aproveitando a estética Rich Black / Metallic Blue.
- `gamification-dashboard`: Uma grade detalhando meta-estatísticas mapeadas para uma interface estática (MVP).

### Funcionalidades Modificadas
- Nenhuma. (Esta é puramente uma implementação de interface frontend, adiando a busca complexa de meta-estatísticas no Supabase para um ciclo de desenvolvimento futuro).

## Impacto

- **Nova Rota:** Estabelece a rota `/dashboard/perfil` que anteriormente estava em branco.
- **Dependências:** Aproveita as integrações existentes de `framer-motion`, `lucide-react` e Tailwind.
