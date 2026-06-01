## 1. Estrutura e Configuração (Scaffold and Setup)

- [ ] 1.1 Criar a estrutura do diretório `app/dashboard/perfil/` e inicializar `page.jsx` com `"use client"`.
- [ ] 1.2 Importar `framer-motion` (`motion`) e definir uma variante de container escalonada (staggered) de nível superior e uma variante de item.

## 2. Interface da Ficha de Personagem RPG (RPG Character Sheet UI)

- [ ] 2.1 Construir o Cartão de Identidade principal: envolver em um `<motion.div>`. Incluir um anel de avatar grande e metálico como placeholder. Preencher com as strings estáticas exatas: "Paulo Vitor", "Analista de Suporte de TI" e "Ciência da Computação - 2º Semestre (Noturno) na Faculdade Impacta".
- [ ] 2.2 Estilizar o Cartão de Identidade usando a estética Rich Black (`bg-[#0a0c14]/80 backdrop-blur-2xl border border-white/5`). Adicionar detalhes de texto metálicos (ex: `text-gray-400`).

## 3. Matriz de Gamificação (Gamification Matrix)

- [ ] 3.1 Construir o bloco de XP / Nível: Exibir "Level 12". Incluir uma barra de progresso fina e elegante (ex: 65% de largura) com um brilho neon (`shadow-[0_0_15px_rgba(58,134,255,0.6)]`) e preenchimento `#3a86ff` correspondente.
- [ ] 3.2 Construir a Grade de Estatísticas abaixo da barra de XP (`grid-cols-2`). Incluir cartões de glassmorphism menores e distintos para 'Tarefas Concluídas' (ex: 148) e 'Horas de Estudo' (ex: 34h). Usar ícones do `lucide-react`.

## 4. Verificação Final

- [ ] 4.1 Garantir que o layout se empilhe de forma limpa em dispositivos móveis e se expanda com segurança em tamanhos de desktop (restrição `max-w-5xl`).
- [ ] 4.2 Verificar se nenhuma consulta ao banco de dados está quebrando a estrutura de forma inadvertida, mantendo a interface completamente estática conforme solicitado.
