import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Star } from "lucide-react";
import { products } from "@/data/products";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/boutique")({
  head: () => ({
    meta: [
      { title: "Boutique — Go Fitness Maroc" },
      { name: "description", content: "Découvrez tous nos packs de suppléments fitness : mass gainer, whey, créatine, pre-workout. Livraison gratuite au Maroc." },
    ],
  }),
  component: Boutique,
});

function Boutique() {
  const { t } = useI18n();
  return (
    <main className="bg-zinc-950 min-h-screen">
      {/* Header */}
      <section className="border-b border-zinc-900 bg-[radial-gradient(circle_at_50%_-20%,rgba(249,115,22,0.18),transparent_60%)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14 lg:py-16 text-center">
          <span className="text-orange-400 text-xs font-bold uppercase tracking-wider">{t("nav.shop")}</span>
          <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-black text-white">{t("shop.title")}</h1>
          <p className="mt-2 sm:mt-3 text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base">{t("shop.subtitle")}</p>
        </div>
      </section>

      {/* Products grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {products.map((p) => (
            <Link
              key={p.slug}
              to="/produit/$slug"
              params={{ slug: p.slug }}
              className="group rounded-2xl border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900 hover:border-orange-500/40 transition overflow-hidden flex flex-col"
            >
              <div className="aspect-square bg-gradient-to-b from-zinc-900 to-zinc-950 p-3 sm:p-5">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="w-full h-full object-contain group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-3 sm:p-4 border-t border-zinc-800 flex-1 flex flex-col">
                <h3 className="font-bold text-white text-xs sm:text-sm leading-tight line-clamp-2">{p.shortName}</h3>
                <p className="mt-1 text-xs text-zinc-400 line-clamp-2 hidden sm:block leading-relaxed">{p.tagline}</p>

                {/* Stars */}
                <div className="mt-2 flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-[10px] text-zinc-500 ml-1">5.0</span>
                </div>

                <div className="mt-auto pt-2 sm:pt-3 flex items-center justify-between gap-1">
                  <span className="text-orange-400 font-black text-base sm:text-lg">{p.price} DH</span>
                  <span className="text-xs font-semibold text-zinc-300 group-hover:text-orange-400 inline-flex items-center gap-1">
                    {t("card.see")} <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
