## 1. Configuração (Setup)

- [x] 1.1 Verificar o `package.json` para encontrar o `framer-motion`; instalá-lo com `npm install framer-motion` caso não esteja presente.

## 2. Implementação da Página

- [x] 2.1 Criar/sobrescrever o arquivo `app/page.jsx` com `"use client"` no topo e um container raiz com altura total da viewport em Rich Black (`#02040a`).
- [x] 2.2 Implementar a barra de navegação superior absoluta: links "Login" e "Cadastrar-se" no canto superior esquerdo, texto do Logo no canto superior direito.
- [x] 2.3 Implementar o layout dividido 50/50 na tag `<main>` com estrutura `min-h-screen` e `flex`.
- [x] 2.4 Construir a Coluna Esquerda: definir `containerVariants` com `staggerChildren` no Framer Motion e `itemVariants` com transição de fade-up.
- [x] 2.5 Animar os elementos filhos da Coluna Esquerda: título ("Eleve sua eficiência acadêmica"), subtítulo descritivo (em pt-BR, sobre rotinas e IA) e dois botões de CTA ("Vamos começar", "Conheça nosso projeto!").
- [x] 2.6 Construir a Coluna Direita: renderizar uma `<div className="w-full h-full relative">` vazia contendo apenas o comentário `{/* SPLINE 3D ROBOT GOES HERE */}` internamente — sem importações do Spline.

## 3. Verificação

- [x] 3.1 Confirmar que o servidor de desenvolvimento compila sem erros e que a rota raiz `/` carrega a nova landing page.
- [x] 3.2 Confirmar que a animação escalonada (stagger) está visível no navegador ao carregar a página.
