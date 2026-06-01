# Design: Atualização Final da Documentação Oficial (As-Built)

## Estrutura do Documento (`DOCUMENTACAO.md`)
- O arquivo deve manter sua formatação limpa e profissional em Markdown.
- Adicionar seções detalhadas com diagramas, tabelas comparativas e listas de benefícios.
- Linguagem formal em Português do Brasil (PT-BR), sem jargões informais.

---

## Seções a Serem Editadas/Criadas:

### 1. Seção de Monetização e Limitações (Plano Gratuito vs Pro)
Exposição clara e tabular das regras de negócio que controlam as permissões do usuário:
- **Plano Gratuito:** Limite estrito de até 3 disciplinas, máximo de 20 tarefas criadas no mês corrente, insights limitados da IA.
- **Plano Pro (R$ 9,90/mês):** Disciplinas e tarefas ilimitadas, IA generativa sem restrições, Tiers Platinum/Diamond ativados, auras exclusivas.

### 2. Seção de Gamificação Avançada
- **Heatmap de Atividade:** Gráfico que computa a frequência de tarefas resolvidas no mês.
- **Sistema de Tiers:** Progressão de níveis com medalhas associadas do Bronze ao Diamante.
- **Insígnias Metálicas de Conquista:**
  - **Foco Rápido (`Zap`):** Alunos que usam ativamente insights de IA para acelerar seus estudos.
  - **Sniper de Prazos (`Target`):** Conclusão de tarefas de forma antecipada em relação à data limite.
  - **Zero Atrasos (`ShieldCheck`):** Manter o painel em dia sem acumular pendências atrasadas na semana.

### 3. Seção de Segurança e Conectividade
- **Políticas de RLS do Supabase:** Garantia de isolamento onde qualquer consulta filtra por `auth.uid() = user_id`.
- **API Rate Limiter:** Travamento na camada do servidor para evitar sobrecarga de requisições maliciosas.
