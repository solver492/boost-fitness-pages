import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Star, Filter } from "lucide-react";
import { useState } from "react";
import { products, CATEGORIES, type ProductCategory } from "@/data/products";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/boutique")({
  head: () => ({
    meta: [
      { title: "Boutique — Go Fitness Maroc" },
      { name: "description", content: "Tous nos suppléments fitness : protéines, gainers, créatine, pre-workout, acides aminés, vitamines. Livraison gratuite au Maroc." },
    ],
  }),
  component: Boutique,
});

function Boutique() {
  const { t, locale } = useI18n();
  const [activeCategory, setActiveCategory] = useState<ProductCategory | "all">("all");

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  const getCatLabel = (cat: typeof CATEGORIES[0]) => {
    if (locale === "ar") return cat.labelAr;
    if (locale === "en") return cat.labelEn;
    return cat.label;
  };

  return (
    <main className="bg-zinc-950 min-h-screen">
      {/* Header */}
      <section className="border-b border-zinc-900 bg-[radial-gradient(circle_at_50%_-20%,rgba(249,115,22,0.18),transparent_60%)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14 text-center">
          <span className="text-orange-400 text-xs font-bold uppercase tracking-wider">{t("nav.shop")}</span>
          <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-black text-white">{t("shop.title")}</h1>
          <p className="mt-2 text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base">{t("shop.subtitle")}</p>
          <p className="mt-1 text-xs text-zinc-500">{products.length} produits disponibles · Maroc 🇲🇦</p>
        </div>
      </section>

      {/* Category filters */}
      <section className="border-b border-zinc-900 bg-zinc-950/90 sticky top-[calc(32px+56px)] sm:top-[calc(36px+64px)] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
            <Filter className="h-4 w-4 text-zinc-500 shrink-0" />
            <button
              onClick={() => setActiveCategory("all")}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold border transition ${
                activeCategory === "all"
                  ? "bg-orange-500 text-zinc-950 border-orange-500"
                  : "border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500"
              }`}
            >
              Tout ({products.length})
            </button>
            {CATEGORIES.map((cat) => {
              const count = products.filter((p) => p.category === cat.id).length;
              if (count === 0) return null;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold border transition ${
                    activeCategory === cat.id
                      ? "bg-orange-500 text-zinc-950 border-orange-500"
                      : "border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500"
                  }`}
                >
                  {getCatLabel(cat)} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Products grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-zinc-500">Aucun produit dans cette catégorie.</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            {filtered.map((p) => (
              <Link
                key={p.slug}
                to="/produit/$slug"
                params={{ slug: p.slug }}
                className="group rounded-2xl border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900 hover:border-orange-500/40 transition overflow-hidden flex flex-col"
              >
                {/* Category badge */}
                <div className="aspect-square bg-gradient-to-b from-zinc-900 to-zinc-950 p-3 sm:p-4 relative">
                  <span className="absolute top-2 left-2 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-zinc-800/90 text-zinc-400 px-2 py-0.5 rounded-full border border-zinc-700">
                    {p.brand}
                  </span>
                  {p.category === "pack" && (
                    <span className="absolute top-2 right-2 text-[9px] font-bold bg-orange-500 text-zinc-950 px-1.5 py-0.5 rounded-full">
                      PACK
                    </span>
                  )}
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="w-full h-full object-contain group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-3 sm:p-4 border-t border-zinc-800 flex-1 flex flex-col">
                  <div className="text-[10px] text-orange-400 font-bold uppercase tracking-wider mb-0.5">
                    {CATEGORIES.find((c) => c.id === p.category)?.[
                      locale === "ar" ? "labelAr" : locale === "en" ? "labelEn" : "label"
                    ] ?? p.category}
                  </div>
                  <h3 className="font-bold text-white text-xs sm:text-sm leading-tight line-clamp-2">{p.shortName}</h3>
                  <p className="mt-1 text-xs text-zinc-400 line-clamp-1 hidden sm:block leading-relaxed">{p.tagline}</p>

                  {/* Stars */}
                  <div className="mt-1.5 sm:mt-2 flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-2.5 w-2.5 sm:h-3 sm:w-3 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-[9px] sm:text-[10px] text-zinc-500 ml-1">5.0</span>
                  </div>

                  {/* Variants info */}
                  {p.variants && p.variants.length > 1 && (
                    <div className="mt-1 text-[9px] sm:text-[10px] text-zinc-500">
                      {p.variants.length} formats disponibles
                    </div>
                  )}

                  <div className="mt-auto pt-2 sm:pt-3 flex items-center justify-between gap-1">
                    <div>
                      {p.variants && p.variants.length > 1 && (
                        <div className="text-[9px] text-zinc-500">À partir de</div>
                      )}
                      <span className="text-orange-400 font-black text-base sm:text-lg">
                        {p.variants ? Math.min(...p.variants.map((v) => v.price)) : p.price} DH
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-zinc-300 group-hover:text-orange-400 inline-flex items-center gap-1">
                      {t("card.see")} <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
