# Tarefas: Implementar Limitador de Taxa em Memória para Rotas de API

## 1. Criar Biblioteca do Limitador de Taxa
- [x] Criar o arquivo `lib/rate-limit.js`.
- [x] Implementar a estrutura global do `Map` para rastrear requisições por IP.
- [x] Adicionar o mecanismo de limpeza automática para evitar vazamento de memória.
- [x] Implementar a lógica de verificação deslizante de janela de tempo e exportar a função `rateLimit`.

## 2. Aplicar o Limitador de Taxa na Rota Gemini Insights
- [x] Abrir `app/api/gemini-insights/route.js`.
- [x] Importar `rateLimit` de `lib/rate-limit.js`.
- [x] Extrair o IP da requisição através dos headers (`x-forwarded-for` ou IP local).
- [x] Validar a requisição com o limite de 5 requisições por minuto antes da verificação de autenticação ou processamento pesado.
- [x] Se o limite for excedido, retornar o erro `429` com a mensagem `"Muitas requisições. Bloqueio anti-spam ativado."`.

## 3. Aplicar o Limitador de Taxa na Rota Gemini Copilot
- [x] Abrir `app/api/gemini-copilot/route.js`.
- [x] Importar `rateLimit` de `lib/rate-limit.js`.
- [x] Extrair o IP da requisição.
- [x] Validar a requisição com o limite de 5 requisições por minuto.
- [x] Se o limite for excedido, retornar o erro `429` com a mensagem `"Muitas requisições. Bloqueio anti-spam ativado."`.

## 4. Verificação
- [x] Garantir que o limite é aplicado por IP de forma isolada.
- [x] Testar disparando requisições sucessivas e verificar o recebimento do código de status `429`.
