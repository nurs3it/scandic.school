# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Scandic International School website - a modern Next.js 15 application built for an international school in Almaty, Kazakhstan. The site features an IB PYP program showcase with multilingual support (Russian, Kazakh, English), application forms, and Instagram integration.

## Development Commands

### Core Development
```bash
# Start development server with Turbopack and port checking
npm run dev

# Build for production with Turbopack optimization
npm run build

# Start production server with port checking
npm start

# Lint code using ESLint with Next.js config
npm run lint
```

### Port Management
The project includes automatic port checking via `scripts/check-port.js`. If port 3000 is occupied:
```bash
# Kill processes on port 3000
lsof -ti:3000 | xargs kill -9
```

## Architecture & Tech Stack

### Core Framework
- **Next.js 15** with App Router and Turbopack
- **TypeScript** for type safety
- **React 19** with Server Components and Client Components pattern

### Styling & UI
- **Tailwind CSS** with custom design system
- **Shadcn UI** components (New York style) with Radix UI primitives
- **Framer Motion** for animations and transitions
- **Custom color palette**: Primary (#ffb400 - Scandic Yellow), Secondary (#153b24 - Scandic Green)

### State Management & Data
- **TanStack Query (React Query)** for server state management with caching
- **React Hook Form** with Zod validation for forms
- **Server Actions** for form submissions and server-side operations

### Key Features
- **Multilingual support** (ru, kk, en) with metadata localization
- **SEO optimization** with comprehensive metadata, sitemap, and robots.txt
- **Performance optimization** with image optimization, compression, and Turbopack
- **Security headers** configured in Next.js config

## File Structure & Patterns

### App Router Structure
```
src/app/
├── layout.tsx          # Root layout with QueryProvider and metadata
├── page.tsx            # Homepage with section components
├── about/page.tsx      # About page with mission and stats
├── contact/page.tsx    # Contact page with form and info
├── application/page.tsx # Application form page
├── globals.css         # Global styles and CSS variables
├── loading.tsx         # Global loading component
├── robots.ts           # Dynamic robots.txt generation
└── sitemap.xml.ts      # Dynamic sitemap generation
```

### Component Architecture
- **Page Components**: Composed of section components (Hero, Features, Programs, etc.)
- **UI Components**: Shadcn UI components in `src/components/ui/`
- **Business Components**: Feature-specific components with animations and interactions
- **Layout Components**: Header and Footer with navigation and contact info

### Data Layer
- **Server Actions** in `src/lib/actions.ts` handle form submissions
- **TanStack Query hooks** in `src/lib/hooks.ts` manage client-side data fetching
- **Form schemas** using Zod for validation

## Development Patterns

### Component Conventions
- Use `"use client"` directive for interactive components
- Server Components by default for static content
- Custom hooks for TanStack Query operations
- Framer Motion for entrance animations and scroll reveals

### Styling Patterns
- CSS variables for shadcn/ui compatibility
- Custom animations defined in Tailwind config
- Responsive design with mobile-first approach
- Custom utility classes for brand colors and effects

### Form Handling
- React Hook Form with Zod validation
- Server Actions for form processing
- Loading states and error handling
- Success/error message display

### Performance Optimizations
- Image optimization with Next.js Image component
- Turbopack for faster builds and development
- Route-based code splitting
- TanStack Query for intelligent caching

## Environment & Configuration

### Key Configuration Files
- `next.config.ts`: Turbopack, image optimization, security headers, redirects
- `tailwind.config.ts`: Custom design system, animations, and color palette
- `components.json`: Shadcn UI configuration with aliases
- `tsconfig.json`: TypeScript configuration with path mapping

### Development Features
- **Hot reload** with Turbopack
- **TypeScript strict mode** for better code quality  
- **ESLint** with Next.js recommended rules
- **React Query Devtools** in development mode

## Contact Information & Business Context

**School Details:**
- Address: ул. Кайрата Жумагалиева 18, 3 этаж, Almaty
- Phone: 8 706 610 57 81
- Email: info@scandic.school
- Instagram: @scandic.school
- License: KZ96LAA00035527
- Program: IB PYP for grades 0-4

**Form Types:**
- Contact form: General inquiries
- Application form: Student enrollment with parent/child details, grade selection, language preference
- Newsletter subscription: Email collection for updates
