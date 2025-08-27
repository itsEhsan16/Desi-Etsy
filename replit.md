# Replit.md

## Overview

This is a full-stack e-commerce marketplace application called "Desi Etsy" - a platform showcasing authentic Indian handmade products and connecting customers with traditional artisans. The application features a React frontend with modern UI components, an Express.js backend API, and PostgreSQL database integration with Drizzle ORM. The platform enables users to browse products by categories, view detailed product information, manage shopping carts and wishlists, authenticate securely, and discover featured artisans and their craft stories.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The client-side is built with React 18 and TypeScript, using Vite as the build tool. The UI framework leverages shadcn/ui components built on top of Radix UI primitives for accessibility and consistency. The application uses Wouter for lightweight client-side routing and TanStack Query for efficient server state management and caching. Context providers manage global state for authentication (AuthContext) and shopping cart functionality (CartProvider). The styling system combines Tailwind CSS with CSS custom properties for theming, featuring a warm Indian-inspired color palette with primary orange and secondary red colors.

### Backend Architecture
The server is implemented with Express.js and follows a RESTful API design pattern. The application uses a modular route structure in `server/routes.ts` that handles all API endpoints for categories, products, authentication, cart management, and artisan data. The storage layer is abstracted through an IStorage interface defined in `server/storage.ts`, enabling flexible database implementations while maintaining clean separation of concerns. Middleware handles CORS, request logging, JSON parsing, and error handling consistently across all routes.

### Data Storage
The application uses PostgreSQL as the primary database with Drizzle ORM for type-safe database operations and schema management. The database schema includes tables for users, artisans, categories, products, cart items, wishlists, orders, and reviews with proper foreign key relationships. Drizzle Kit handles database migrations and schema changes. The Neon serverless PostgreSQL adapter provides scalable database connectivity. Database operations are abstracted through a storage interface pattern that supports future database provider changes.

### Authentication and Authorization
User authentication supports multiple flows including email/password registration and login, with planned social login integration (Google, Facebook). The system implements role-based access control with customer, artisan, and admin roles. Session management uses secure HTTP-only cookies for persistent authentication state. Password security follows best practices with proper hashing and validation. OTP verification is planned for enhanced security during registration.

### State Management
The application uses a hybrid state management approach combining React Context for global state (auth, cart) and TanStack Query for server state management and caching. Local component state handles UI interactions like modal visibility, form inputs, and temporary display states. The cart context provides centralized shopping cart operations while maintaining optimistic updates and error handling.

## External Dependencies

The application integrates with several external services and libraries:

- **Neon Database**: Serverless PostgreSQL hosting for scalable data storage
- **Drizzle ORM**: Type-safe database operations and schema management
- **shadcn/ui & Radix UI**: Accessible component library for consistent UI design
- **TanStack Query**: Server state management and intelligent caching
- **React Hook Form**: Form handling with Zod validation for type safety
- **Tailwind CSS**: Utility-first CSS framework for responsive styling
- **Wouter**: Lightweight client-side routing solution
- **Unsplash**: Image hosting service for product and hero images
- **Google Fonts**: Typography using Poppins and Noto Sans Devanagari fonts
- **Replit Services**: Development environment integration and deployment tooling

The application is configured for deployment on Replit with proper environment variable management for database connections and API keys. The build process uses Vite for frontend bundling and esbuild for backend compilation, optimized for production deployment.