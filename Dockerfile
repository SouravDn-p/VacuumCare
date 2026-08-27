FROM node:22-alpine AS base

FROM base AS deps

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci


FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js inlines NEXT_PUBLIC_* at build time. Values come from .env.local
# in the build context, or from non-empty Docker build-args (Compose).
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_BASE_URL
RUN set -e; \
  if [ -n "$NEXT_PUBLIC_API_URL" ]; then \
    printf 'NEXT_PUBLIC_API_URL=%s\n' "$NEXT_PUBLIC_API_URL" >> .env.production.local; \
  fi; \
  if [ -n "$NEXT_PUBLIC_BASE_URL" ]; then \
    printf 'NEXT_PUBLIC_BASE_URL=%s\n' "$NEXT_PUBLIC_BASE_URL" >> .env.production.local; \
  fi

ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build


FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
