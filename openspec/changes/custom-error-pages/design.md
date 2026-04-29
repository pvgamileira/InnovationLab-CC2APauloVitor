# Design: Custom 404 and Error Pages

## Component: 404 Not Found Page
**File**: `app/not-found.jsx`
- **Theme**: Dark background (`bg-[#02040a]`) with a subtle blue/indigo ambient glow.
- **Icon**: `MapPinOff` from `lucide-react`.
- **Content**: 
  - Massive "404" text with gradient clipping (`bg-clip-text text-transparent`).
  - Title: "Página não encontrada".
  - Subtext: "Parece que você se perdeu no ciberespaço acadêmico."
- **Action**: A Next.js `<Link>` pointing to `/dashboard` styled as a primary glowing button ("Voltar para o Dashboard").

## Component: 500 Global Error Page
**File**: `app/error.jsx`
- **Directive**: Must begin with `"use client";`.
- **Props**: Receives `({ error, reset })`.
- **Theme**: Dark background (`bg-[#02040a]`) with a warning aesthetic (subtle red/amber ambient glow).
- **Icon**: `AlertTriangle` from `lucide-react`.
- **Content**:
  - Title: "Erro de Sistema".
  - Subtext: "Nossos servidores tropeçaram. Tente novamente."
- **Actions**: Flex container with two buttons:
  - Primary Button: `onClick={() => reset()}` styled with amber/red accents ("Tentar Novamente").
  - Secondary Button: Next.js `<Link>` to `/` styled as a translucent ghost button ("Voltar ao Início").
