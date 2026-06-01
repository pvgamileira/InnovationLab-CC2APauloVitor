# Design: Impor Limites do Plano Gratuito e Upsells Sutis

## Componente: Travas de Disciplinas no Modal (`app/dashboard/page.jsx`)
- Identificar o formulário do modal de criação de nova disciplina.
- Utilizar a propriedade condicional `disabled={submitting || subjects.length >= 3}` no botão de envio.
- Dinamizar o texto do botão com base no tamanho do array de disciplinas carregadas (`subjects`).
- Exibir helper text abaixo das opções do formulário contendo link inline para `/dashboard/premium` com preenchimento em Metallic Blue (`#3a86ff`).

---

## Componente: Rota de API Gemini (`app/api/gemini-insights/route.js`)
- Alterar o tratamento do bloco do `rateLimit` no topo do arquivo.
- Modificar o JSON de retorno de erro de 429 para:
  ```json
  { "error": "Limite diário atingido no plano Padrão. Faça o upgrade para o Pro (R$ 9,90) e desbloqueie a IA ilimitada!" }
  ```

---

## Componente: Menu Lateral (`app/dashboard/layout.jsx`)
- Localizar a seção de perfil no topo da barra de navegação esquerda.
- Estruturar um contêiner flexível de coluna contendo o HUD de XP/Nível e a nova tag de upgrade.
- Estilizar a tag com gradiente suave do Metallic Blue para Roxo semitransparentes (`from-[#3a86ff]/20 to-purple-500/20`), bordas brilhantes, micro-animações no hover e link ativo para `/dashboard/premium`.
