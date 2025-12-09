# Quick Start Guide

## 🚀 Get AScript Running in 5 Minutes

### Option 1: Automated Setup (Recommended)

```bash
./setup.sh
```

This script will:
1. Create `.env.local` from template
2. Install all dependencies
3. Set up the database
4. Guide you through configuration

### Option 2: Manual Setup

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env.local
# Edit .env.local with your credentials

# 3. Set up database
npx prisma generate
npx prisma db push

# 4. Start development server
npm run dev
```

### First Login

1. Open http://localhost:3000
2. Click "Get Started" or "Sign In"
3. Use email: `jason.harris@getcovered.life`
4. Create your password
5. You're in! 🎉

### Environment Variables You Need

**Required immediately:**
- `DATABASE_URL` - Get from Supabase, Railway, or local PostgreSQL
- `NEXTAUTH_SECRET` - Generate with: `openssl rand -base64 32`

**Add before going live:**
- `MODCELLULAR_API_KEY` - Your ModCellular key
- `MODCELLULAR_API_SECRET` - Your ModCellular secret

### Database Setup Options

**Local PostgreSQL:**
```bash
# Install PostgreSQL, then:
DATABASE_URL="postgresql://user:password@localhost:5432/ascript"
```

**Supabase (Free tier available):**
1. Go to supabase.com
2. Create project
3. Get connection string from Settings → Database
4. Add to `.env.local`

**Railway (Free tier available):**
1. Go to railway.app
2. New Project → Provision PostgreSQL
3. Copy connection string
4. Add to `.env.local`

### Common Issues

**Database connection failed:**
- Check your DATABASE_URL format
- Ensure database is running
- Try: `npx prisma db push --force-reset`

**Auth not working:**
- Verify NEXTAUTH_SECRET is set
- Check NEXTAUTH_URL matches your domain
- Clear browser cookies

**Build errors:**
- Delete `node_modules` and `.next`
- Run `npm install` again
- Try `npm run build`

### Next Steps

1. ✅ Create your first tenant organization
2. ✅ Add a test referral
3. ✅ Configure SMS notifications
4. ✅ Customize branding
5. ✅ Deploy to production

### Get Help

- Read: `DEPLOYMENT.md` for production setup
- Check: `PROJECT_STRUCTURE.md` for architecture
- Issues? Email: jason.harris@getcovered.life

---

**You're ready to build.** 🔥

Let's go change healthcare referrals forever.
