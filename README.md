# MERN E-commerce Monorepo

## Workspaces
- `server` - Express + MongoDB + Redis API
- `client` - Vite + React storefront/admin UI

## Setup
1. Copy envs: `cp .env.example .env`
2. Install deps: `npm install`
3. Run dev: `npm run dev`

## Scripts
- `npm run dev:server`
- `npm run dev:client`
- `npm run build`
- `npm run test`

## Backend highlights
- JWT access + refresh token rotation (cookie refresh)
- Password reset token issue/consume flow
- Product catalog filtering/search + cursor pagination
- Redis query cache + invalidation on product mutations
- Checkout with idempotency key, stock reservation soft-lock, transactional order create
- Payment webhook reconciliation
- Admin command-center, traffic summary, maintenance mode, API keys, webhooks + retry queue skeleton
- Health endpoints `/api/health/live` and `/api/health/ready`
- Structured logging (pino), request IDs, helmet/cors/compression/rate limiting
- Jobs: abandoned cart marker, low-stock scanner

## Tests
- Jest + Supertest scaffold for critical health/auth/order paths:
  - `server/tests/health.auth.order.test.js`
