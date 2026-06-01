# Proposta: Impor Limites do Plano Gratuito e Upsells Sutis

## Problema
Após introduzirmos a camada de monetização com o plano **EduTrack Pro** por R$ 9,90/mês, precisamos incentivar ativamente a migração de planos de forma natural e intuitiva. Atualmente, o Plano Gratuito não restringe o número máximo de disciplinas cadastradas (limite estabelecido de 3), nem expõe mensagens amigáveis de upgrade na interface ao bater o limite de consultas ao mentor de inteligência artificial.

## Solução Proposta
Enfurecer limites de recursos e inserir chamadas sutis para ação (CTAs/Upsells) sem pop-ups invasivos que prejudiquem a usabilidade:
1. **Trava de Disciplinas:** No modal de criação de disciplinas (`app/dashboard/page.jsx`), se a contagem do array de disciplinas do estudante for maior ou igual a 3, desabilitar o botão de submissão do formulário. Mudar o rótulo do botão para *"Limite de 3 atingido - Faça Upgrade"* e expor uma mensagem explicativa com link direto para a página `/dashboard/premium`.
2. **Mensagem Amigável da IA (Rate Limit):** Configurar a rota `app/api/gemini-insights/route.js` para responder ao código `429` (muitas requisições) com a mensagem explicativa: *"Limite diário atingido no plano Padrão. Faça o upgrade para o Pro (R$ 9,90) e desbloqueie a IA ilimitada!"*.
3. **Badge Sutil no Menu:** Em `app/dashboard/layout.jsx`, imediatamente abaixo da indicação de nível e XP do estudante no menu lateral (`Sidebar`), adicionar uma elegante tag com link direcionado a `/dashboard/premium`: *✨ Fazer Upgrade (R$ 9,90)*.

## Benefícios
- **Conversão Orgânica:** Usuários com real necessidade de alta performance serão encorajados a assinar de forma natural ao interagir com as travas do sistema.
- **Transparência e Resiliência:** Preservação de 100% da usabilidade para os dados já cadastrados, sem modais intrusivos de bloqueio completo da tela.
