# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development
pnpm dev          # Start development server on port 3000
pnpm build        # Build for production
pnpm start        # Start production server

# Testing
pnpm test         # Run tests with vitest
pnpm test:coverage # Run tests with coverage

# Code Quality
pnpm lint         # Lint code with oxlint
pnpm lint:fix     # Fix linting issues automatically
```

## Project Architecture

This is a **TanStack Start** full-stack React application with the following key architectural decisions:

### Core Stack
- **TanStack Start**: Full-stack React framework with file-based routing
- **TanStack Router**: Type-safe client-side routing with React Query integration
- **shadcn/ui**: Component library built on Radix UI primitives
- **Tailwind CSS v4**: Utility-first CSS framework (modern CSS-first config)
- **TypeScript**: Full type safety throughout

### Directory Structure
```
src/
├── routes/              # File-based routing (TanStack Router)
│   ├── __root.tsx      # Root layout with theme provider
│   ├── (marketing)/    # Route groups for organization
│   └── api/           # API routes
├── components/
│   ├── ui/            # shadcn/ui components
│   └── [other]/       # Custom components
├── lib/               # Shared utilities and configurations
├── styles/            # Global CSS files
└── utils/             # Utility functions
```

### Key Architectural Patterns

1. **Router Setup**: Uses `routerWithQueryClient` from `@tanstack/react-router-with-query` to integrate React Query with TanStack Router (src/router.tsx:11)

2. **Theme System**: Root layout includes theme provider with system/light/dark mode support (src/routes/__root.tsx:90)

3. **Type Safety**: Path aliases configured (`~/*` → `./src/*`) and strict TypeScript settings

4. **Component Architecture**: shadcn/ui components are in `src/components/ui/` - use `npx shadcn@latest add [component]` to add new ones

5. **Testing**: Vitest with jsdom environment, setup file at `tests/setup.ts`

## Project Purpose: Legacy-to-Modern Demo

This is a **side-by-side interactive demo** showing how UniBasic code transforms into modern .NET + SQL implementations. The demo targets 3-minute sales presentations with a "wow factor" for prospects.

### Demo Architecture (3-pane layout)

1. **Legacy Terminal Pane**: xterm.js terminal with prerecorded UniBasic routine execution
2. **Code Transformation Pane**: Monaco editor split view (UniBasic → C#/EF Core mapping)  
3. **Modern UI Preview Pane**: React components showing live calculations and modern forms

### Key UniBasic → Modern Mappings

- `READV CUSTOMER, ID, 1, NAME` → `var name = await _customerRepo.GetNameAsync(id);`
- `WRITEV INVOICE, INV.ID, 5, TOTAL` → `await _invoiceRepo.UpdateTotalAsync(invId, total);`
- `GOSUB CALC_TAX` → `var tax = _taxSvc.Calculate(product, gallons, state);`
- `WRITEU INVENTORY, TANK.NO, 3, NEW.QTY` → `await _inventorySvc.PostTxnAsync(tankId, qty);`

### Required Libraries

- **xterm.js**: Terminal emulation for legacy code demonstration
- **Monaco Editor**: Code editor with syntax highlighting and split views
- **Zustand or Context**: State management to synchronize all 3 panes
- Educational tooltips and callouts for explaining modernization benefits

### Demo Flow Requirements

- Step-through functionality with "Next" button
- Auto-scroll synchronization between panes
- Hover tooltips explaining each refactor
- Live field updates in modern UI as code transforms
- Educational callouts for rule isolation, data integrity, and DevOps improvements

## Package Manager

This project uses **pnpm** - always use `pnpm` commands instead of `npm` or `yarn`.

## Import Conventions

- Use `~/*` path alias for src imports (e.g., `import { Button } from "~/components/ui/button"`)
- TanStack Router file-based routing requires `.tsx` extension for route files
- Global middleware lives in `src/global-middleware.ts`