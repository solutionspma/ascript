# Netlify Deployment - Step by Step

## 🚀 Quick Deploy to Netlify

### Step 1: Push to GitHub

```bash
# If you haven't created a GitHub repo yet:
# 1. Go to github.com and create a new repository called "ascript-healthcare"
# 2. Then run:

git remote add origin https://github.com/YOUR_USERNAME/ascript-healthcare.git
git branch -M main
git push -u origin main
```

### Step 2: Connect to Netlify

1. Go to [https://app.netlify.com](https://app.netlify.com)
2. Sign up or log in
3. Click **"Add new site"** → **"Import an existing project"**
4. Choose **GitHub**
5. Authorize Netlify to access your repositories
6. Select the `ascript-healthcare` repository

### Step 3: Configure Build Settings

Netlify should auto-detect Next.js. Verify these settings:

- **Base directory**: (leave empty)
- **Build command**: `npm run build`
- **Publish directory**: `.next`
- **Functions directory**: (leave empty)

Click **"Deploy site"**

### Step 4: Add Environment Variables

⚠️ **CRITICAL**: Add these BEFORE your first deploy works properly.

In Netlify Dashboard:
1. Go to **Site settings** → **Environment variables**
2. Click **"Add a variable"** and add each:

```bash
# Required
DATABASE_URL=your_supabase_or_railway_postgresql_url
NEXTAUTH_URL=https://your-site-name.netlify.app
NEXTAUTH_SECRET=run_this_command_to_generate: openssl rand -base64 32

# Genesis Account (already configured)
GENESIS_EMAIL=jason.harris@getcovered.life
NEXT_PUBLIC_GENESIS_EMAIL=jason.harris@getcovered.life

# ModCellular SMS (add when ready)
MODCELLULAR_API_KEY=your_key_here
MODCELLULAR_API_SECRET=your_secret_here

# Stripe (optional, add when ready)
STRIPE_SECRET_KEY=sk_live_or_test_key
STRIPE_PUBLISHABLE_KEY=pk_live_or_test_key
STRIPE_WEBHOOK_SECRET=whsec_key

# Supabase (if using)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### Step 5: Set Up Database

#### Option A: Supabase (Recommended - Free Tier)

1. Go to [https://supabase.com](https://supabase.com)
2. Create new project
3. Wait for database to initialize (~2 minutes)
4. Go to **Settings** → **Database** → **Connection string**
5. Copy the **URI** format
6. Add to Netlify as `DATABASE_URL`

**Run Migrations:**
```bash
# In your local terminal:
npx prisma generate
npx prisma db push
```

#### Option B: Railway (Also Free Tier)

1. Go to [https://railway.app](https://railway.app)
2. New Project → Provision PostgreSQL
3. Click on PostgreSQL → Connect → Copy connection string
4. Add to Netlify as `DATABASE_URL`

### Step 6: Update NEXTAUTH_URL

After Netlify assigns your URL:

1. Copy your site URL (e.g., `https://ascript-healthcare.netlify.app`)
2. Update `NEXTAUTH_URL` in environment variables
3. Trigger a new deploy: **Deploys** → **Trigger deploy** → **Clear cache and deploy**

### Step 7: Custom Domain (Optional)

1. Purchase `ascript.healthcare` domain
2. In Netlify: **Domain settings** → **Add custom domain**
3. Follow DNS instructions:
   - Add CNAME: `www` → `your-site.netlify.app`
   - Add A record: `@` → `75.2.60.5`
4. Wait for SSL certificate (automatic, ~1 minute)

### Step 8: Test Your Deployment

1. Visit your Netlify URL
2. Click **"Sign In"**
3. Use: `jason.harris@getcovered.life`
4. Create your password
5. ✅ You're live!

---

## 🔧 Troubleshooting

### Build Failed

**Check the build log** in Netlify dashboard:

Common fixes:
```bash
# Missing dependencies
npm install

# Clear cache
netlify deploy --build

# Check Node version (should be 18+)
# Add to netlify.toml:
# [build.environment]
# NODE_VERSION = "18"
```

### "Internal Server Error" on Login

- Verify `DATABASE_URL` is correct
- Check `NEXTAUTH_SECRET` is set
- Ensure `NEXTAUTH_URL` matches your domain

### Database Connection Failed

```bash
# Test locally first:
npx prisma studio

# If that works but Netlify doesn't:
# - Check database accepts external connections
# - Verify SSL mode in connection string
# - Add ?sslmode=require to DATABASE_URL
```

### CSS/Styles Not Loading

```bash
# Clear Netlify cache and redeploy:
# Deploys → Trigger deploy → Clear cache and deploy
```

---

## 📊 Post-Deployment Checklist

- [ ] Site deploys successfully
- [ ] Can access homepage
- [ ] Can create genesis account
- [ ] Can log in
- [ ] Dashboard loads
- [ ] Database connected
- [ ] Environment variables set
- [ ] HTTPS enabled
- [ ] Custom domain configured (if applicable)

---

## 🔄 Continuous Deployment

Now every time you push to `main` branch:
```bash
git add .
git commit -m "Update feature"
git push
```

Netlify will automatically:
1. Pull latest code
2. Run build
3. Deploy to production
4. Update your live site

---

## 🆘 Need Help?

**Build logs**: Netlify Dashboard → Deploys → Click latest deploy → View logs

**Contact**: jason.harris@getcovered.life

---

**You're now LIVE on the internet.** 🔥

Go change healthcare. 💎
