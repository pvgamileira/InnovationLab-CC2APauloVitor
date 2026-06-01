# Proposta: Implementar Checkout Stripe e Página de Preços Premium (Monetização)

## Problema
Para transformar o EduTrack AI em um produto SaaS viável comercialmente, precisamos implementar uma camada de monetização (*monetization layer*). Atualmente, a plataforma não possui um fluxo para que os usuários façam upgrade para planos pagos, limitando a receita e a sustentabilidade financeira do projeto.

## Solução Proposta
Integrar o gateway de pagamentos **Stripe** para gerenciar assinaturas recorrentes de forma profissional. O fluxo consistirá em:
1. Uma elegante página de Preços Premium em `app/dashboard/premium/page.jsx` em Strict Dark Mode e Glassmorphism, apresentando o Plano Gratuito e o plano "EduTrack Pro" por R$ 19,90/mês.
2. Uma rota de API (`app/api/checkout/route.js`) para criar sessões de checkout no Stripe de forma segura utilizando o modelo `subscription`.
3. Um redirecionamento direto para a tela de checkout hospedada do Stripe e retorno amigável com tratamento de status.
4. Um fallback gracioso (*mock fallback*) caso as chaves secretas do Stripe não estejam presentes no `.env` local, permitindo testes locais estáveis sem quebras da aplicação.

## Benefícios
- **Camada de Receita SaaS:** Introdução de planos recorrentes (assinatura mensal).
- **Checkout Seguro:** Delegação da segurança e conformidade de pagamentos PCI diretamente para o Stripe.
- **Resiliência no Desenvolvimento:** Fallback interativo simulado em desenvolvimento local caso chaves não estejam configuradas.
