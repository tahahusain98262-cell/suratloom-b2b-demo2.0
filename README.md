# Suratloom — Private Textile B2B Demo

A Vercel-deployable **frontend demonstration** for a Surat textile manufacturer. It includes a public manufacturing showroom and a gated-looking partner portal with demo buyer, broker, and admin experiences.

## Important: demo, not production security

This ZIP is intentionally a no-backend demo so it can be launched quickly. The sign-in gate, demo inventory, order ledger, buyer approvals, and pricing are implemented in browser-side code/localStorage. Anyone who inspects the JavaScript can bypass the gate, and localStorage is not shared between users or devices. **Do not use this build for real confidential designs, real negotiated prices, actual stock, real customer information, or live orders.** Watermarks discourage casual misuse but cannot prevent screenshots.

To make it genuinely private, use the included Antigravity prompt pack in order, replacing demo-only client state with server-enforced authentication/authorization, a shared database, transactional inventory updates, protected asset delivery, and real WhatsApp Business API integration. Never put service-role keys or WhatsApp secrets in `VITE_*` client variables.

## Included demo features

- Public manufacturer showroom; no public prices or exclusive design catalogue.
- Request B2B access / sample swatch request form (visual demo only).
- Buyer, broker, and admin demo sign-in roles.
- Private catalogue UI with buyer-specific watermark and A-category/broker demo pricing.
- Fabric categories, shade cards, width, than quantities and stock display.
- Cart/order builder with transport and markaa fields.
- Demo order confirmation, local stock reduction, order history, and printable kacha-bill preview.
- WhatsApp message preview (does **not** send a message).
- Admin demo for inventory edits, order status, and buyer approval.
- Responsive layout for desktop and mobile.

## Demo credentials

All demo passwords: `LoomDemo2026!`

- Buyer: `buyer@suratloom.demo`
- Broker: `broker@suratloom.demo`
- Admin: `admin@suratloom.demo`

These are public demo credentials, not secure accounts.

## Run locally

Requires Node.js 20+ and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Deploy to Vercel

1. Unzip this folder.
2. Upload the project to a new GitHub repository.
3. In Vercel, choose **Add New → Project** and import that repository.
4. Framework preset: **Vite** (normally auto-detected).
5. Build command: `npm run build`.
6. Output directory: `dist`.
7. Click **Deploy**.

No environment variables are needed for this demo. `vercel.json` rewrites routes to the single-page app entry.

## Suggested production architecture

- Frontend: Next.js or Vite deployed to Vercel.
- Auth: Supabase Auth or another managed identity provider; admin approval and roles enforced server-side.
- Database: PostgreSQL with row-level security where appropriate.
- Orders: backend transaction locks/decrements stock atomically; never trust browser totals or prices.
- Fabric assets: private object storage or signed, short-lived URLs; don't ship confidential designs in public bundles.
- WhatsApp: server-side WhatsApp Business Platform integration with secrets stored as server environment variables.
- GST/HSN: validate by product classification and tax configuration with the manufacturer/accountant; don't treat the demo receipt as a tax invoice.
- Security: server-side validation, rate limiting, audit logs, least-privilege access, backups, monitoring and tests.

## Project files

- `src/main.jsx` — UI and demo interactions.
- `src/styles.css` — responsive design system.
- `prompts/ANTIGRAVITY_MASTER_PROMPTS.md` — sequential prompts to move from demo to secure private software without open-ended loops.
