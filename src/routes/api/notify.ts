import { createFileRoute } from "@tanstack/react-router";
import { sendToAll } from "@/lib/push-store.server";

export const Route = createFileRoute("/api/notify")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secret = process.env.NOTIFY_SECRET ?? "";
        const auth = request.headers.get("X-Notify-Secret") ?? "";
        if (!secret || auth !== secret) {
          return new Response("Unauthorized", { status: 401 });
        }
        const body = (await request.json()) as {
          title?: string;
          body?: string;
          url?: string;
        };
        const result = await sendToAll({
          title: body.title ?? "Go Fitness 🏋️",
          body: body.body ?? "Nouvelle promotion disponible !",
          url: body.url ?? "/boutique",
        });
        return new Response(JSON.stringify(result), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});
