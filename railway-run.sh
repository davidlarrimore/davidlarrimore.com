#!/bin/sh
# railway-run.sh - A script to handle Prisma initialization in Railway

# Print environment info (without sensitive values)
echo "======= Environment Information ======="
echo "NODE_ENV: $NODE_ENV"
echo "DATABASE_URL: ${DATABASE_URL:0:20}...[redacted]"
echo "======================================="

# Ensure Prisma CLI is available
if ! command -v prisma &> /dev/null; then
    echo "Prisma CLI not found, installing..."
    npm install -g prisma@6.4.1
fi

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate --schema='/prisma/schema.prisma'

# Run migrations
echo "Running database migrations..."
npx prisma migrate deploy

# Start the application
echo "Starting the application..."
node server.js