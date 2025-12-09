# AScript.Healthcare - Project Structure

```
ascript.healthcare/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── auth/                 # NextAuth endpoints
│   │   │   └── [...nextauth]/
│   │   │       └── route.ts      # Auth configuration
│   │   ├── check-account/
│   │   │   └── route.ts          # Check if account exists
│   │   ├── referrals/
│   │   │   └── route.ts          # Referral CRUD operations
│   │   └── setup/
│   │       └── route.ts          # Account/tenant creation
│   ├── dashboard/                # Protected dashboard area
│   │   ├── layout.tsx            # Dashboard layout with sidebar
│   │   └── page.tsx              # Main dashboard view
│   ├── login/
│   │   └── page.tsx              # Login page
│   ├── setup/
│   │   └── page.tsx              # Account setup page
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Landing page
├── components/                   # Reusable components
│   └── Sidebar.tsx               # Collapsible sidebar navigation
├── lib/                          # Utilities and configurations
│   ├── auth.ts                   # Auth helper functions
│   ├── modcellular.ts            # ModCellular SMS client
│   └── prisma.ts                 # Prisma client singleton
├── prisma/
│   └── schema.prisma             # Database schema (multi-tenant)
├── types/
│   └── next-auth.d.ts            # TypeScript definitions
├── .env.local                    # Environment variables (git-ignored)
├── .env.example                  # Environment template
├── .gitignore                    # Git ignore rules
├── netlify.toml                  # Netlify configuration
├── next.config.js                # Next.js configuration
├── package.json                  # Dependencies and scripts
├── postcss.config.js             # PostCSS configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
├── setup.sh                      # Quick setup script
├── DEPLOYMENT.md                 # Deployment guide
└── README.md                     # Project documentation
```

## Key Features

### 🔐 Multi-Tenant Authentication
- Genesis account: `jason.harris@getcovered.life` (hardcoded master admin)
- Regular accounts belong to tenants (organizations)
- JWT-based session management via NextAuth

### 👥 Referral Management
- Create, track, and manage patient referrals
- Automatic status tracking (pending → contacted → scheduled → completed)
- SMS notifications via ModCellular

### 💰 Bonus System
- Track referral bonuses
- Payout management
- Transparent reward tracking

### 📱 Communication
- ModCellular SMS integration
- Welcome messages
- Referral notifications
- Bonus alerts

### 🎨 UI/UX
- Responsive design (mobile-first)
- Collapsible sidebar navigation
- Smooth animations with Framer Motion
- Custom scrollbars (thin, non-intrusive)
- Full viewport layouts (no white scrollbars)

## Database Schema

### Tables
1. **Account** - User accounts
2. **Tenant** - Organizations/practices
3. **Referral** - Patient referrals
4. **Bonus** - Payout tracking

### Multi-Tenancy
- Each tenant has isolated data
- Genesis account can access all tenants
- Tenant-specific branding support

## API Endpoints

### Authentication
- `POST /api/auth/signin` - Login
- `POST /api/auth/signout` - Logout
- `GET /api/auth/session` - Get session

### Setup
- `POST /api/setup` - Create account/tenant
- `POST /api/check-account` - Check if account exists

### Referrals
- `GET /api/referrals` - List referrals
- `POST /api/referrals` - Create referral

## Environment Variables

Required:
- `DATABASE_URL` - PostgreSQL connection
- `NEXTAUTH_SECRET` - Auth secret
- `GENESIS_EMAIL` - Master admin email
- `MODCELLULAR_API_KEY` - SMS API key
- `MODCELLULAR_API_SECRET` - SMS API secret

Optional:
- `STRIPE_SECRET_KEY` - Payment processing
- `SMTP_*` - Email configuration

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Database:** PostgreSQL + Prisma ORM
- **Auth:** NextAuth.js
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **SMS:** ModCellular
- **Deployment:** Netlify

## Development Workflow

1. `npm install` - Install dependencies
2. Configure `.env.local` with API keys
3. `npm run db:push` - Set up database
4. `npm run dev` - Start dev server
5. Visit `http://localhost:3000`

## Production Deployment

1. Push to GitHub
2. Connect to Netlify
3. Set environment variables
4. Deploy automatically on push

## Security Features

- Password hashing with bcrypt
- JWT session tokens
- HTTPS enforced in production
- Environment variable protection
- SQL injection prevention via Prisma

## Customization Points

- **Branding:** Update colors in `tailwind.config.ts`
- **Footer:** Modify in `app/page.tsx`
- **Logo:** Replace placeholder in components
- **Email templates:** Create in `lib/email.ts`
- **SMS templates:** Update in `lib/modcellular.ts`

---

Built with 🔥 by Pitch Modular Spaces and Pitch Market Strategies & Public Relations
