# CRM Dance Studio

CRM Dance Studio is a multi-tenant management platform built with the Next.js
App Router. It uses NextAuth.js for authentication and Drizzle ORM to persist
data in PostgreSQL.

## Tech Stack

- Next.js 15 and React 19
- TypeScript
- Tailwind CSS
- Drizzle ORM with PostgreSQL
- NextAuth.js with Google and Resend providers

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL database
- pnpm (or your preferred package manager)

### Installation

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Create a `.env.local` file with the following variables:

   ```bash
   DATABASE_URL=postgres://user:password@host:port/db
   AUTH_GOOGLE_ID=your-google-client-id
   AUTH_GOOGLE_SECRET=your-google-client-secret
   RESEND_API_KEY=your-resend-api-key
   EMAIL_FROM=you@example.com
   AUTH_SECRET=your-nextauth-secret
   ```

3. Generate and apply database migrations:

   ```bash
   npx drizzle-kit generate
   npx drizzle-kit push
   ```

4. Start the development server:

   ```bash
   pnpm dev
   ```

   Visit <http://localhost:3000> to view the application.

## Scripts

- `pnpm dev` – run the development server with Turbopack
- `pnpm build` – create a production build
- `pnpm lint` – run ESLint

## Project Structure

- `src/app` – application routes and pages
- `src/db` – Drizzle schema and database client
- `src/auth.ts` & `auth.config.ts` – NextAuth configuration

