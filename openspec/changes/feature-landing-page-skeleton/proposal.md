## Por que

A plataforma exige uma landing page moderna e cativante para atrair e converter novos usuários. A implementação de uma interface elegante com animações via Framer Motion e a preparação para um elemento 3D do Spline proporcionam o fator "uau" inicial necessário para uma ferramenta de eficiência acadêmica premium.

## O que muda

- Modificar ou criar o arquivo `app/page.jsx` como um componente cliente (`"use client"`).
- Implementar um tema de fundo Rich Black (`#02040a`).
- Adicionar uma barra de navegação superior absoluta com o Logotipo no Canto Superior Direito e os botões "Entrar" / "Cadastrar-se" no Canto Superior Esquerdo.
- Criar um layout dividido 50/50 para a seção principal.
- Implementar a Coluna Esquerda com uma animação de fade-up escalonada (staggered) usando Framer Motion, contendo título, subtítulo e botões de chamada para ação (CTA) em português (pt-BR).
- Implementar a Coluna Direita como um placeholder para um modelo 3D do Spline, especificando o comentário `{/* SPLINE 3D ROBOT GOES HERE */}`. Nenhuma importação ou uso do Spline nesta etapa.

## Funcionalidades

### Novas Funcionalidades
- `animated-landing-page-skeleton`: Define o layout estrutural e as animações de entrada do Framer Motion para a landing page principal de marketing, introduzindo o tema Rich Black e a estrutura do placeholder para elementos 3D complexos.

### Funcionalidades Modificadas
Nenhuma

## Impacto

- Sobrescreve o arquivo `app/page.jsx` existente (se houver).
- Exige que o `framer-motion` esteja instalado e disponível no projeto.
- Estabelece a base para a fachada pública/marketing da aplicação sem afetar a lógica de roteamento autenticado.
