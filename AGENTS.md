# AGENTS.md

Guide for AI coding agents working in this repository.

## Project Overview

pdf-kit is a privacy-first, client-side PDF toolkit built with React 19, TypeScript, and Vite. All PDF processing happens in the browser using `pdf-lib` (write/edit) and `pdfjs-dist` (read/render). Deployed to Cloudflare Pages.

## Commands

```bash
pnpm dev          # Start Vite dev server
pnpm build        # Type-check (tsc -b) then bundle (vite build)
pnpm preview      # Build + local Cloudflare preview (wrangler dev)
pnpm check        # Run Biome linter + formatter (run this before committing)
pnpm lint         # Biome lint only
pnpm format       # Biome format only
pnpm deploy       # Build + deploy to Cloudflare Pages
```

**No test framework is configured.** There are no tests in this repo. If you add tests, prefer Vitest (Vite-native) and add a `pnpm test` script.

Running a single command is not applicable since there are no tests. Use `pnpm check` to verify code quality on individual changes.

## Architecture

- **Routing:** TanStack Router with file-based routing in `src/routes/`. Route components are named `RouteComponent`. Never edit `src/routeTree.gen.ts` (auto-generated).
- **Tool routes:** `src/routes/(tools)/` — parenthesized group means no URL prefix for the layout.
- **Components:** `src/components/` — custom components; `src/components/ui/` — shadcn/ui primitives.
- **PDF logic:** `src/lib/pdf.ts` — all pdf-lib manipulation functions.
- **Utilities:** `src/lib/utils.ts` — `cn()` (clsx + tailwind-merge) and `downloadBlob()`.
- **Schemas:** `src/models/index.ts` — Zod schemas with inferred types via `z.infer<>`.
- **Path alias:** `@/` maps to `./src/`.

## Guiding Principles

- **Maximize type safety.** Prefer types over runtime checks where possible, but validate external/untrusted input with Zod at boundaries. Never use `as` casts to bypass the type system — fix the types instead.
- **Zod for validation.** All user input, form data, and external data should be validated with Zod schemas. Define schemas in `src/models/index.ts` and infer TypeScript types from them with `z.infer<>`. Never manually duplicate a Zod schema as a separate TypeScript type.
- **shadcn/ui for components.** Before building a UI element, check `src/components/ui/` for an existing shadcn primitive. If one exists, use it. If not, add a new shadcn component rather than writing raw HTML + Tailwind. Custom components should compose shadcn primitives, not replace them.

## Code Style

### TypeScript

- **Strict mode** is enabled. `verbatimModuleSyntax` and `erasableSyntaxOnly` are on.
- Use `import type { Foo }` for type-only imports — required by `verbatimModuleSyntax`.
- No enums. Use `as const` objects or string union types instead.
- No `any` — Biome will error on `noExplicitAny`.
- Never use `as` casts to bypass the type system — fix the types instead.
- Unused variables and locals are errors.

### Formatting (Biome)

- Double quotes for strings.
- 2-space indentation.
- Line width: 100 characters.
- Imports are auto-organized by Biome (`organizeImports: "on"`).
- Run `pnpm check` to fix formatting and lint issues in one command.

### Naming

- **Files:** kebab-case (`tool-header.tsx`, `mode-toggle.tsx`). Exception: `DropZoneFileInput.tsx` and other PascalCase component files exist — match the existing file's convention when editing.
- **Components:** PascalCase function declarations (`function RouteComponent()`).
- **Variables/functions:** camelCase.
- **Types/interfaces:** PascalCase.
- **Constants:** camelCase for general constants; SCREAMING_SNAKE_CASE only for true environment-level constants.

### Components

- Use function declarations, not arrow functions: `export function MyComponent() { ... }`
- No `React.FC`. Define props inline for simple cases or as `interface` for complex ones:
  ```tsx
  function FileItem({ file, onRemove }: { file: File; onRemove: () => void }) { ... }
  ```
- **Named exports only** — no default exports.
- React Compiler is enabled via Babel preset — do not manually add `useMemo` or `useCallback`.

### Imports

- Third-party imports first, then `@/` internal imports. Biome handles ordering automatically.
- ESM only — no `require()` or `module.exports`.
- Use `@/` path alias for internal imports, not relative `../` paths crossing directories.

### Styling

- Tailwind CSS v4 utility classes. Use `cn()` for conditional/merged classes.
- Responsive design with Tailwind breakpoints (`sm:`, `md:`, `lg:`).
- Theme colors use CSS custom properties defined in `src/index.css`.

### Error Handling

- Use `console.error()` in catch blocks.
- No global error boundaries currently exist — keep error handling local to operations.

### Forms

- `react-hook-form` + `zod` for validation. Zod schemas live in `src/models/index.ts` — types are inferred via `z.infer<>`, never duplicated manually.
- Use shadcn `Controller` wrapping custom `Field`/`FieldLabel`/`FieldError` components.
- Parse all external input (form submissions, file metadata, URL params) through Zod before use.

## What Not to Touch

- `src/routeTree.gen.ts` — auto-generated by TanStack Router.
- `worker-configuration.d.ts` — auto-generated Cloudflare types.
- `dist/` — build output.

## Environment

- **Package manager:** pnpm (never use npm or yarn).
- **Deployment:** Cloudflare Pages via Wrangler. Worker entry at `src/worker.ts`.
- **Node:** Uses ES2023 target.
