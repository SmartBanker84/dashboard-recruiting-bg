# Dashboard Recruiting BG

A modern recruitment dashboard for Banca Generali Private Distretto Magnani designed to streamline the recruitment process for financial consultants.

## Features

- Multi-role authentication (Recruiting Manager, Executive Manager)
- Candidate management with CRUD operations
- CV file upload and management
- Analytics dashboard for executives
- CSV data export

## Tech Stack

- Frontend: Next.js 14 with TypeScript
- Styling: Tailwind CSS with shadcn/ui components
- Backend: Supabase (PostgreSQL, Auth, Storage)
- Hosting: Vercel

## Setup Instructions

### Prerequisites

- Node.js 18.x or later
- Supabase account with a project created

### Local Development

1. Clone this repository:
```bash
git clone https://github.com/SmartBanker84/dashboard-recruiting-bg.git
cd dashboard-recruiting-bg
```

2. Install dependencies:
```bash
npm install
```

3. Copy `.env.local.example` to `.env.local` and update with your Supabase credentials:
```bash
cp .env.local.example .env.local
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Database Setup

The app requires two tables in Supabase:

1. `users` table:
   - `id` (uuid, primary key)
   - `email` (text, not null)
   - `role` (text, not null): 'recruiting' or 'manager'

2. `candidates` table:
   - `id` (uuid, primary key)
   - `name` (text, not null)
   - `email` (text, not null)
   - `note` (text)
   - `file_url` (text)
   - `created_by` (uuid, not null)
   - `created_at` (timestamp with time zone, default: now())

3. Setup Row Level Security (RLS) policies:
   - Allow 'recruiting' role to perform all operations
   - Allow 'manager' role to only SELECT

### Deployment

The app is configured for seamless deployment on Vercel:

```bash
npm run build
vercel --prod
```

## License

Copyright (c) 2023 Banca Generali Private. All rights reserved.
