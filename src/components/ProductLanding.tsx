import {
  ShieldCheck, Truck, Headset, Star, Flame, Zap, Dumbbell, Sparkles,
  CheckCircle2, XCircle, ArrowRight,
} from "lucide-react";
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
      {/* ── HERO ── */}
      <section className="relative overflow-hidden border-b border-zinc-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(249,115,22,0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(249,115,22,0.10),transparent_50%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">

          {/* Image – shown FIRST on mobile */}
          <div className="lg:order-2 relative max-w-xs sm:max-w-sm mx-auto lg:max-w-none lg:mx-0 w-full">
            <div className="absolute inset-0 bg-orange-500/25 blur-3xl rounded-full" />
            <div className="relative rounded-2xl sm:rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900 to-zinc-950 p-4 sm:p-8">
              <img
                src={product.image}
                alt={product.name}
                loading="eager"
                className="w-full h-auto max-h-64 sm:max-h-96 object-contain drop-shadow-[0_20px_40px_rgba(249,115,22,0.35)]"
              />
            </div>
          </div>

          {/* Text */}
          <div className="lg:order-1">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-300 px-3 py-1 text-xs font-bold uppercase tracking-wider">
              <Flame className="h-3.5 w-3.5" /> {t("landing.limited")}
            </span>

            <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black leading-[1.08] tracking-tight">
              {product.tagline.split(" ").slice(0, -2).join(" ")}{" "}
              <span className="text-orange-400">{product.tagline.split(" ").slice(-2).join(" ")}</span>
            </h1>

            <p className="mt-3 sm:mt-4 text-base text-zinc-300 max-w-xl leading-relaxed">
              {product.mainBenefit}. {product.description}
            </p>

            <ul className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {product.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-zinc-200">
                  <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-orange-400 shrink-0 mt-0.5" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-wrap">
              <button
                onClick={scrollToCheckout}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-orange-400 to-orange-600 hover:from-orange-300 hover:to-orange-500 text-zinc-950 font-black text-base px-7 py-4 shadow-xl shadow-orange-500/30 transition active:scale-[0.98]"
              >
                {t("landing.cta")}
                <ArrowRight className="h-5 w-5" />
              </button>
              <div>
                {product.variants && product.variants.length > 1 ? (
                  <>
                    <div className="text-xs text-zinc-400">À partir de</div>
                    <div className="text-2xl sm:text-3xl font-black text-white">
                      {Math.min(...product.variants.map((v) => v.price))} DH
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {product.variants.map((v) => (
                        <span key={v.size} className="text-[10px] border border-zinc-700 text-zinc-400 rounded px-1.5 py-0.5">
                          {v.size} — <span className="text-orange-400 font-bold">{v.price} DH</span>
                        </span>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-2xl sm:text-3xl font-black text-white">{product.price} DH</div>
                )}
                <div className="text-xs text-zinc-400 mt-0.5">{t("landing.cod")}</div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-1 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
              <span className="ml-2 text-xs text-zinc-400">{t("landing.social")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BADGES ── */}
      <section className="border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 grid grid-cols-3 gap-3 sm:gap-4">
          {[
            { icon: ShieldCheck, title: t("trust.authentic"), desc: t("trust.authentic.desc") },
            { icon: Truck, title: t("trust.delivery"), desc: t("trust.delivery.desc") },
            { icon: Headset, title: t("trust.support"), desc: t("trust.support.desc") },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex flex-col sm:flex-row items-center sm:items-start sm:gap-4 rounded-xl bg-zinc-900/60 border border-zinc-800 p-3 sm:p-4 text-center sm:text-left">
              <span className="grid place-items-center h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-orange-500/15 text-orange-400 shrink-0 mx-auto sm:mx-0 mb-2 sm:mb-0">
                <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
              </span>
              <div className="min-w-0">
                <div className="font-bold text-white text-xs sm:text-sm leading-tight">{title}</div>
                <div className="text-[11px] sm:text-xs text-zinc-400 mt-0.5">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PACK BREAKDOWN ── */}
      <PackBreakdown product={product} />

      {/* ── PROBLEM / SOLUTION ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          <div className="rounded-2xl border border-red-900/40 bg-red-950/20 p-5 sm:p-8">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white">
              {t("landing.problem.title")} <span className="text-red-400">{t("landing.problem.title2")}</span> ?
            </h2>
            <p className="mt-2 text-zinc-400 text-sm">{t("landing.problem.subtitle")}</p>
            <ul className="mt-4 sm:mt-5 space-y-3">
              {product.problems.map((p) => (
                <li key={p} className="flex items-start gap-3 text-zinc-200 text-sm sm:text-base">
                  <XCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-orange-500/30 bg-orange-500/5 p-5 sm:p-8">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white">
              {t("landing.solution.title")} <span className="text-orange-400">{product.shortName}</span>
            </h2>
            <p className="mt-2 text-zinc-400 text-sm">{t("landing.solution.subtitle")}</p>
            <ul className="mt-4 sm:mt-5 space-y-3">
              {product.solutions.map((s) => (
                <li key={s} className="flex items-start gap-3 text-zinc-200 text-sm sm:text-base">
                  <CheckCircle2 className="h-5 w-5 text-orange-400 shrink-0 mt-0.5" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── BENEFITS GRID ── */}
      <section className="bg-zinc-900/30 border-y border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-block text-orange-400 text-xs font-bold uppercase tracking-wider">
              {t("landing.benefits.eyebrow")}
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-black">
              {t("landing.benefits.title")}
            </h2>
          </div>
          <div className="mt-8 sm:mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {product.ingredients.map((ing) => {
              const Icon = ICONS[ing.icon as keyof typeof ICONS] ?? Sparkles;
              return (
                <div
                  key={ing.title}
                  className="group rounded-2xl border border-zinc-800 bg-zinc-950 p-4 sm:p-6 hover:border-orange-500/50 hover:bg-zinc-900 transition"
                >
                  <span className="grid place-items-center h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-orange-500/15 text-orange-400 group-hover:scale-110 transition">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </span>
                  <h3 className="mt-3 sm:mt-4 font-black text-white text-sm sm:text-lg leading-tight">{ing.title}</h3>
                  <p className="mt-1 sm:mt-1.5 text-xs sm:text-sm text-zinc-400 leading-relaxed">{ing.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-block text-orange-400 text-xs font-bold uppercase tracking-wider">
            {t("landing.testimonials.eyebrow")}
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-black">
            {t("landing.testimonials.title")}
          </h2>
        </div>
        <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {([1, 2, 3] as const).map((n) => (
            <div key={n} className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 sm:p-6">
              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="text-zinc-200 leading-relaxed text-sm sm:text-base">
                &ldquo;{t(`testimonial.${n}.text`)}&rdquo;
              </p>
              <div className="mt-4 flex items-center gap-3 pt-4 border-t border-zinc-800">
                <div className="grid place-items-center h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-orange-500 text-zinc-950 font-black text-sm shrink-0">
                  {t(`testimonial.${n}.name`)[0]}
                </div>
                <div>
                  <div className="font-bold text-white text-sm">{t(`testimonial.${n}.name`)}</div>
                  <div className="text-xs text-zinc-400">{t(`testimonial.${n}.city`)}, Maroc 🇲🇦</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CHECKOUT ── */}
      <section id="checkout-section" className="bg-gradient-to-b from-zinc-900/40 to-zinc-950 border-t border-zinc-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8 items-start">
          <div>
            <span className="inline-block text-orange-400 text-xs font-bold uppercase tracking-wider">
              {t("landing.checkout.eyebrow")}
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-black">
              {t("landing.checkout.title")}
            </h2>
            <p className="mt-3 text-zinc-400 text-sm sm:text-base max-w-md leading-relaxed">
              {t("landing.checkout.desc")}
            </p>

            <div className="mt-5 sm:mt-6 rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 flex items-center gap-3 sm:gap-4">
              <img
                src={product.image}
                alt={product.name}
                className="h-14 w-14 sm:h-16 sm:w-16 object-contain rounded-lg bg-zinc-950 p-1 shrink-0"
              />
              <div className="min-w-0 flex-1">
                <div className="font-bold text-white text-sm leading-tight">{product.shortName}</div>
                <div className="text-xs text-zinc-400 truncate mt-0.5">{product.tagline}</div>
              </div>
              <div className="text-orange-400 font-black shrink-0 text-lg">{product.price} DH</div>
            </div>

            <ul className="mt-4 sm:mt-6 space-y-2 text-sm text-zinc-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" /> {t("landing.cod")}
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" /> {t("trust.delivery")} · 24–72h
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" /> {t("trust.authentic")}
              </li>
            </ul>
          </div>

          <CheckoutForm product={product} />
        </div>
      </section>
    </main>
  );
}
