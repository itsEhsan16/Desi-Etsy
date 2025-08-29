# Project Structure

## Root Level Organization
```
├── client/          # React frontend application
├── server/          # Express.js backend API
├── shared/          # Shared types and schemas
├── attached_assets/ # Static assets and images
└── .kiro/          # Kiro IDE configuration
```

## Frontend Structure (`client/`)
```
client/
├── src/
│   ├── components/  # Reusable UI components
│   ├── contexts/    # React context providers (auth, cart)
│   ├── hooks/       # Custom React hooks
│   ├── lib/         # Utility functions and configurations
│   ├── pages/       # Route components
│   ├── App.tsx      # Main app component with routing
│   └── main.tsx     # React app entry point
└── index.html       # HTML template
```

## Backend Structure (`server/`)
```
server/
├── index.ts         # Express server setup and middleware
├── routes.ts        # API route definitions
├── storage.ts       # Database abstraction layer
└── vite.ts          # Vite integration for development
```

## Shared Code (`shared/`)
```
shared/
└── schema.ts        # Drizzle schemas, Zod validators, and TypeScript types
```

## Architecture Patterns

### Frontend Patterns
- **Component Organization**: UI components in `/components`, page components in `/pages`
- **State Management**: React Context for global state, TanStack Query for server state
- **Routing**: File-based routing with Wouter
- **Styling**: Tailwind utility classes with shadcn/ui components

### Backend Patterns
- **API Design**: RESTful endpoints with consistent error handling
- **Data Layer**: Storage interface pattern for database abstraction
- **Validation**: Zod schemas for request/response validation
- **Middleware**: Express middleware for logging, CORS, and error handling

### Code Organization
- **Shared Types**: All database schemas and types defined in `shared/schema.ts`
- **Path Aliases**: Use `@/` for frontend, `@shared/` for shared code
- **Import Style**: ES modules throughout, no CommonJS