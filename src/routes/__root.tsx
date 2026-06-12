import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { AnnouncementBar, Header, Footer } from "@/components/Layout";
import { I18nProvider } from "@/i18n";
import { ChatBubble } from "@/components/ChatBubble";
import { PwaInstall } from "@/components/PwaInstall";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-black text-orange-400">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-white">Page introuvable</h2>
        <p className="mt-2 text-sm text-zinc-400">
          Cette page n'existe pas ou a été déplacée.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-orange-500 px-4 py-2 text-sm font-bold text-zinc-950 transition-colors hover:bg-orange-400"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-white">Erreur de chargement</h1>
        <p className="mt-2 text-sm text-zinc-400">Une erreur est survenue. Réessayez ou revenez à l'accueil.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-orange-500 px-4 py-2 text-sm font-bold text-zinc-950 hover:bg-orange-400"
          >
            Réessayer
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
          >
            Accueil
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: "Go Fitness — Suppléments authentiques au Maroc, livraison gratuite" },
      { name: "description", content: "Boutique fitness 100% authentique au Maroc. Mass gainer, whey, créatine, pre-workout. Paiement à la livraison, livraison gratuite partout au Maroc." },
      { name: "author", content: "Go Fitness" },
      { name: "theme-color", content: "#f97316" },
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      { name: "apple-mobile-web-app-title", content: "Go Fitness" },
      { property: "og:title", content: "Go Fitness — Suppléments authentiques au Maroc" },
      { property: "og:description", content: "Mass gainer, whey, créatine et plus. Paiement à la livraison. Livraison gratuite partout au Maroc 🇲🇦" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/manifest.json" },
      { rel: "apple-touch-icon", href: "/icon-192.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className="dark">
      <head>
        <HeadContent />
      </head>
      <body className="bg-zinc-950 text-white antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function ServiceWorkerRegistrar() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/" })
        .catch((err) => console.warn("[SW] registration failed:", err));
    }
  }, []);
  return null;
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <ServiceWorkerRegistrar />
        <AnnouncementBar />
        <Header />
        <Outlet />
        <Footer />
        <ChatBubble />
        <PwaInstall />
      </I18nProvider>
    </QueryClientProvider>
  );
}
