# AScript.Healthcare Deployment Guide

## Netlify Deployment

### Prerequisites
1. GitHub account
2. Netlify account (free tier works)
3. PostgreSQL database (Supabase, Railway, or Neon recommended)

### Step 1: Push to GitHub

```bash
# Create a new repository on GitHub, then:
git remote add origin https://github.com/yourusername/ascript-healthcare.git
git branch -M main
git push -u origin main
```

### Step 2: Connect to Netlify

1. Go to [Netlify](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub account and select the `ascript-healthcare` repository
4. Build settings should auto-detect:
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Framework: Next.js

### Step 3: Configure Environment Variables

In Netlify dashboard → Site settings → Environment variables, add:

```
DATABASE_URL=your_postgresql_connection_string
NEXTAUTH_URL=https://your-site.netlify.app
NEXTAUTH_SECRET=generate_a_random_secret_here
GENESIS_EMAIL=jason.harris@getcovered.life
NEXT_PUBLIC_GENESIS_EMAIL=jason.harris@getcovered.life
MODCELLULAR_API_KEY=your_api_key
MODCELLULAR_API_SECRET=your_api_secret
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### Step 4: Set Up Database

#### Option A: Supabase (Recommended)

1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Go to Settings → Database → Connection string
4. Copy the connection string and add to Netlify env vars
5. Run migrations:

```bash
# Install Supabase CLI
npm install -g supabase

# Link to your project
supabase link --project-ref your-project-ref

# Push schema
npx prisma db push
```

#### Option B: Railway

1. Go to [railway.app](https://railway.app)
2. New Project → Provision PostgreSQL
3. Copy connection string
4. Add to Netlify environment variables

### Step 5: Deploy

1. Click "Deploy site" in Netlify
2. Wait for build to complete
3. Visit your site URL
4. Sign in with: `jason.harris@getcovered.life` to create genesis account

### Step 6: Custom Domain (Optional)

1. In Netlify: Domain settings → Add custom domain
2. Point your DNS to Netlify:
   - Add CNAME record: `www` → `your-site.netlify.app`
   - Add A record: `@` → `75.2.60.5`

### Step 7: Enable HTTPS

Netlify automatically provisions SSL certificates for custom domains.

## Post-Deployment Checklist

- [ ] Genesis account created
- [ ] Database connected and schema migrated
- [ ] SMS notifications working (test with ModCellular)
- [ ] Custom domain configured
- [ ] HTTPS enabled
- [ ] Environment variables secured
- [ ] Test referral flow end-to-end

## Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Verify environment variables are set
- Check build logs in Netlify dashboard

### Database Connection Issues
- Verify DATABASE_URL format
- Check database is accessible from external IPs
- Ensure SSL mode is configured if required

### Authentication Issues
- Verify NEXTAUTH_URL matches your domain
- Check NEXTAUTH_SECRET is set
- Clear browser cookies and try again

## Support

For issues, contact: jason.harris@getcovered.life

---

**ASCRIPT** is designed, built, and powered by Pitch Modular Spaces and Pitch Market Strategies & Public Relations
