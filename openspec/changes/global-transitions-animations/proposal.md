# Proposta: Transições Globais de Página, Animações de Modais e Notificações

## Problema
A interface atual do EduTrack AI é muito estática e a troca de páginas/rotas sofre de cortes secos que reduzem a sensação de fluidez ("premium") do sistema. Além disso, modais e notificações surgem repentinamente sem micro-animações atrativas.

## Solução Proposta
Implementar transições suaves ("smoothie") e integradas através das seguintes estratégias baseadas puramente em JavaScript e Tailwind CSS V4:
1. **Configuração de Animações no Tailwind V4 (`app/globals.css`):**
   - Criar `@theme` personalizado declarando as animações `animate-fade-in` (opacidade de 0 a 1), `animate-slide-in-right` (deslocamento no eixo X vindo da direita) e `animate-slide-up` (deslocamento suave no eixo Y associado com fade-in).
2. **Transição de Páginas em Next.js:**
   - Criar `app/template.jsx` que envolverá todas as rotas do App Router em um contêiner animado com as classes `animate-fade-in` e `animate-slide-up`. Ao mudar de rota, o template é remontado e reexecuta as animações de entrada nativamente.
3. **Animações de Notificações:**
   - Adicionar a classe `animate-slide-in-right` nas notificações e alertas pop-up do sistema.
4. **Animações de Modais:**
   - Configurar o fundo escuro translúcido com `animate-fade-in` e o contêiner central do card com uma entrada suave de escala e elevação (`scale-[0.98]` para `scale-100` com subida).

## Benefícios
- **Experiência de Uso Ultra-Premium:** O sistema parecerá consideravelmente mais vivo e polido.
- **Micro-interações Modernas:** Otimização cognitiva com feedback visual suave nas ações do usuário.
