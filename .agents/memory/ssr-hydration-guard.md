---
name: SSR Hydration Guard
description: Components accessing browser APIs (Notification, localStorage, window) must gate their render behind a mounted flag set in useEffect, or SSR hydration will fail.
---

## Rule
Any component that reads `Notification`, `localStorage`, `window`, or other browser-only APIs must:
1. Add `const [mounted, setMounted] = useState(false)` 
2. Add `useEffect(() => setMounted(true), [])` 
3. Add `if (!mounted) return null` before any browser API access

**Why:** TanStack Start renders on the server (SSR). Browser APIs don't exist during SSR — accessing them causes hydration mismatches and React errors.

**How to apply:** Every component that touches browser-only APIs. Check for `typeof window !== "undefined"` guards too — they work at runtime but don't prevent the hydration mismatch.
