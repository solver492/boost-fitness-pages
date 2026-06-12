---
name: PWA Push Notifications Setup
description: VAPID keys, subscription endpoint, and notification dispatch for this project.
---

## Rule
VAPID keys are stored as env vars: `VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`, `VAPID_SUBJECT`.
The public key is safe to hardcode in the client component for the pushManager subscription.

**Why:** VAPID private key must stay server-side. Public key needs to be available to the browser.

**How to apply:**
- `/api/subscribe` — stores subscriptions server-side
- `/api/notify` — sends to all stored subscriptions, requires `NOTIFY_SECRET` header
- In-memory subscription store resets on server restart — production should use the DB
