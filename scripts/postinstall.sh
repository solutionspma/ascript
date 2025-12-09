#!/bin/bash
# Prisma generate with fallback for missing DATABASE_URL

if [ -z "$DATABASE_URL" ]; then
  echo "⚠️  DATABASE_URL not set, using placeholder for prisma generate"
  export DATABASE_URL="postgresql://placeholder:placeholder@localhost:5432/placeholder"
fi

npx prisma generate
