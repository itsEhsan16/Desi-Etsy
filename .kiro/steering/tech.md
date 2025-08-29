# Technology Stack

## Frontend
- **React 18** with TypeScript for type safety
- **Vite** as build tool and dev server
- **Wouter** for lightweight client-side routing
- **TanStack Query** for server state management and caching
- **shadcn/ui + Radix UI** for accessible component library
- **Tailwind CSS** with CSS custom properties for theming
- **React Hook Form + Zod** for form handling and validation

## Backend
- **Express.js** with TypeScript for REST API
- **Drizzle ORM** with PostgreSQL for type-safe database operations
- **Neon Database** for serverless PostgreSQL hosting
- **Zod** for runtime validation and schema definitions

## Development & Build
- **TypeScript** with strict mode enabled
- **ESBuild** for backend compilation
- **Drizzle Kit** for database migrations
- **tsx** for development server execution

## Common Commands
```bash
# Development
npm run dev          # Start development server with hot reload

# Database
npm run db:push      # Push schema changes to database

# Build & Deploy
npm run build        # Build for production
npm run start        # Start production server
npm run check        # TypeScript type checking
```

## Path Aliases
- `@/*` → `./client/src/*` (frontend components)
- `@shared/*` → `./shared/*` (shared schemas and types)
- `@assets/*` → `./attached_assets/*` (static assets)

