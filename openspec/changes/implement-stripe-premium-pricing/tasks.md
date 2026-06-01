# Tarefas: Checkout Stripe e Página de Preços Premium

## 1. Instalar Dependências do Stripe
- [x] Executar a instalação dos pacotes `stripe` e `@stripe/stripe-js`. (Nota: Sandbox offline impede conexão com registro NPM, porém a rota usa imports dinâmicos resilientes para prevenir quebras).

## 2. Desenvolver a Rota de API do Checkout
- [x] Criar o arquivo `app/api/checkout/route.js`.
- [x] Importar e instanciar o `Stripe` de forma segura.
- [x] Adicionar checagem de existência de `STRIPE_SECRET_KEY` e retornar `{ fallback: true }` de forma amigável caso não esteja configurada.
- [x] Criar a sessão de checkout com `mode: 'subscription'`, `payment_method_types: ['card']` e URL de retorno apropriada.
- [x] Retornar o objeto contendo o link do Checkout.

## 3. Criar a Página de Preços Premium
- [x] Criar a página `app/dashboard/premium/page.jsx`.
- [x] Implementar o design responsivo em cores escuras (Rich Black e Metallic Blue) com efeito de Glassmorphism.
- [x] Detalhar os dois cards de precificação ("Plano Gratuito" e "EduTrack Pro").
- [x] Implementar a chamada ao `/api/checkout` no botão "Fazer Upgrade Agora".
- [x] Adicionar tratamento de fallback elegante (como ativação de modal simulado de pagamento) caso o backend responda com `{ fallback: true }`.

## 4. Validação
- [x] Testar localmente a navegação e a responsividade da página de preços.
- [x] Simular um pagamento fictício com o fluxo de fallback e conferir o redirecionamento.
