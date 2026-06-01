# Tarefas: Impor Limites do Plano Gratuito e Upsells Sutis

## 1. Impor Limites de Disciplina no Dashboard (`app/dashboard/page.jsx`)
- [x] Abrir `app/dashboard/page.jsx`.
- [x] Identificar o modal de criação de novas disciplinas (`isSubjectModalOpen`).
- [x] Modificar o botão de envio para que fique desabilitado (`disabled`) se `subjects.length >= 3`.
- [x] Adicionar o texto dinâmico "Limite de 3 atingido - Faça Upgrade" no botão desabilitado.
- [x] Adicionar o helper text explicativo abaixo do botão com link direto para `/dashboard/premium`.

## 2. Configurar Rota de API Gemini com Mensagem de Upsell (`app/api/gemini-insights/route.js`)
- [x] Abrir `app/api/gemini-insights/route.js`.
- [x] Alterar o JSON de resposta de limite excedido (429) com a nova mensagem explicativa e o valor atualizado de R$ 9,90.

## 3. Desenvolver o Badge Sutil no Menu Sidebar (`app/dashboard/layout.jsx`)
- [x] Abrir `app/dashboard/layout.jsx`.
- [x] Identificar a área que exibe o Nível e XP do estudante no topo esquerdo do layout.
- [x] Adicionar abaixo a tag interativa `✨ Fazer Upgrade (R$ 9,90)` estilizada com glassmorphism e link direto para a página `/dashboard/premium`.

## 4. Validação
- [x] Certificar que a navegação do painel se mantém estável para usuários com 3 ou mais disciplinas cadastradas anteriormente.
- [x] Validar a experiência de clique no badge do menu e nos redirecionamentos.
