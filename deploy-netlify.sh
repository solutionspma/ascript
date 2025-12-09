#!/bin/bash

echo "🚀 Deploying AScript.Healthcare to Netlify"
echo "==========================================="
echo ""

# Check if netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo "📦 Netlify CLI not found. Installing..."
    npm install -g netlify-cli
fi

echo "🔐 Logging into Netlify..."
netlify login

echo ""
echo "🏗️  Initializing Netlify site..."
netlify init

echo ""
echo "⚙️  Building application..."
npm run build

echo ""
echo "🚀 Deploying to Netlify..."
netlify deploy --prod

echo ""
echo "✅ Deployment complete!"
echo ""
echo "⚠️  IMPORTANT: Don't forget to set environment variables in Netlify dashboard:"
echo "  - DATABASE_URL"
echo "  - NEXTAUTH_SECRET"
echo "  - NEXTAUTH_URL (update with your Netlify URL)"
echo "  - MODCELLULAR_API_KEY"
echo "  - MODCELLULAR_API_SECRET"
echo ""
echo "📖 See NETLIFY_DEPLOY.md for detailed instructions"
