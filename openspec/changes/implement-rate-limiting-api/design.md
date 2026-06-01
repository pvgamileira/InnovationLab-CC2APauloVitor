# Design: Limitador de Taxa em Memória (In-Memory Rate Limiting) para Rotas de API

## Componente: Biblioteca de Segurança (`lib/rate-limit.js`)

Criar um módulo utilitário em `lib/rate-limit.js` que exportará o limitador de taxa.

### Algoritmo do Rate Limiter
- Utilizar um objeto global do tipo `Map` para rastrear pares de chave-valor, onde a chave é o endereço IP e o valor é um array de timestamps (milissegundos) representando os momentos das requisições válidas.
- Implementar uma limpeza (*pruning*) periódica de IPs inativos para evitar vazamentos de memória (memory leaks) na aplicação.
- Assinatura da função: `rateLimit(ip, limit = 5, windowMs = 60000)`

```javascript
const tracker = new Map();
let lastCleanup = Date.now();

export function rateLimit(ip, limit = 5, windowMs = 60000) {
  const now = Date.now();

  // Limpeza periódica (duplo do tempo da janela)
  if (now - lastCleanup > windowMs * 2) {
    for (const [key, timestamps] of tracker.entries()) {
      const active = timestamps.filter(t => now - t < windowMs);
      if (active.length === 0) {
        tracker.delete(key);
      } else {
        tracker.set(key, active);
      }
    }
    lastCleanup = now;
  }

  if (!tracker.has(ip)) {
    tracker.set(ip, []);
  }

  let requests = tracker.get(ip);
  requests = requests.filter(timestamp => now - timestamp < windowMs);

  if (requests.length >= limit) {
    tracker.set(ip, requests);
    return { success: false };
  }

  requests.push(now);
  tracker.set(ip, requests);
  return { success: true };
}
```

---

## Componentes: Rotas de API

### 1. Rota Gemini Insights (`app/api/gemini-insights/route.js`)
- Importar `rateLimit` de `@/lib/rate-limit` (ou caminho relativo).
- No início do handler `POST`, extrair o endereço IP do cabeçalho `x-forwarded-for` ou valor padrão `127.0.0.1`.
- Executar `rateLimit(ip, 5, 60000)`.
- Se `{ success: false }`, retornar imediatamente `NextResponse.json({ error: "Muitas requisições. Bloqueio anti-spam ativado." }, { status: 429 })`.

### 2. Rota Gemini Copilot (`app/api/gemini-copilot/route.js`)
- Executar o mesmo fluxo de validação no início da rota `POST`.
- Se o IP exceder o limite de 5 requisições por minuto, bloquear retornando HTTP 429.

---

## Restrições de Desenvolvimento
- **Pure JavaScript:** Sem uso de TypeScript ou bibliotecas Node externas (como `express-rate-limit` ou Redis).
- **Sem Alteração de IA ou Autenticação:** Manter o prompt original do Gemini e as validações de sessão do Supabase perfeitamente intactos.
