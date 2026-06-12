import webpush from "web-push";

let initialized = false;

export function initWebPush() {
  if (initialized) return;
  initialized = true;
  webpush.setVapidDetails(
    process.env.VAPID_EMAIL ?? "mailto:contact@gofitness.ma",
    process.env.VAPID_PUBLIC_KEY ?? "",
    process.env.VAPID_PRIVATE_KEY ?? "",
  );
}

export type PushSub = webpush.PushSubscription;

const subs: PushSub[] = [];

export function addSubscription(sub: PushSub) {
  const already = subs.some((s) => s.endpoint === sub.endpoint);
  if (!already) subs.push(sub);
}

export async function sendToAll(payload: { title: string; body: string; url?: string }) {
  initWebPush();
  const results = await Promise.allSettled(
    subs.map((sub) =>
      webpush.sendNotification(sub, JSON.stringify(payload)),
    ),
  );
  const failed = results
    .map((r, i) => (r.status === "rejected" ? i : -1))
    .filter((i) => i >= 0);
  failed.reverse().forEach((i) => subs.splice(i, 1));
  return { sent: subs.length, failed: failed.length };
}
