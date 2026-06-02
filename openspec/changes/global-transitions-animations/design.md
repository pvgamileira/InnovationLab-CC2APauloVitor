# Design: Transições Globais de Página, Animações de Modais e Notificações

## Configuração do Tailwind CSS v4 (`app/globals.css`)
As animações e keyframes customizados serão declarados na diretiva `@theme`:

```css
@theme {
  --animate-fade-in: fade-in 300ms ease-out;
  --animate-slide-in-right: slide-in-right 300ms cubic-bezier(0.16, 1, 0.3, 1);
  --animate-slide-up: slide-up 400ms cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slide-in-right {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }

  @keyframes slide-up {
    from {
      transform: translateY(10px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
}
```

---

## Estrutura do `app/template.jsx`
- O arquivo deve residir na pasta `app/` e atuar como um invólucro dinâmico das páginas.
- Código-fonte limpo em JavaScript puro (React):
```javascript
'use client';

export default function Template({ children }) {
  return (
    <div className="animate-fade-in animate-slide-up min-h-screen">
      {children}
    </div>
  );
}
```

---

## Modais de Disciplina e Tarefas (`app/dashboard/page.jsx` e `app/dashboard/disciplinas/page.jsx`)
- O backdrop escuro (`fixed inset-0 bg-black/80`) receberá a classe `animate-fade-in`.
- O card interno receberá a animação `animate-slide-up` juntamente com transição suave de escala: `animate-in zoom-in-95 duration-300`.
