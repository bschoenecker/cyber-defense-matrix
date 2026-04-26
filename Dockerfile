FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
# Skip puppeteer's bundled Chromium download — we use the system one
ENV PUPPETEER_SKIP_DOWNLOAD=true
RUN npm ci

FROM deps AS builder
COPY . .
RUN npx prisma generate
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# System Chromium + fonts for Puppeteer PDF generation
# openssl is included for database encryption/decryption at rest
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    font-noto \
    openssl

ENV PUPPETEER_SKIP_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/docker-entrypoint.sh ./docker-entrypoint.sh

# Strip Windows CRLF line endings in case the file was checked out on Windows
# (Git autocrlf=true converts LF to CRLF, which breaks sh inside Linux containers)
RUN sed -i 's/\r$//' ./docker-entrypoint.sh && \
    chmod +x ./docker-entrypoint.sh && \
    mkdir -p /app/data && \
    chown nextjs:nodejs /app/data

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["sh", "./docker-entrypoint.sh"]
