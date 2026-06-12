import { useEffect, useState } from "react";
import { Download, Bell, BellOff, X } from "lucide-react";
import { useI18n } from "@/i18n";

const VAPID_PUBLIC_KEY =
  "BI7aUu2gPF5RwAE_J0bF9Neqq08aNMAYmjCTyNviFqQJr40OINLlFmBo-EBx5IRe2Y0PkYms4bwtKaZz6Vq5Ch8";

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(base64);
  return Uint8Array.from([...raw].map((c) => c.charCodeAt(0)));
}

export function PwaInstall() {
  const { t } = useI18n();
  const [mounted, setMounted] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<Event & { prompt(): Promise<void> } | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [notifState, setNotifState] = useState<"idle" | "subscribed" | "denied">("idle");
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setMounted(true);

    const dismissed = localStorage.getItem("pwa-banner-dismissed");
    if (dismissed) return;

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as Event & { prompt(): Promise<void> });
      setTimeout(() => setShowBanner(true), 3000);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);

    if ("Notification" in window) {
      if (Notification.permission === "granted") setNotifState("subscribed");
      else if (Notification.permission === "denied") setNotifState("denied");
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
    };
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;
    await installPrompt.prompt();
    setShowBanner(false);
    setInstallPrompt(null);
  };

  const handleNotif = async () => {
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) return;
    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        setNotifState("denied");
        return;
      }
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
      });
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sub.toJSON()),
      });
      setNotifState("subscribed");
    } catch (err) {
      console.error("[push]", err);
    }
  };

  const dismiss = () => {
    setDismissed(true);
    setShowBanner(false);
    localStorage.setItem("pwa-banner-dismissed", "1");
  };

  if (!mounted) return null;

  if (dismissed || !showBanner) {
    if (notifState === "idle" && "Notification" in window && Notification.permission === "default") {
      return (
        <div className="fixed bottom-20 left-4 z-[55] max-w-[calc(100vw-2rem)] sm:max-w-xs">
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 flex items-center gap-2 shadow-xl text-xs">
            <Bell className="h-4 w-4 text-orange-400 shrink-0" />
            <span className="text-zinc-300 flex-1">{t("pwa.notif.desc")}</span>
            <button
              onClick={handleNotif}
              className="ml-1 rounded-lg bg-orange-500 text-zinc-950 px-2 py-1 font-bold text-[11px] shrink-0"
            >
              {t("pwa.notif.subscribe")}
            </button>
            <button onClick={() => setDismissed(true)} className="text-zinc-500 hover:text-white">
              <X className="h-3 w-3" />
            </button>
          </div>
        </div>
      );
    }
    return null;
  }

  return (
    <div className="fixed bottom-20 left-2 right-2 z-[55] sm:left-4 sm:right-auto sm:max-w-sm">
      <div className="bg-zinc-900 border border-orange-500/30 rounded-2xl p-4 shadow-2xl shadow-orange-500/10">
        <div className="flex items-start gap-3">
          <div className="grid place-items-center h-10 w-10 rounded-xl bg-orange-500/15 text-orange-400 shrink-0">
            <Download className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-white font-bold text-sm">{t("pwa.install.title")}</p>
            <p className="text-zinc-400 text-xs mt-0.5">{t("pwa.install.desc")}</p>
          </div>
          <button onClick={dismiss} className="text-zinc-500 hover:text-white p-1 -mt-1 -mr-1">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-3 flex gap-2">
          <button
            onClick={handleInstall}
            className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-b from-orange-400 to-orange-600 text-zinc-950 font-black text-sm py-2.5"
          >
            <Download className="h-4 w-4" /> {t("pwa.install.btn")}
          </button>
          {notifState === "idle" && (
            <button
              onClick={handleNotif}
              className="inline-flex items-center justify-center gap-1 rounded-xl border border-zinc-700 bg-zinc-800 text-white text-xs px-3 py-2.5"
            >
              <Bell className="h-4 w-4 text-orange-400" />
            </button>
          )}
          {notifState === "subscribed" && (
            <div className="inline-flex items-center gap-1 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs px-3 py-2.5">
              <BellOff className="h-4 w-4" />
            </div>
          )}
          <button
            onClick={dismiss}
            className="rounded-xl border border-zinc-700 bg-zinc-900 text-zinc-400 text-xs px-3 py-2.5"
          >
            {t("pwa.install.dismiss")}
          </button>
        </div>
      </div>
    </div>
  );
}
