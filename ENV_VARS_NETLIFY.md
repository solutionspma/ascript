# Environment Variables for Netlify

Copy these into Netlify Dashboard → Site Settings → Environment Variables

## Required for Basic Functionality

```
DATABASE_URL_POOLER=postgresql://user:password@pooler-host:6543/postgres?pgbouncer=true&connection_limit=1&sslmode=require
DATABASE_URL=postgresql://user:password@host:5432/postgres?sslmode=require # local/dev + prisma migrate
NEXTAUTH_URL=https://your-site.netlify.app
NEXTAUTH_SECRET=generate_with_openssl_rand_base64_32
GENESIS_EMAIL=jason.harris@getcovered.life
NEXT_PUBLIC_GENESIS_EMAIL=jason.harris@getcovered.life
```

## Generate NEXTAUTH_SECRET

Run this command:
```bash
openssl rand -base64 32
```

## Optional (Add When Ready)

```
# ModCellular SMS
MODCELLULAR_API_KEY=
MODCELLULAR_API_SECRET=

# Stripe Payments
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Email
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
```

## Database Setup

### Supabase (Free)
1. Go to https://supabase.com
2. Create project
3. Copy **Connection pooling** string from Settings → Database → Connection pooling (transaction mode)
4. Format for Netlify functions: `postgresql://postgres:[PASSWORD]@[POOLER_HOST]:6543/postgres?pgbouncer=true&connection_limit=1&sslmode=require`
5. Copy **Direct** connection string for local dev + migrations: `postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres?sslmode=require`

### Railway (Free)
1. Go to https://railway.app
2. New Project → Provision PostgreSQL
3. Copy connection string
4. Format: `postgresql://postgres:[PASSWORD]@[HOST]:5432/railway`

## After Adding Variables

1. Trigger new deploy: Deploys → Trigger deploy → Clear cache and deploy
2. Wait for build to complete
3. Test site at your Netlify URL
