# Construction Project Dashboard

A web application for managing construction projects, clients, budgets, expenses, invoices, and payments.

## Features

- View projects, clients, budgets, and project progress
- Track invoices, expenses, and payments
- Filter invoices by project
- Upload invoice images or PDFs for review
- Sign in with Supabase authentication
- Responsive interface for desktop and mobile

## Tech Stack

- Next.js 16 and React 19
- TypeScript
- Supabase
- Tailwind CSS

## Getting Started

### Requirements

- Node.js and npm
- A Supabase project for authentication and database features

### Install Dependencies

The application workspace is in `obras-app/`:

```bash
cd obras-app
npm install
```

### Configure Supabase

Create `obras-app/frontend/.env.local` with your Supabase project settings:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

Keep local environment files out of Git. The publishable key is used by the browser; protect your data with appropriate Supabase Row Level Security policies.

### Run the Development Server

From `obras-app/`, run:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

Run these commands from `obras-app/`:

```bash
npm run dev
npm run lint
npm run build
npm start
```

## Project Structure

```text
obras-app/
├── frontend/       # Next.js application
├── backend/        # Reserved for future server-side functionality
├── supabase/       # Database migrations
└── docs/           # Project documentation
```

See [`obras-app/docs/organizacao-repositorio.md`](obras-app/docs/organizacao-repositorio.md) for more information about the repository structure.
