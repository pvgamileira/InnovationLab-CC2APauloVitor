# Design: Atalhos Premium e UI de Insígnias de Conquista

## Componente: Atalho Upgrade Pro no Sidebar (`app/dashboard/layout.jsx`)
- Adicionar um botão destacado na base do painel de navegação.
- Aplicar gradiente metálico azul/púrpura (`from-[#3a86ff] to-[#433aff]`) com box-shadow brilhante e animação de varredura (Sweep Highlight) ao passar o cursor.

---

## Componente: Botão "Ver Planos" no Hero (`app/page.jsx`)
- Modificar o contêiner de botões do Hero para flex side-by-side no desktop.
- Adicionar botão com design secundário (borda translúcida e fundo levemente iluminado) apontando para o âncora `#pricing`.

---

## Componente: UI de Insígnias (`app/dashboard/page.jsx`)
- Inserir um pequeno flex row contendo a tag discreta "Insígnias" e 3 pequenos cards de insígnias:
  - Foco Rápido (`Zap`) em tom dourado/âmbar.
  - Sniper de Prazos (`Target`) em tom azul metálico.
  - Zero Atrasos (`ShieldCheck`) em tom esmeralda.
- Cada insígnia terá estilização premium em vidro translúcido, hover interativo com escala e tooltips flutuantes elegantes.
