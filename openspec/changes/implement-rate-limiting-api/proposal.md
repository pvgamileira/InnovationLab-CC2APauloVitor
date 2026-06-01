# Proposta: Implementar Limitador de Taxa em Memória (In-Memory Rate Limiting) para Rotas de API

## Problema
As rotas de API da plataforma (`app/api/gemini-insights/route.js` e `app/api/gemini-copilot/route.js`) consomem serviços do banco de dados Supabase e chamadas externas para o modelo de inteligência artificial Gemini. Atualmente, embora haja validação de autenticação, não há proteção contra ataques de negação de serviço (DDoS), varreduras repetitivas (scraping), ataques de força bruta ou abuso e exaustão de custos da API do Gemini. 

## Solução Proposta
Desenvolver um mecanismo leve e de alta performance de limitação de taxa (*Rate Limiting*) em memória utilizando um `Map` do JavaScript. O limitador registrará as requisições por endereço IP em janelas de tempo deslizantes. Se um endereço IP exceder o limite estabelecido (ex: 5 requisições por minuto), as requisições subsequentes serão imediatamente rejeitadas com o status HTTP `429 Too Many Requests`, poupando recursos do sistema e limitando custos de computação.

O limitador será integrado diretamente no ponto de entrada das seguintes rotas:
- `/api/gemini-insights`
- `/api/gemini-copilot`

## Benefícios
- **Proteção Anti-Spam:** Evita a sobrecarga de chamadas de IA abusivas.
- **Redução de Custos:** Protege a chave da API do Gemini contra exaustão de cota financeira.
- **Zero Dependências:** Implementação em JavaScript puro sem necessidade de bibliotecas externas pesadas ou bancos de dados adicionais como Redis.
- **Conformidade Legal:** Reforça a proteção e disponibilidade do sistema alinhada às premissas de segurança do projeto.
