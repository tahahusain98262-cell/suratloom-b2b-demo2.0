# Antigravity Master Prompts — Suratloom Textile B2B

## How to use these prompts (important)

1. Open the extracted `textile-b2b-demo` folder in Antigravity.
2. Run **one prompt at a time**, in order. Review its report and changed files before starting the next prompt.
3. Do not ask the agent to “keep improving forever”, “repeat until perfect”, or start autonomous loops.
4. Every prompt requires a finite scope, a stop condition, and a report. If a prompt finds a blocker, it must list the blocker and stop instead of guessing or looping.
5. Keep this demo branch separate from any live production application.

---

## Prompt 1 — Audit the starter and make the demo stable

You are a senior full-stack engineer. Work only inside the currently opened Suratloom project. First inspect the complete repository, package.json, routes, UI state, and README. This is a textile B2B product demo for a Surat mill, not a generic ecommerce store.

Goal: verify the existing public showroom, demo sign-in, buyer/broker portal, admin demo, fabric catalogue, buyer-specific watermark, tiered demo pricing, textile quantities, cart, order receipt, stock reduction, transport/markaa, and WhatsApp receipt preview.

Rules:
- Do not rewrite the app from scratch.
- Do not add unrelated features or dependencies.
- Do not make production-security claims about client-side demo authentication/localStorage.
- Run a finite audit: inspect files, run `npm install` only if needed, run `npm run build`, and fix only reproducible build/runtime issues in this scope.
- Do not start a loop or retry the same failed command more than once. If blocked, report exact error and stop.
- Do not change the intended product scope or public/private boundary.

Acceptance criteria:
1. Build completes successfully.
2. Public page does not expose the private catalogue or live rates.
3. Buyer, broker, and admin demo logins route to their intended screens.
4. Demo order can be placed; the browser demo stock decreases; receipt preview opens.
5. Report changed files, commands and actual results, remaining limitations, and one next action. Stop after the report.

## Prompt 2 — Create the secure production architecture plan (no code changes)

Act as a staff engineer and application-security architect. Inspect the repository and README. Produce `docs/PRODUCTION_ARCHITECTURE.md` only. Do not implement anything yet.

Design a realistic private textile B2B SaaS with:
- Public mill profile with capabilities and request-access/swatch forms; no public designs or rates.
- Admin-approved buyer/broker accounts and role-based access enforced server-side.
- Buyer-specific price tiers, broker commission/margin rules, and server-side price calculation.
- Private fabric/design assets with short-lived authorized delivery URLs and per-user watermarking where feasible.
- Fabric attributes: Rayon/Cotton/Viscose, shade, width/panna, taka/than/lumps/cut, meter conversion rules.
- PostgreSQL schema for organizations, users, approvals, roles, buyers/price tiers, fabrics, shades, inventory lots, transporters, orders, order lines, audit events, and settings.
- Atomic inventory reservation/decrement, idempotent order creation, cancellation/return rules, and concurrency protection.
- Packing slip/kacha bill preview, GST/HSN configuration that must be validated by the manufacturer/accountant, and server-side WhatsApp Business API sending.
- Vercel frontend deployment, backend/API deployment strategy, environment variables, logging, backups, tests, monitoring, and rollback.

Include a threat model, data-flow diagram in Mermaid, phased migration from this demo, exact acceptance criteria, and a list of decisions requiring the owner. Do not invent credentials, phone numbers, tax rates, legal claims, or API secrets. Stop after writing the document and report.

## Prompt 3 — Implement real authentication and protected server APIs

Use `docs/PRODUCTION_ARCHITECTURE.md` as the approved plan. Implement only authentication and authorization in this phase. Before coding, identify the chosen auth/database provider from project configuration. If no provider has been selected or credentials are absent, do not silently choose one and do not add fake auth: report the single blocking decision and stop.

Requirements:
- Replace the browser-only login gate with provider-backed authentication.
- Enforce session validation and role/organization checks on the server for every protected endpoint and data query.
- Add roles for mill admin, approved buyer, and broker; pending/unapproved accounts must not see the private portal.
- Public routes must never return private fabric designs, prices, stock, or customer data.
- Never place service-role keys or secrets in browser-visible variables or bundles.
- Add sign-out, useful unauthorized/forbidden states, input validation, rate limiting where supported, and audit events for approval and role changes.
- Add tests for unauthenticated, pending, buyer, broker, and admin access.

Finite execution: implement the scoped phase, run the relevant tests/build once, fix a test failure at most once if the cause is clear, then report. Do not proceed to inventory/order work in this prompt. Stop.

## Prompt 4 — Implement database-backed textile catalogue and pricing

Implement only catalogue, shade, inventory-read, and pricing reads according to `docs/PRODUCTION_ARCHITECTURE.md` and the established authentication phase.

Requirements:
- Store products, shade variants, widths/panna, unit conversion rules, buyer price tiers, broker margin rules, and stock in PostgreSQL.
- Fetch all private catalogue data through authorized server-side queries; no hard-coded real prices or private inventory in client bundles.
- Calculate prices on the server for the authenticated buyer and validate buyer organization/approval on every request.
- Use short-lived signed URLs or another approved private-asset delivery pattern for confidential design images.
- Keep watermarking as a deterrent only; never claim it prevents screenshots.
- Add migration/seed scripts with clearly fictional demo data and tests for tier leakage, unauthorized access, width/shade filtering, and unit conversion.
- Do not implement order submission or WhatsApp in this phase.

Run build and scoped tests once; do not enter retry loops. Report schema/migrations, tests, env vars and blockers. Stop.

## Prompt 5 — Implement safe order creation and inventory transactions

Implement only the order/cart/stock transaction path.

Requirements:
- Client sends product/variant IDs, requested textile units and quantities, selected transport, markaa, and an idempotency key. The server re-reads price, permissions, conversion factors, and available stock; never trust client price/total.
- Validate than/taka/lumps/cut and meter conversion rules against configured product rules. Reject invalid or ambiguous units instead of guessing.
- Create order and order lines and reserve/decrement stock in one database transaction with concurrency-safe stock checks. Prevent duplicate submissions with idempotency keys.
- Record actor, timestamp, previous/new quantities, and order events in an audit log.
- Define cancellation/release behavior. Do not allow negative stock.
- Add tests for simultaneous orders, overselling, duplicate requests, tampered price/total, unauthorized buyer, insufficient stock, and cancelled orders.
- Keep tax totals explicitly unconfigured until the mill validates the GST/HSN rules.

Run scoped tests/build once; fix one clear issue at most once. Report and stop.

## Prompt 6 — Packing slip, WhatsApp and GST/HSN configuration

Implement only server-generated receipt/packing-slip data and WhatsApp Business API delivery.

Requirements:
- Generate a printable packing slip/kacha-bill preview from the saved order record; include manufacturer/buyer details, order ID/date, fabric code, shade, width, unit/quantity/meters, transport, markaa, and configured HSN/tax fields.
- Clearly distinguish a kacha bill/packing slip from a valid tax invoice. Do not invent tax rates or assume a universal HSN code. Require manufacturer/accountant-approved configuration before showing calculated GST or claiming invoice compliance.
- Integrate WhatsApp Business Platform only through server-side environment secrets and approved templates/policies. No secrets in VITE_ or other client-visible variables.
- Add delivery status, failure handling, safe retry/idempotency, and audit logs. If API credentials are absent, leave a tested mock adapter and label it clearly; do not pretend a message was sent.
- Test successful mock delivery, missing configuration, provider failure, duplicate send, and unauthorized access.

Run scoped tests/build once. Report which paths are real vs mocked. Stop.

## Prompt 7 — Production security review and Vercel deployment readiness

Perform a finite security and deployment audit of the implemented code. Do not add features or refactor unrelated UI.

Check: exposed secrets, public bundle leakage, auth bypass, role/organization isolation, API input validation, authorization on object IDs, CSRF/session settings as applicable, rate limits, CORS, headers, private image URLs, SQL access policies, race conditions/overselling, idempotency, PII in logs, error leakage, dependency vulnerabilities, backups, monitoring, and recovery steps.

Run available lint/build/tests and dependency audit commands only if defined/supported. Do not claim tests or scans passed unless you ran them. Do not attempt destructive production actions. Do not run penetration tests against any external target; limit checks to this repository and local test environment.

Deliver `docs/SECURITY_AND_DEPLOYMENT_CHECKLIST.md` with severity-ranked findings, evidence/file references, fixes made, unresolved blockers, exact Vercel settings, environment variable names (never values), migration/seed instructions, rollback plan, and go-live checklist. No loops: at most one fix-and-retest cycle for a clearly understood issue. Stop and report.
