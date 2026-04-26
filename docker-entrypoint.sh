#!/bin/sh
# Handles database encryption/decryption around the app lifecycle.
# The decrypted database only ever exists inside the container (/tmp).
# The encrypted file (cdm.db.enc) is the only thing written to the host volume.

DB_ENC="/app/data/cdm.db.enc"
DB_RUN="/tmp/cdm_runtime.db"

# ── Validate required key ──────────────────────────────────────────────────────
if [ -z "$DB_ENCRYPTION_KEY" ]; then
  echo ""
  echo "╔══════════════════════════════════════════════════════════╗"
  echo "║  ERROR: DB_ENCRYPTION_KEY is not set.                   ║"
  echo "║  Add it to docker-compose.yml under 'environment'.      ║"
  echo "║  Generate one with: openssl rand -base64 32             ║"
  echo "╚══════════════════════════════════════════════════════════╝"
  echo ""
  exit 1
fi

# ── Encryption helpers ─────────────────────────────────────────────────────────

encrypt_db() {
  echo "[CDM] Encrypting database before shutdown..."
  local failed=0
  for ext in "" "-wal" "-shm"; do
    src="${DB_RUN}${ext}"
    dst="${DB_ENC}${ext}"
    if [ -f "$src" ]; then
      openssl enc -aes-256-cbc -pbkdf2 -iter 100000 \
        -in "$src" -out "${dst}.tmp" -pass env:DB_ENCRYPTION_KEY 2>/dev/null \
        && mv "${dst}.tmp" "$dst" \
        && rm -f "$src" \
        || { echo "[CDM] WARNING: Failed to encrypt ${src}"; failed=1; }
    fi
  done
  if [ "$failed" = "0" ]; then
    echo "[CDM] Database encrypted successfully."
  else
    echo "[CDM] WARNING: Encryption had errors. Check your DB_ENCRYPTION_KEY."
  fi
}

decrypt_db() {
  echo "[CDM] Decrypting database..."
  for ext in "" "-wal" "-shm"; do
    src="${DB_ENC}${ext}"
    dst="${DB_RUN}${ext}"
    if [ -f "$src" ]; then
      openssl enc -d -aes-256-cbc -pbkdf2 -iter 100000 \
        -in "$src" -out "$dst" -pass env:DB_ENCRYPTION_KEY 2>/dev/null \
        || { echo "[CDM] ERROR: Failed to decrypt database. Is DB_ENCRYPTION_KEY correct?"; exit 1; }
    fi
  done
  echo "[CDM] Database decrypted."
}

# ── Signal handler ─────────────────────────────────────────────────────────────
# Catches SIGTERM (sent by `docker compose down`) and SIGINT (Ctrl+C).
# Sends TERM to the app, waits for clean exit, then encrypts before exiting.

APP_PID=""

shutdown() {
  echo "[CDM] Shutdown signal received."
  if [ -n "$APP_PID" ]; then
    kill -TERM "$APP_PID" 2>/dev/null || true
    wait "$APP_PID" 2>/dev/null || true
  fi
  encrypt_db
  exit 0
}

trap shutdown TERM INT

# ── Set runtime DATABASE_URL ───────────────────────────────────────────────────
# Overrides any DATABASE_URL from the environment — the app always uses the
# in-container temp path, never the host volume path directly.

export DATABASE_URL="file:${DB_RUN}"

# ── Decrypt existing database ──────────────────────────────────────────────────

if [ -f "${DB_ENC}" ]; then
  decrypt_db
else
  echo "[CDM] No encrypted database found — starting fresh."
fi

# ── Migrations ─────────────────────────────────────────────────────────────────

echo "[CDM] Running migrations..."
node node_modules/prisma/build/index.js migrate deploy --schema=./prisma/schema.prisma

# ── Seed ───────────────────────────────────────────────────────────────────────

node prisma/seed.js

# ── Start application ──────────────────────────────────────────────────────────

echo "[CDM] Starting application..."
node server.js &
APP_PID=$!

# Next.js prints localhost:3000 (the internal container port).
# Wait briefly then print the actual host URL to avoid confusion.
(sleep 2 && echo "" && \
  echo "[CDM] ✓ Ready — open your browser and visit: http://localhost:3001" && \
  echo "[CDM]   (ignore the port 3000 shown above — that is the internal container port)" && \
  echo "") &

# Wait for the app process — this unblocks when node exits or a signal fires
wait "$APP_PID" || true

# Normal exit path (app exited on its own rather than via signal)
encrypt_db
