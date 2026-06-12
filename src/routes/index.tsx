import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Truck, ShieldCheck, Headset, Star, Flame } from "lucide-react";
import { products } from "@/data/products";

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
  const featured = products[0]; // Mass Boost Hormonal Stack
  const rest = products.slice(1);

  return (
    <main className="bg-zinc-950">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-zinc-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(249,115,22,0.20),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(249,115,22,0.12),transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-24 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-300 px-3 py-1 text-xs font-bold uppercase tracking-wider">
              <Flame className="h-3.5 w-3.5" /> Marque #1 du fitness au Maroc
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight text-white">
              Construis le physique que <span className="text-orange-400">tu mérites</span>
            </h1>
            <p className="mt-4 text-lg text-zinc-300 max-w-xl">
              Suppléments 100% authentiques importés et certifiés. Livraison gratuite partout au Maroc. Paiement à la livraison.
            </p>
            <div className="mt-7 flex items-center gap-3 flex-wrap">
              <Link
                to="/boutique"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-orange-400 to-orange-600 hover:from-orange-300 hover:to-orange-500 text-zinc-950 font-black text-base px-6 py-4 shadow-xl shadow-orange-500/30 transition active:scale-[0.98]"
              >
                Voir la boutique <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/produit/$slug"
                params={{ slug: featured.slug }}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-white font-bold px-6 py-4"
              >
                Pack du moment
              </Link>
            </div>
            <div className="mt-6 flex items-center gap-1 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              <span className="ml-2 text-xs text-zinc-400">+1200 clients satisfaits</span>
            </div>
          </div>

          <Link to="/produit/$slug" params={{ slug: featured.slug }} className="relative block group">
            <div className="absolute inset-0 bg-orange-500/30 blur-3xl rounded-full" />
            <div className="relative rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900 to-zinc-950 p-6 sm:p-10 group-hover:border-orange-500/40 transition">
              <span className="absolute top-4 left-4 inline-flex items-center gap-1 rounded-full bg-orange-500 text-zinc-950 px-3 py-1 text-xs font-black">
                🔥 PACK DU MOMENT
              </span>
              <img src={featured.image} alt={featured.name} className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(249,115,22,0.35)]" />
              <div className="mt-4 flex items-center justify-between">
                <div className="min-w-0">
                  <div className="font-black text-white truncate">{featured.shortName}</div>
                  <div className="text-xs text-zinc-400 truncate">{featured.tagline}</div>
                </div>
                <div className="text-orange-400 font-black text-xl shrink-0">{featured.price} DH</div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* TRUST */}
      <section className="border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: ShieldCheck, title: "100% Authentique", desc: "Importé et certifié" },
            { icon: Truck, title: "Livraison Gratuite", desc: "Partout au Maroc 🇲🇦" },
            { icon: Headset, title: "Support 7j/7", desc: "Conseillers à l'écoute" },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-center gap-4 rounded-xl bg-zinc-900/60 border border-zinc-800 p-4">
              <span className="grid place-items-center h-12 w-12 rounded-xl bg-orange-500/15 text-orange-400 shrink-0">
                <Icon className="h-6 w-6" />
              </span>
              <div className="min-w-0">
                <div className="font-bold text-white">{title}</div>
                <div className="text-xs text-zinc-400">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-end justify-between gap-4 flex-wrap mb-8">
          <div>
            <span className="text-orange-400 text-xs font-bold uppercase tracking-wider">Nos packs</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-2">Choisis ton stack</h2>
          </div>
          <Link to="/boutique" className="text-orange-400 font-semibold hover:text-orange-300 inline-flex items-center gap-1">
            Voir tout <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {rest.map((p) => (
            <ProductCard key={p.slug} p={p} />
          ))}
        </div>
      </section>
    </main>
  );
}

function ProductCard({ p }: { p: typeof products[0] }) {
  return (
    <Link
      to="/produit/$slug"
      params={{ slug: p.slug }}
      className="group rounded-2xl border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900 hover:border-orange-500/40 transition overflow-hidden flex flex-col"
    >
      <div className="aspect-square bg-gradient-to-b from-zinc-900 to-zinc-950 p-3 sm:p-5">
        <img src={p.image} alt={p.name} loading="lazy" className="w-full h-full object-contain group-hover:scale-105 transition" />
      </div>
      <div className="p-3 sm:p-4 border-t border-zinc-800 flex-1 flex flex-col">
        <h3 className="font-bold text-white text-sm sm:text-base leading-tight line-clamp-2">{p.shortName}</h3>
        <p className="mt-1 text-xs text-zinc-400 line-clamp-2 hidden sm:block">{p.tagline}</p>
        <div className="mt-auto pt-3 flex items-center justify-between">
          <span className="text-orange-400 font-black text-lg">{p.price} DH</span>
          <span className="text-xs font-semibold text-zinc-300 group-hover:text-orange-400 inline-flex items-center gap-1">
            Voir <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
