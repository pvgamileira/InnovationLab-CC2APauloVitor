# Tarefas: Transições Globais de Página, Animações de Modais e Notificações

## 1. Configurar Animações no Tailwind V4 (`app/globals.css`)
- [x] Abrir `app/globals.css`.
- [x] Adicionar no bloco `@theme` as propriedades `--animate-fade-in`, `--animate-slide-in-right`, `--animate-slide-up` e seus respectivos `@keyframes` nativos de CSS.

## 2. Implementar Template de Transição de Páginas (`app/template.jsx`)
- [x] Criar o arquivo `app/template.jsx`.
- [x] Implementar a exportação padrão do componente funcional `Template` aplicando as classes de animação `animate-fade-in` e `animate-slide-up` no wrapper.

## 3. Animar Modais de Disciplinas e Tarefas
- [x] Abrir `app/dashboard/page.jsx` e `app/dashboard/disciplinas/page.jsx`.
- [x] Identificar a marcação HTML dos modais de criação/edição.
- [x] Injetar a classe `animate-fade-in` nos fundos escuros e aplicar classes de transição suave de escala/subida nos cards de conteúdo interno.

## 4. Animar Notificações/Alertas
- [x] Localizar as notificações ou alertas flutuantes no dashboard e aplicar `animate-slide-in-right`.

## 5. Validação
- [x] Navegar entre as telas do painel e constatar as transições e entradas de animação fluidas e sem quebras visuais.
