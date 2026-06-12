import { ShieldCheck, Truck, Headset, Star, Flame, Zap, Dumbbell, Sparkles, CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import { CheckoutForm } from "@/components/CheckoutForm";
import { PackBreakdown } from "@/components/PackBreakdown";
import { useI18n } from "@/i18n";
import type { Product } from "@/data/products";

const ICONS = { Flame, Zap, Dumbbell, Sparkles } as const;

export function ProductLanding({ product }: { product: Product }) {
  const { t } = useI18n();
  const scrollToCheckout = () => {
    document.getElementById("checkout")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="bg-zinc-950 text-white">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-zinc-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(249,115,22,0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(249,115,22,0.10),transparent_50%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="order-2 lg:order-1">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-300 px-3 py-1 text-xs font-bold uppercase tracking-wider">
              <Flame className="h-3.5 w-3.5" /> {t("landing.limited")}
            </span>
            <h1 className="mt-4 text-3xl sm:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight">
              {product.tagline.split(" ").slice(0, -2).join(" ")}{" "}
              <span className="text-orange-400">{product.tagline.split(" ").slice(-2).join(" ")}</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-zinc-300 max-w-xl">
              {product.mainBenefit}. {product.description}
            </p>

            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {product.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm sm:text-base text-zinc-200">
                  <CheckCircle2 className="h-5 w-5 text-orange-400 shrink-0 mt-0.5" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex items-center gap-4 flex-wrap">
              <button
                onClick={scrollToCheckout}
                className="animate-pulse inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-orange-400 to-orange-600 hover:from-orange-300 hover:to-orange-500 text-zinc-950 font-black text-sm sm:text-base px-6 sm:px-8 py-4 shadow-xl shadow-orange-500/30 transition active:scale-[0.98]"
              >
                {t("landing.cta")}
                <ArrowRight className="h-5 w-5" />
              </button>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white">{product.price}.00 DH</div>
                <div className="text-xs text-zinc-400">{t("landing.cod")}</div>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-1 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
              <span className="ml-2 text-xs text-zinc-400">+1200 clients · Maroc 🇲🇦</span>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative">
            <div className="absolute inset-0 bg-orange-500/30 blur-3xl rounded-full" />
            <div className="relative rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900 to-zinc-950 p-6 sm:p-10">
              <img
                src={product.image}
                alt={product.name}
                loading="eager"
                className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(249,115,22,0.35)]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: ShieldCheck, title: t("trust.authentic"), desc: t("trust.authentic.desc") },
            { icon: Truck, title: t("trust.delivery"), desc: t("trust.delivery.desc") },
            { icon: Headset, title: t("trust.support"), desc: t("trust.support.desc") },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-center gap-4 rounded-xl bg-zinc-900/60 border border-zinc-800 p-4">
              <span className="grid place-items-center h-12 w-12 rounded-xl bg-orange-500/15 text-orange-400 shrink-0">
                <Icon className="h-6 w-6" />
              </span>
              <div className="min-w-0">
                <div className="font-bold text-white truncate">{title}</div>
                <div className="text-xs text-zinc-400">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PACK BREAKDOWN — radial decomposition on scroll */}
      <PackBreakdown product={product} />

      {/* PROBLEM / SOLUTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-red-900/40 bg-red-950/20 p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {t("landing.problem.title")} <span className="text-red-400">{t("landing.problem.title2")}</span> ?
            </h2>
            <p className="mt-2 text-zinc-400 text-sm">{t("landing.problem.subtitle")}</p>
            <ul className="mt-5 space-y-3">
              {product.problems.map((p) => (
                <li key={p} className="flex items-start gap-3 text-zinc-200">
                  <XCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-orange-500/30 bg-orange-500/5 p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {t("landing.solution.title")} <span className="text-orange-400">{product.shortName}</span>
            </h2>
            <p className="mt-2 text-zinc-400 text-sm">{t("landing.solution.subtitle")}</p>
            <ul className="mt-5 space-y-3">
              {product.solutions.map((s) => (
                <li key={s} className="flex items-start gap-3 text-zinc-200">
                  <CheckCircle2 className="h-5 w-5 text-orange-400 shrink-0 mt-0.5" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* BENEFITS GRID */}
      <section className="bg-zinc-900/30 border-y border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-block text-orange-400 text-xs font-bold uppercase tracking-wider">{t("landing.benefits.eyebrow")}</span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-black">{t("landing.benefits.title")}</h2>
          </div>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {product.ingredients.map((ing) => {
              const Icon = ICONS[ing.icon as keyof typeof ICONS] ?? Sparkles;
              return (
                <div
                  key={ing.title}
                  className="group rounded-2xl border border-zinc-800 bg-zinc-950 p-6 hover:border-orange-500/50 hover:bg-zinc-900 transition"
                >
                  <span className="grid place-items-center h-12 w-12 rounded-xl bg-orange-500/15 text-orange-400 group-hover:scale-110 transition">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-black text-white text-lg">{ing.title}</h3>
                  <p className="mt-1.5 text-sm text-zinc-400">{ing.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-block text-orange-400 text-xs font-bold uppercase tracking-wider">{t("landing.testimonials.eyebrow")}</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-black">{t("landing.testimonials.title")}</h2>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: "Youssef", city: "Tanger", text: "Wallah produit original ! +6kg en 2 mois, force de fou. Livraison en 24h à Tanger, payé cash. Recommandé à 200%." },
            { name: "Amine", city: "Casablanca", text: "J'ai testé plein de produits, celui-ci est le seul qui m'a fait progresser réellement. Service client top, livraison rapide." },
            { name: "Mehdi", city: "Marrakech", text: "Excellent rapport qualité/prix. J'ai senti la différence dès la 2ème semaine. Le coach m'a appelé pour confirmer, très pro." },
          ].map((tt) => (
            <div key={tt.name} className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="text-zinc-200 leading-relaxed">"{tt.text}"</p>
              <div className="mt-4 flex items-center gap-3 pt-4 border-t border-zinc-800">
                <div className="grid place-items-center h-10 w-10 rounded-full bg-orange-500 text-zinc-950 font-black">
                  {tt.name[0]}
                </div>
                <div>
                  <div className="font-bold text-white text-sm">{tt.name}</div>
                  <div className="text-xs text-zinc-400">{tt.city}, Maroc 🇲🇦</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CHECKOUT */}
      <section className="bg-gradient-to-b from-zinc-900/40 to-zinc-950 border-t border-zinc-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8 items-start">
          <div>
            <span className="inline-block text-orange-400 text-xs font-bold uppercase tracking-wider">{t("landing.checkout.eyebrow")}</span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-black">{t("landing.checkout.title")}</h2>
            <p className="mt-3 text-zinc-400 max-w-md">{t("landing.checkout.desc")}</p>
            <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 flex items-center gap-4">
              <img src={product.image} alt={product.name} className="h-16 w-16 object-contain rounded-lg bg-zinc-950 p-1" />
              <div className="min-w-0 flex-1">
                <div className="font-bold text-white truncate">{product.shortName}</div>
                <div className="text-xs text-zinc-400 truncate">{product.tagline}</div>
              </div>
              <div className="text-orange-400 font-black shrink-0">{product.price} DH</div>
            </div>
            <ul className="mt-6 space-y-2 text-sm text-zinc-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> {t("landing.cod")}</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> {t("trust.delivery")} · 24-72h</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> {t("trust.authentic")}</li>
            </ul>
          </div>
          <CheckoutForm product={product} />
        </div>
      </section>
    </main>
  );
}
