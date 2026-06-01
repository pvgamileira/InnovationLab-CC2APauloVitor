const tracker = new Map();
let lastCleanup = Date.now();

/**
 * Limitador de taxa em memória (Rate Limiter)
 * Rastreia as requisições por endereço IP em janelas de tempo deslizantes.
 * 
 * @param {string} ip - O endereço IP do cliente.
 * @param {number} limit - Número máximo de requisições permitidas na janela.
 * @param {number} windowMs - Tamanho da janela de tempo em milissegundos.
 * @returns {{ success: boolean }}
 */
export function rateLimit(ip, limit = 5, windowMs = 60000) {
  const now = Date.now();

  // Limpeza periódica preventiva a cada 2 janelas para evitar acúmulo de dados na memória RAM (Garbage Collection)
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

  // Inicializa o IP se for a primeira requisição na janela ativa
  if (!tracker.has(ip)) {
    tracker.set(ip, []);
  }

  let requests = tracker.get(ip);
  
  // Filtra apenas requisições dentro da janela de tempo atual
  requests = requests.filter(timestamp => now - timestamp < windowMs);

  // Se excedeu o limite máximo, bloqueia o acesso
  if (requests.length >= limit) {
    tracker.set(ip, requests); // Atualiza com a lista limpa
    return { success: false };
  }

  // Registra o timestamp atual e autoriza
  requests.push(now);
  tracker.set(ip, requests);
  return { success: true };
}
