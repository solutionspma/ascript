# AScript.Healthcare

A multi-tenant healthcare referral platform built with Next.js 14, TypeScript, and Prisma.

## Features

- 🔐 Multi-tenant authentication system
- 👥 Referral management and tracking
- 💰 Bonus/payout tracking
- 📱 SMS notifications via ModCellular
- 📊 Analytics dashboard
- 🎨 Beautiful, responsive UI with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- ModCellular API credentials

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your credentials

# Set up the database
npx prisma generate
npx prisma db push

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Environment Variables

Required environment variables:

- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - Random secret for NextAuth
- `NEXTAUTH_URL` - Application URL
- `GENESIS_EMAIL` - Genesis admin email (jason.harris@getcovered.life)
- `MODCELLULAR_API_KEY` - ModCellular API key
- `MODCELLULAR_API_SECRET` - ModCellular API secret

## Deployment

This application is configured for deployment on Netlify:

```bash
# Build for production
npm run build

# Deploy to Netlify
# Connect your repository in Netlify dashboard
```

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** NextAuth.js
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Deployment:** Netlify

## License

Proprietary - All rights reserved

---

**ASCRIPT** is designed, built, and powered by [Pitch Modular Spaces](https://pitchmarketing.agency) and [Pitch Market Strategies & Public Relations](https://pitchmarketing.agency)
