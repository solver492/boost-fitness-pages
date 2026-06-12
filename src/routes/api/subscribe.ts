import { createFileRoute } from "@tanstack/react-router";
import { addSubscription, type PushSub } from "@/lib/push-store.server";

export const Route = createFileRoute("/api/subscribe")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const sub = (await request.json()) as PushSub;
          if (!sub?.endpoint) {
            return new Response("Invalid subscription", { status: 400 });
          }
          addSubscription(sub);
          return new Response(JSON.stringify({ ok: true }), {
            status: 201,
            headers: { "Content-Type": "application/json" },
          });
        } catch {
          return new Response("Server error", { status: 500 });
        }
      },
    },
  },
});
