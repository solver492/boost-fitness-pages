import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Truck, ShieldCheck, Headset, Star, Flame, Package } from "lucide-react";
import { products, CATEGORIES, type ProductCategory } from "@/data/products";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Go Fitness — Suppléments authentiques au Maroc 🇲🇦" },
      { name: "description", content: "Boutique premium de suppléments fitness au Maroc. Mass gainer, whey, créatine, pre-workout. Livraison gratuite, paiement à la livraison." },
    ],
  }),
  component: Index,
});

const FEATURED_CATEGORIES: { id: ProductCategory; icon: string }[] = [
  { id: "pack", icon: "📦" },
  { id: "proteine", icon: "💪" },
  { id: "gainer", icon: "⚡" },
  { id: "creatine", icon: "🔥" },
  { id: "pre-workout", icon: "🚀" },
  { id: "vitamines", icon: "💊" },
];

function Index() {
  const { t, locale } = useI18n();
  const featured = products[0];
  // Show 1 product per featured category on home page
  const showcaseProducts = products.filter((p) => p.category !== "pack").slice(0, 8);

  const getCatLabel = (id: ProductCategory) => {
    const cat = CATEGORIES.find((c) => c.id === id);
    if (!cat) return id;
    if (locale === "ar") return cat.labelAr;
    if (locale === "en") return cat.labelEn;
    return cat.label;
  };

  return (
    <main className="bg-zinc-950">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden border-b border-zinc-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(249,115,22,0.20),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(249,115,22,0.12),transparent_55%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">

          {/* Product image */}
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
            <div className="mt-4 text-sm text-zinc-400">
              <span className="text-orange-400 font-bold">{products.length}</span> produits disponibles · Protéines, Gainers, Créatine, Pre-Workout & plus
            </div>
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

      {/* ── CATEGORY SHORTCUTS ── */}
      <section className="border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1 sm:flex-wrap sm:overflow-visible">
            {FEATURED_CATEGORIES.map(({ id, icon }) => {
              const count = products.filter((p) => p.category === id).length;
              return (
                <Link
                  key={id}
                  to="/boutique"
                  className="shrink-0 sm:flex-1 flex flex-col items-center justify-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900/50 hover:border-orange-500/40 hover:bg-zinc-900 p-3 sm:p-4 transition group min-w-[80px]"
                >
                  <span className="text-xl sm:text-2xl">{icon}</span>
                  <span className="text-xs font-bold text-zinc-300 group-hover:text-white text-center leading-tight">{getCatLabel(id)}</span>
                  <span className="text-[10px] text-zinc-500">{count} produit{count > 1 ? "s" : ""}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PACKS SECTION ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="flex items-end justify-between gap-4 flex-wrap mb-6 sm:mb-8">
          <div>
            <span className="text-orange-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Package className="h-3.5 w-3.5" /> {t("section.packs.eyebrow")}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mt-1 sm:mt-2">
              {t("section.packs.title")}
            </h2>
          </div>
          <Link to="/boutique" className="text-orange-400 font-semibold hover:text-orange-300 inline-flex items-center gap-1 text-sm">
            {t("section.viewAll")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {products.filter((p) => p.category === "pack").slice(0, 4).map((p) => (
            <ProductCard key={p.slug} p={p} locale={locale} />
          ))}
        </div>
      </section>

      {/* ── INDIVIDUAL PRODUCTS SECTION ── */}
      <section className="bg-zinc-900/20 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <div className="flex items-end justify-between gap-4 flex-wrap mb-6 sm:mb-8">
            <div>
              <span className="text-orange-400 text-xs font-bold uppercase tracking-wider">Produits individuels</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mt-1 sm:mt-2">
                Protéines, Créatine & Plus
              </h2>
            </div>
            <Link to="/boutique" className="text-orange-400 font-semibold hover:text-orange-300 inline-flex items-center gap-1 text-sm">
              {t("section.viewAll")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            {showcaseProducts.map((p) => (
              <ProductCard key={p.slug} p={p} locale={locale} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function ProductCard({ p, locale }: { p: typeof products[0]; locale: string }) {
  const { t } = useI18n();
  const minPrice = p.variants ? Math.min(...p.variants.map((v) => v.price)) : p.price;
  const hasVariants = p.variants && p.variants.length > 1;

  return (
    <Link
      to="/produit/$slug"
      params={{ slug: p.slug }}
      className="group rounded-2xl border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900 hover:border-orange-500/40 transition overflow-hidden flex flex-col"
    >
      <div className="aspect-square bg-gradient-to-b from-zinc-900 to-zinc-950 p-3 sm:p-4 relative">
        <span className="absolute top-2 left-2 text-[9px] font-bold bg-zinc-800/90 text-zinc-400 px-1.5 py-0.5 rounded-full border border-zinc-700">
          {p.brand}
        </span>
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          className="w-full h-full object-contain group-hover:scale-105 transition duration-300"
        />
      </div>
      <div className="p-3 sm:p-4 border-t border-zinc-800 flex-1 flex flex-col">
        <div className="text-[9px] sm:text-[10px] text-orange-400 font-bold uppercase tracking-wider mb-0.5">
          {CATEGORIES.find((c) => c.id === p.category)?.[
            locale === "ar" ? "labelAr" : locale === "en" ? "labelEn" : "label"
          ] ?? p.category}
        </div>
        <h3 className="font-bold text-white text-xs sm:text-sm leading-tight line-clamp-2">{p.shortName}</h3>
        <div className="mt-1.5 flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />
          ))}
        </div>
        <div className="mt-auto pt-2 sm:pt-3 flex items-center justify-between gap-1">
          <div>
            {hasVariants && <div className="text-[9px] text-zinc-500">Dès</div>}
            <span className="text-orange-400 font-black text-base sm:text-lg">{minPrice} DH</span>
          </div>
          <span className="text-xs font-semibold text-zinc-300 group-hover:text-orange-400 inline-flex items-center gap-1">
            {t("card.see")} <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
