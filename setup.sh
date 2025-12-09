#!/bin/bash

echo "🔥 AScript.Healthcare - Setup Script"
echo "======================================"
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "⚠️  .env.local not found. Creating from example..."
    cp .env.example .env.local
    echo "✅ Created .env.local - Please update with your API keys!"
    echo ""
    echo "Required variables to update:"
    echo "  - DATABASE_URL"
    echo "  - NEXTAUTH_SECRET (run: openssl rand -base64 32)"
    echo "  - MODCELLULAR_API_KEY"
    echo "  - MODCELLULAR_API_SECRET"
    echo ""
    read -p "Press enter when you've updated .env.local..."
fi

echo "📦 Installing dependencies..."
npm install

echo ""
echo "🗄️  Setting up database..."
npx prisma generate
npx prisma db push

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Run: npm run dev"
echo "  2. Open: http://localhost:3000"
echo "  3. Login with: jason.harris@getcovered.life"
echo ""
echo "🚀 Let's build something legendary!"
