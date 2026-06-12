import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Truck, ShieldCheck, Headset, Star, Flame } from "lucide-react";
import { products } from "@/data/products";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Go Fitness — Suppléments authentiques au Maroc 🇲🇦" },
      { name: "description", content: "Boutique premium de suppléments fitness au Maroc. Mass gainer, whey, créatine. Livraison gratuite, paiement à la livraison." },
    ],
  }),
  component: Index,
});

function Index() {
  const { t } = useI18n();
  const featured = products[0];
  const rest = products.slice(1);

  return (
    <main className="bg-zinc-950">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden border-b border-zinc-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(249,115,22,0.20),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(249,115,22,0.12),transparent_55%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">

          {/* Product image – first on mobile */}
          <Link to="/produit/$slug" params={{ slug: featured.slug }} className="lg:order-2 relative block group max-w-xs sm:max-w-sm mx-auto lg:max-w-none lg:mx-0 w-full">
            <div className="absolute inset-0 bg-orange-500/30 blur-3xl rounded-full" />
            <div className="relative rounded-2xl sm:rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900 to-zinc-950 p-4 sm:p-8 group-hover:border-orange-500/40 transition">
              <span className="absolute top-3 left-3 sm:top-4 sm:left-4 inline-flex items-center gap-1 rounded-full bg-orange-500 text-zinc-950 px-2.5 py-1 text-xs font-black">
                🔥 PACK DU MOMENT
              </span>
              <img
                src={featured.image}
                alt={featured.name}
                className="w-full max-h-56 sm:max-h-80 object-contain drop-shadow-[0_20px_40px_rgba(249,115,22,0.35)]"
              />
              <div className="mt-3 flex items-center justify-between">
                <div className="min-w-0">
                  <div className="font-black text-white truncate text-sm sm:text-base">{featured.shortName}</div>
                  <div className="text-xs text-zinc-400 truncate">{featured.tagline}</div>
                </div>
                <div className="text-orange-400 font-black text-lg sm:text-xl shrink-0 ml-3">{featured.price} DH</div>
              </div>
            </div>
          </Link>

          {/* Text */}
          <div className="lg:order-1">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-300 px-3 py-1 text-xs font-bold uppercase tracking-wider">
              <Flame className="h-3.5 w-3.5" /> {t("hero.badge")}
            </span>
            <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight text-white">
              {t("hero.title.a")}{" "}
              <span className="text-orange-400">{t("hero.title.b")}</span>
            </h1>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-zinc-300 max-w-xl leading-relaxed">
              {t("hero.subtitle")}
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-3 flex-wrap">
              <Link
                to="/boutique"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-orange-400 to-orange-600 hover:from-orange-300 hover:to-orange-500 text-zinc-950 font-black text-base px-6 py-4 shadow-xl shadow-orange-500/30 transition active:scale-[0.98]"
              >
                {t("hero.cta.shop")} <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/produit/$slug"
                params={{ slug: featured.slug }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-white font-bold px-6 py-4"
              >
                {t("hero.cta.featured")}
              </Link>
            </div>
            <div className="mt-5 flex items-center gap-1 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              <span className="ml-2 text-xs text-zinc-400">{t("hero.social")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BADGES ── */}
      <section className="border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 grid grid-cols-3 gap-2 sm:gap-4">
          {[
            { icon: ShieldCheck, title: t("trust.authentic"), desc: t("trust.authentic.desc") },
            { icon: Truck, title: t("trust.delivery"), desc: t("trust.delivery.desc") },
            { icon: Headset, title: t("trust.support"), desc: t("trust.support.desc") },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex flex-col sm:flex-row items-center sm:items-start sm:gap-4 rounded-xl bg-zinc-900/60 border border-zinc-800 p-3 sm:p-4 text-center sm:text-left">
              <span className="grid place-items-center h-10 w-10 rounded-xl bg-orange-500/15 text-orange-400 shrink-0 mx-auto sm:mx-0 mb-2 sm:mb-0">
                <Icon className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <div className="font-bold text-white text-xs sm:text-sm leading-tight">{title}</div>
                <div className="text-[10px] sm:text-xs text-zinc-400 mt-0.5 leading-snug">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRODUCTS GRID ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="flex items-end justify-between gap-4 flex-wrap mb-6 sm:mb-8">
          <div>
            <span className="text-orange-400 text-xs font-bold uppercase tracking-wider">
              {t("section.packs.eyebrow")}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mt-1 sm:mt-2">
              {t("section.packs.title")}
            </h2>
          </div>
          <Link to="/boutique" className="text-orange-400 font-semibold hover:text-orange-300 inline-flex items-center gap-1 text-sm">
            {t("section.viewAll")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {rest.map((p) => (
            <ProductCard key={p.slug} p={p} />
          ))}
        </div>
      </section>
    </main>
  );
}

function ProductCard({ p }: { p: typeof products[0] }) {
  const { t } = useI18n();
  return (
    <Link
      to="/produit/$slug"
      params={{ slug: p.slug }}
      className="group rounded-2xl border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900 hover:border-orange-500/40 transition overflow-hidden flex flex-col"
    >
      <div className="aspect-square bg-gradient-to-b from-zinc-900 to-zinc-950 p-3 sm:p-5">
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          className="w-full h-full object-contain group-hover:scale-105 transition"
        />
      </div>
      <div className="p-3 sm:p-4 border-t border-zinc-800 flex-1 flex flex-col">
        <h3 className="font-bold text-white text-xs sm:text-sm leading-tight line-clamp-2">{p.shortName}</h3>
        <p className="mt-1 text-xs text-zinc-400 line-clamp-2 hidden sm:block leading-relaxed">{p.tagline}</p>
        <div className="mt-auto pt-2 sm:pt-3 flex items-center justify-between gap-1">
          <span className="text-orange-400 font-black text-base sm:text-lg">{p.price} DH</span>
          <span className="text-xs font-semibold text-zinc-300 group-hover:text-orange-400 inline-flex items-center gap-1">
            {t("card.see")} <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
