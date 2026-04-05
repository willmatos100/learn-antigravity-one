# Architecture Patterns Reference

Concrete, copy-ready folder structures for common web stacks. Each pattern shows the recommended structure at different scales.

---

## Table of Contents

1. [Next.js (App Router)](#nextjs-app-router)
2. [React SPA (Vite)](#react-spa-vite)
3. [Vue / Nuxt](#vue-nuxt)
4. [SvelteKit](#sveltekit)
5. [Node + Express / Fastify](#node-express-fastify)
6. [NestJS](#nestjs)
7. [Python FastAPI](#python-fastapi)
8. [Next.js Fullstack Monolith](#nextjs-fullstack-monolith)
9. [Monorepo (Turborepo)](#monorepo-turborepo)
10. [Vanilla HTML/CSS/JS](#vanilla)

---

## Next.js (App Router)

### Small (MVP / Landing page)

```
project-name/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   └── about/
│   │       └── page.tsx
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       └── Card.tsx
│   ├── lib/
│   │   └── utils.ts
│   └── types/
│       └── index.ts
├── public/
│   └── images/
├── .env.example
├── .gitignore
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

### Medium (SaaS app, 3-6 features)

```
project-name/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   ├── dashboard/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   └── settings/
│   │       └── page.tsx
│   ├── features/
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   └── RegisterForm.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useAuth.ts
│   │   │   ├── services/
│   │   │   │   └── authService.ts
│   │   │   └── auth.types.ts
│   │   └── dashboard/
│   │       ├── components/
│   │       ├── hooks/
│   │       └── services/
│   ├── shared/
│   │   ├── components/
│   │   │   └── ui/
│   │   ├── hooks/
│   │   │   └── useMediaQuery.ts
│   │   └── utils/
│   │       ├── formatDate.ts
│   │       └── cn.ts
│   ├── lib/
│   │   ├── api.ts
│   │   └── constants.ts
│   └── types/
│       └── globals.d.ts
├── public/
├── .env.example
├── .gitignore
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

**Key decisions:**
- Route groups `(auth)` for layout-less grouping
- `features/` for domain-specific code, `shared/` for cross-cutting concerns
- `lib/` for external service clients and app-wide constants

---

## React SPA (Vite)

### Small

```
project-name/
├── src/
│   ├── components/
│   │   ├── App.tsx
│   │   ├── Header.tsx
│   │   └── ui/
│   │       └── Button.tsx
│   ├── hooks/
│   │   └── useLocalStorage.ts
│   ├── services/
│   │   └── api.ts
│   ├── utils/
│   │   └── formatters.ts
│   ├── types/
│   │   └── index.ts
│   ├── assets/
│   │   └── styles/
│   │       └── globals.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── public/
├── index.html
├── .env.example
├── .gitignore
├── vite.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

### Medium (feature-based)

```
project-name/
├── src/
│   ├── app/
│   │   ├── App.tsx
│   │   ├── Router.tsx
│   │   └── providers/
│   │       └── AppProviders.tsx
│   ├── features/
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── services/
│   │   │   ├── stores/          # if using Zustand/Jotai
│   │   │   └── auth.types.ts
│   │   └── products/
│   │       ├── components/
│   │       ├── hooks/
│   │       ├── services/
│   │       └── products.types.ts
│   ├── shared/
│   │   ├── components/
│   │   │   └── ui/
│   │   ├── hooks/
│   │   ├── utils/
│   │   └── types/
│   ├── services/
│   │   └── apiClient.ts
│   ├── assets/
│   │   └── styles/
│   ├── main.tsx
│   └── vite-env.d.ts
├── public/
├── index.html
├── .env.example
├── .gitignore
├── vite.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

**Key decisions:**
- `app/` holds the shell (router, providers), not business logic
- State management (stores/) co-located with features
- `services/` at root only for shared API client setup

---

## Vue / Nuxt

### Nuxt 3 Medium

```
project-name/
├── app/
│   ├── components/
│   │   ├── global/
│   │   │   ├── AppHeader.vue
│   │   │   └── AppFooter.vue
│   │   └── ui/
│   │       ├── BaseButton.vue
│   │       └── BaseCard.vue
│   ├── composables/
│   │   ├── useAuth.ts
│   │   └── useToast.ts
│   ├── layouts/
│   │   ├── default.vue
│   │   └── auth.vue
│   ├── pages/
│   │   ├── index.vue
│   │   ├── login.vue
│   │   └── dashboard/
│   │       └── index.vue
│   ├── plugins/
│   │   └── api.ts
│   └── utils/
│       └── formatters.ts
├── server/
│   ├── api/
│   │   └── auth/
│   │       ├── login.post.ts
│   │       └── me.get.ts
│   ├── middleware/
│   │   └── auth.ts
│   └── utils/
│       └── db.ts
├── public/
├── .env.example
├── .gitignore
├── nuxt.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

**Key decisions:**
- Follow Nuxt auto-import conventions (composables/, components/, etc.)
- `server/` for API routes using Nitro file-based routing
- Component prefix `Base` for primitive UI, `App` for layout-level

---

## SvelteKit

### Medium

```
project-name/
├── src/
│   ├── routes/
│   │   ├── +layout.svelte
│   │   ├── +page.svelte
│   │   ├── login/
│   │   │   └── +page.svelte
│   │   ├── dashboard/
│   │   │   ├── +layout.svelte
│   │   │   ├── +page.svelte
│   │   │   └── +page.server.ts
│   │   └── api/
│   │       └── auth/
│   │           └── +server.ts
│   ├── lib/
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   │   └── Button.svelte
│   │   │   └── layout/
│   │   │       └── Header.svelte
│   │   ├── stores/
│   │   │   └── auth.ts
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── utils/
│   │   │   └── formatters.ts
│   │   └── types/
│   │       └── index.ts
│   ├── app.html
│   ├── app.css
│   └── app.d.ts
├── static/
├── .env.example
├── .gitignore
├── svelte.config.js
├── vite.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

**Key decisions:**
- Everything reusable under `$lib/` (SvelteKit's alias convention)
- File-based routing with `+page.server.ts` for server-side logic
- Stores in `lib/stores/` using Svelte's built-in store system

---

## Node + Express / Fastify

### Small API

```
project-name/
├── src/
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   └── users.routes.ts
│   ├── services/
│   │   ├── authService.ts
│   │   └── userService.ts
│   ├── middleware/
│   │   ├── errorHandler.ts
│   │   └── authenticate.ts
│   ├── db/
│   │   ├── connection.ts
│   │   └── schema.ts
│   ├── config/
│   │   └── env.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   └── logger.ts
│   └── server.ts
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

### Medium API (feature-based)

```
project-name/
├── src/
│   ├── features/
│   │   ├── auth/
│   │   │   ├── auth.routes.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.validation.ts
│   │   │   └── auth.types.ts
│   │   ├── users/
│   │   │   ├── users.routes.ts
│   │   │   ├── users.service.ts
│   │   │   ├── users.repository.ts
│   │   │   ├── users.validation.ts
│   │   │   └── users.types.ts
│   │   └── orders/
│   │       └── ...
│   ├── shared/
│   │   ├── middleware/
│   │   │   ├── errorHandler.ts
│   │   │   ├── authenticate.ts
│   │   │   └── rateLimiter.ts
│   │   ├── utils/
│   │   │   ├── logger.ts
│   │   │   └── response.ts
│   │   └── types/
│   │       └── express.d.ts
│   ├── db/
│   │   ├── connection.ts
│   │   ├── migrations/
│   │   └── seeds/
│   ├── config/
│   │   └── env.ts
│   └── server.ts
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

**Key decisions:**
- Routes → Services → Repositories layering (routes don't touch DB directly)
- Validation schemas co-located with routes (Zod or Joi)
- `db/` at the root level with migrations and seeds
- Config reads from env vars via a typed config module

---

## NestJS

### Medium

```
project-name/
├── src/
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.module.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.guard.ts
│   │   │   ├── dto/
│   │   │   │   ├── login.dto.ts
│   │   │   │   └── register.dto.ts
│   │   │   └── strategies/
│   │   │       └── jwt.strategy.ts
│   │   └── users/
│   │       ├── users.module.ts
│   │       ├── users.controller.ts
│   │       ├── users.service.ts
│   │       ├── users.repository.ts
│   │       ├── dto/
│   │       │   └── create-user.dto.ts
│   │       └── entities/
│   │           └── user.entity.ts
│   ├── common/
│   │   ├── decorators/
│   │   ├── filters/
│   │   │   └── http-exception.filter.ts
│   │   ├── guards/
│   │   ├── interceptors/
│   │   │   └── transform.interceptor.ts
│   │   └── pipes/
│   ├── config/
│   │   ├── app.config.ts
│   │   └── database.config.ts
│   ├── database/
│   │   └── migrations/
│   ├── app.module.ts
│   └── main.ts
├── .env.example
├── .gitignore
├── nest-cli.json
├── package.json
├── tsconfig.json
└── README.md
```

**Key decisions:**
- Follow NestJS module conventions strictly (module + controller + service per domain)
- DTOs for request validation, Entities for database models
- `common/` for cross-cutting NestJS constructs (guards, filters, interceptors, pipes)

---

## Python FastAPI

### Medium

```
project-name/
├── src/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   └── dependencies.py
│   ├── features/
│   │   ├── __init__.py
│   │   ├── auth/
│   │   │   ├── __init__.py
│   │   │   ├── router.py
│   │   │   ├── service.py
│   │   │   ├── schemas.py
│   │   │   └── models.py
│   │   └── users/
│   │       ├── __init__.py
│   │       ├── router.py
│   │       ├── service.py
│   │       ├── repository.py
│   │       ├── schemas.py
│   │       └── models.py
│   ├── shared/
│   │   ├── __init__.py
│   │   ├── database.py
│   │   ├── exceptions.py
│   │   └── middleware/
│   │       ├── __init__.py
│   │       └── auth.py
│   └── config/
│       ├── __init__.py
│       └── settings.py
├── migrations/
│   └── versions/
├── tests/
│   ├── __init__.py
│   └── features/
│       └── auth/
│           └── test_auth_service.py
├── .env.example
├── .gitignore
├── pyproject.toml
├── requirements.txt
└── README.md
```

**Key decisions:**
- `src/` layout for proper Python packaging
- Pydantic schemas for request/response validation
- SQLAlchemy models separate from Pydantic schemas
- Settings via Pydantic `BaseSettings` for typed env vars

---

## Next.js Fullstack Monolith

### Medium

```
project-name/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── (marketing)/
│   │   │   ├── page.tsx
│   │   │   └── pricing/page.tsx
│   │   ├── (app)/
│   │   │   ├── layout.tsx
│   │   │   ├── dashboard/page.tsx
│   │   │   └── settings/page.tsx
│   │   └── api/
│   │       ├── auth/[...nextauth]/route.ts
│   │       └── webhooks/stripe/route.ts
│   ├── features/
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   └── auth.types.ts
│   │   └── billing/
│   │       ├── components/
│   │       ├── actions/
│   │       │   └── createCheckout.ts
│   │       └── billing.types.ts
│   ├── server/
│   │   ├── db/
│   │   │   ├── client.ts
│   │   │   ├── schema.ts
│   │   │   └── migrations/
│   │   ├── services/
│   │   │   ├── authService.ts
│   │   │   └── billingService.ts
│   │   └── lib/
│   │       ├── stripe.ts
│   │       └── email.ts
│   ├── shared/
│   │   ├── components/
│   │   │   └── ui/
│   │   ├── hooks/
│   │   └── utils/
│   └── types/
│       └── globals.d.ts
├── public/
├── drizzle.config.ts
├── .env.example
├── .gitignore
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

**Key decisions:**
- `server/` isolates all server-only code (DB, external services, business logic)
- `features/actions/` for Next.js Server Actions
- Route groups `(marketing)` vs `(app)` to separate public/authenticated layouts
- API routes only for webhooks and auth — prefer Server Actions for mutations

---

## Monorepo (Turborepo)

### When explicitly requested

```
project-name/
├── apps/
│   ├── web/                    # Next.js frontend
│   │   ├── src/
│   │   ├── package.json
│   │   └── ...
│   └── api/                    # Express/Fastify backend
│       ├── src/
│       ├── package.json
│       └── ...
├── packages/
│   ├── shared/                 # Shared types, utils, constants
│   │   ├── src/
│   │   │   ├── types/
│   │   │   └── utils/
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── ui/                     # Shared component library (optional)
│       ├── src/
│       ├── package.json
│       └── tsconfig.json
├── .env.example
├── .gitignore
├── package.json
├── turbo.json
├── tsconfig.base.json
└── README.md
```

**Key decisions:**
- Only create monorepo when the user explicitly asks for it
- Each app is self-contained and could run independently
- `packages/shared/` for types and utils used by both apps
- `packages/ui/` only if there's a real need for a shared component library

---

## Vanilla HTML/CSS/JS

### Small (static site / landing page)

```
project-name/
├── index.html
├── css/
│   ├── reset.css
│   └── styles.css
├── js/
│   ├── main.js
│   └── utils.js
├── assets/
│   ├── images/
│   └── fonts/
├── pages/
│   ├── about.html
│   └── contact.html
├── .gitignore
└── README.md
```

### Medium (multi-page with build step)

```
project-name/
├── src/
│   ├── pages/
│   │   ├── index.html
│   │   ├── about.html
│   │   └── contact.html
│   ├── styles/
│   │   ├── base/
│   │   │   ├── reset.css
│   │   │   └── typography.css
│   │   ├── components/
│   │   │   ├── header.css
│   │   │   └── card.css
│   │   ├── layouts/
│   │   │   └── grid.css
│   │   └── main.css
│   ├── scripts/
│   │   ├── main.js
│   │   └── modules/
│   │       ├── navigation.js
│   │       └── forms.js
│   └── assets/
│       ├── images/
│       └── fonts/
├── public/
│   └── favicon.ico
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

**Key decisions:**
- Vite as build tool even for vanilla projects (fast, zero-config)
- CSS organized by concern (base, components, layouts)
- JS organized into ES modules
