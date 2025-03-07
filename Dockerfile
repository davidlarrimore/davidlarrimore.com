FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects anonymous telemetry data about general usage
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line to disable telemetry
# ENV NEXT_TELEMETRY_DISABLED 1

# Build the application
RUN prisma generate
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line to disable telemetry
# ENV NEXT_TELEMETRY_DISABLED 1

# Create a non-root user to run the app and own app files
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files
COPY --from=builder /app/prisma /app/prisma
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Set proper permissions
USER nextjs

# Expose the port the app will run on
EXPOSE 3000


# Start the application
CMD ["node", "server.js"]