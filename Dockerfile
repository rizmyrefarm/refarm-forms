# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /app
RUN apk add --no-cache openssl libc6-compat
RUN npm install -g pnpm@9
COPY package.json pnpm-lock.yaml* ./
COPY prisma ./prisma/
RUN pnpm install

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app
RUN apk add --no-cache openssl libc6-compat
RUN npm install -g pnpm@9
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN mkdir -p public
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN npx prisma generate
RUN pnpm build

# Stage 3: Runner
FROM node:20-alpine AS runner
WORKDIR /app

# Install openssl and libc compatibility libraries for Prisma engine
RUN apk add --no-cache openssl libc6-compat

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV UPLOAD_DIR=/app/uploads

# Create uploads and public directory with proper permissions
RUN mkdir -p /app/uploads /app/public && chown -R node:node /app

# Copy built artifacts
COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
COPY --from=builder --chown=node:node /app/prisma ./prisma
COPY --from=builder --chown=node:node /app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/package.json ./package.json

# Copy entrypoint startup script
COPY --chown=node:node <<'ENTRYPOINT' /app/start.sh
#!/bin/sh
set -e
echo "Checking database connectivity and running migrations..."
npx prisma migrate deploy || echo "Warning: Migration check skipped or database initializing."
echo "Starting ReFarm Forms server on port $PORT..."
exec node server.js
ENTRYPOINT

RUN chmod +x /app/start.sh

USER node
EXPOSE 3000

CMD ["/app/start.sh"]
