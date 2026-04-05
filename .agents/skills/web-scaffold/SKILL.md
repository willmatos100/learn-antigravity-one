---
name: web-scaffold
description: Scaffold professional web project structures with clean architecture, human-readable naming, and real boilerplate files. Use this skill ALWAYS when the user asks to create, scaffold, bootstrap, or set up a web project — frontend, backend, fullstack, or API. Trigger on phrases like "cria a estrutura de um projeto", "scaffold", "boilerplate", "monta o projeto", "project setup", "starter template", "iniciar projeto", "arquitetura de pastas", "folder structure", or any request to generate a project from scratch. Also trigger when the user asks to organize or restructure an existing codebase. Covers React, Next.js, Vue, Nuxt, Svelte, Node/Express, Fastify, NestJS, Python/FastAPI, and vanilla HTML/CSS/JS stacks.
---

# Web Scaffold

Generate professional, production-ready project structures for web applications. The output is always twofold: real files on disk AND a clear explanation of the architecture decisions.

## Core Philosophy

The goal is **clarity over cleverness**. A junior dev should open the project and immediately understand where things live and why. Every folder name should be self-explanatory, every file should have a reason to exist, and nothing should be there "just in case."

Three rules that guide every scaffold:

1. **Name things for humans** — `src/features/auth/` beats `src/modules/a/`. Folder names are lowercase-kebab-case, descriptive, and never abbreviated beyond common conventions (`db`, `api`, `ui` are OK; `hlprs`, `utls`, `svc` are not).

2. **Earn your complexity** — Start lean. A solo project doesn't need a monorepo. An MVP doesn't need barrel files, dependency injection, or a `/shared/core/domain/` layer. Add structure when the project's scale justifies it.

3. **Separate what changes for different reasons** — Group by feature/domain rather than by technical layer when the project has 3+ features. A flat `components/`, `hooks/`, `services/` structure is fine for small projects; feature folders become valuable as the codebase grows.

## Workflow

### Step 1 — Understand the project

Before generating anything, identify:

- **Stack**: Which framework(s) and language(s)?
- **Scale**: Is this an MVP/prototype, a mid-size app, or a large-scale system?
- **Type**: SPA, SSR, static site, API, fullstack monolith, monorepo?
- **Domain**: What does the app actually do? (e-commerce, SaaS dashboard, blog, etc.)

If the user's request is vague (e.g., "cria um projeto React"), ask ONE clarifying question that covers the gaps. Don't interrogate — infer sensible defaults and state your assumptions.

**Default assumptions when not specified:**
- TypeScript over JavaScript
- Feature-based organization for 3+ features, flat for smaller projects
- Single package (not monorepo) unless explicitly requested
- No CSS framework assumed — mention the choice and let the user decide
- Essential configs only (tsconfig, .gitignore, .env.example, package.json)

### Step 2 — Pick the architecture pattern

Read `references/patterns.md` to select the right pattern for the project's stack and scale. The reference file contains battle-tested structures for common scenarios.

Choose between these organizational strategies:

**Flat structure** — For small projects, MVPs, or single-feature apps:
```
src/
  components/
  hooks/
  services/
  utils/
  types/
```

**Feature-based** — For mid-size apps with clear domain boundaries:
```
src/
  features/
    auth/
      components/
      hooks/
      services/
      auth.types.ts
    dashboard/
      components/
      hooks/
      services/
      dashboard.types.ts
  shared/
    components/
    hooks/
    utils/
```

**Domain-driven** — For large-scale systems with complex business logic:
```
src/
  domains/
    orders/
      application/
      infrastructure/
      presentation/
      orders.module.ts
    users/
      ...
  shared/
    ...
```

### Step 3 — Generate the files

Create real files on disk with meaningful boilerplate. Every file should contain enough content to be immediately useful — not just empty exports.

**What to include in every scaffold:**

| File | Purpose |
|------|---------|
| `README.md` | Project overview, setup instructions, folder architecture explanation |
| `package.json` | Dependencies, scripts (dev, build, test, lint) |
| `tsconfig.json` | TypeScript config with path aliases matching the folder structure |
| `.gitignore` | Standard ignores for the stack |
| `.env.example` | Documented environment variables with placeholder values |

**What to include in each source file:**

- A short comment at the top explaining the file's responsibility (1-2 lines max)
- Minimal working code — not `TODO` placeholders, but actual functional stubs
- Proper TypeScript types where applicable
- Imports that reference real files in the project (validates the structure works)

**What NOT to include (unless explicitly asked):**

- ESLint / Prettier configs (mention they can be added, but don't include by default)
- Husky / lint-staged / commitlint
- CI/CD pipelines
- Docker files
- Testing setup beyond the basic structure
- Barrel files (`index.ts` re-exports) in every folder — only where they genuinely help

### Step 4 — Explain the architecture

After creating the files, provide a concise explanation covering:

1. **Visual tree** — Show the complete folder structure using a `tree` command or ASCII art
2. **Architecture rationale** — Why this organization pattern was chosen (2-3 sentences)
3. **Key conventions** — Naming, file placement, import patterns (keep it brief)
4. **Growth path** — How the structure should evolve as the project grows (1-2 sentences)

Keep the explanation tight. The README inside the project should have the detailed documentation; the chat explanation is a quick overview.

## Stack-Specific Guidelines

### Frontend (React / Next.js / Vue / Svelte)

- Place pages/routes at the top level of `src/` following framework conventions (`app/` for Next.js App Router, `pages/` for Pages Router, `routes/` for SvelteKit)
- Keep components close to where they're used; only promote to `shared/` when reused across 2+ features
- Co-locate styles with components (CSS Modules, styled-components, or Tailwind — whatever the user prefers)
- Put API client code in `services/` or `api/`, never in components directly
- Types that are shared go in a top-level `types/` folder; feature-specific types stay in the feature folder

### Backend (Node / Express / Fastify / NestJS / Python)

- Separate **routes** (HTTP layer) from **services** (business logic) from **repositories** (data access)
- Keep middleware in a dedicated `middleware/` folder
- Database schemas/models live in `db/` or `database/`, not scattered across features
- Config lives in `config/` and reads from environment variables — never hardcode values
- Error handling gets its own module (`errors/` or `exceptions/`)
- Validation schemas (Zod, Joi, Pydantic) co-locate with the route or feature that uses them

### Fullstack (Monolith or Monorepo)

For monolith apps (e.g., Next.js fullstack):
```
src/
  app/            # Routes and pages
  features/       # Feature modules (shared between client/server)
  server/         # Server-only code (API routes logic, db, services)
  shared/         # Truly shared utilities and types
```

For monorepo apps (when explicitly requested):
```
apps/
  web/            # Frontend app
  api/            # Backend API
packages/
  shared/         # Shared types, utils, configs
  ui/             # Shared UI components (if needed)
```

### Python (FastAPI / Django / Flask)

- Follow Python package conventions with `__init__.py` files
- Use `src/` layout for proper packaging
- Keep `requirements.txt` or `pyproject.toml` at the root
- Separate routers/views from services from models
- Use Pydantic models (FastAPI) or serializers (Django) for validation

## Naming Conventions

These conventions apply across all stacks:

| Element | Convention | Example |
|---------|-----------|---------|
| Folders | kebab-case | `user-profile/`, `order-history/` |
| React components | PascalCase | `UserCard.tsx`, `OrderList.tsx` |
| Hooks | camelCase with `use` prefix | `useAuth.ts`, `useOrders.ts` |
| Services/utils | camelCase | `authService.ts`, `formatDate.ts` |
| Types/interfaces | PascalCase | `User.types.ts`, `Order.types.ts` |
| Constants | SCREAMING_SNAKE_CASE in file | `export const MAX_RETRIES = 3` |
| Config files | lowercase dot-notation | `.env.example`, `tsconfig.json` |
| Python files | snake_case | `user_service.py`, `order_model.py` |

## README Template

Every scaffold includes a README.md with this structure (adapt the content, not the format):

```markdown
# Project Name

Brief description of what this project does.

## Tech Stack

- **Frontend**: [framework + key libs]
- **Backend**: [framework + key libs]
- **Database**: [if applicable]

## Getting Started

### Prerequisites
- Node.js >= 18 (or relevant runtime)
- [other requirements]

### Installation
[step-by-step setup commands]

### Development
[how to run locally]

## Project Structure

[ASCII tree of the folder structure with 1-line descriptions for key folders]

## Architecture Decisions

[2-3 paragraphs explaining why the project is organized this way]
```

## Output Checklist

Before presenting the scaffold, verify:

- [ ] Every folder has at least one real file (no empty directories)
- [ ] All imports between files resolve correctly
- [ ] `package.json` scripts actually work with the file structure
- [ ] `.env.example` documents every env var the code references
- [ ] `tsconfig.json` path aliases match the actual folder layout
- [ ] README includes the full folder tree and setup instructions
- [ ] No unnecessary abstraction layers for the project's current scale
- [ ] File names follow the naming conventions consistently
