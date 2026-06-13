import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck, Truck, Headset, Star, Flame, Zap, Dumbbell, Sparkles,
  CheckCircle2, XCircle, ArrowRight, Package, ChevronDown,
} from "lucide-react";
import { CheckoutForm } from "@/components/CheckoutForm";
import { PackBreakdown } from "@/components/PackBreakdown";
import { useI18n } from "@/i18n";
import type { Product } from "@/data/products";

const ICONS = { Flame, Zap, Dumbbell, Sparkles } as const;

/* ─── Figma-style hero ──────────────────────────────────────────────── */
function HeroProduct({ product, onOrder }: { product: Product; onOrder: () => void }) {
  const { t } = useI18n();
  const [activeVariant, setActiveVariant] = useState(0);
  const currentPrice = product.variants
    ? product.variants[activeVariant].price
    : product.price;

  // Split product name into words for the stacked big type effect
  const titleWords = product.shortName.toUpperCase().split(" ");

  return (
    <section className="relative bg-black overflow-x-hidden">
      {/* ── Ambient background glow from product image ── */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `url(${product.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
          filter: "blur(60px) saturate(0.4)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/50 to-black/85" />

      {/* ── Brand micro-bar ── */}
      <div className="relative z-10 flex items-center justify-between px-5 sm:px-10 py-3 border-b border-white/[0.05]">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Go Fitness</span>
          <span className="text-zinc-800 text-xs">·</span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-orange-400/80">{product.brand}</span>
        </div>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />
          ))}
          <span className="text-[10px] text-zinc-500 ml-1">5.0 (1200+)</span>
        </div>
      </div>

      {/* ── DESKTOP: True 2-col grid — left col drives height, image in right col ── */}
      <div className="relative z-10 hidden lg:grid lg:grid-cols-[1fr_1fr] max-w-[1400px] mx-auto">

        {/* LEFT col — content drives height naturally */}
        <div className="px-14 xl:px-20 py-12 xl:py-14 flex flex-col">
          <motion.span
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.28em] text-orange-400 mb-4"
          >
            <span className="h-px w-8 bg-orange-400 block" />
            {product.brand}
            <span className="h-px w-8 bg-orange-400 block" />
          </motion.span>

          {/* Stacked title — Figma alternating opacity. No clip wrappers, compact size */}
          <div className="mb-4">
            {titleWords.map((word, i) => (
              <motion.span
                key={word + i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 + i * 0.05, ease: "easeOut", duration: 0.4 }}
                className="block font-black tracking-[-0.03em] leading-[0.9]"
                style={{
                  fontSize: "clamp(2.2rem, 3.4vw, 4rem)",
                  color: i % 2 === 0 ? "#ffffff" : "rgba(255,255,255,0.28)",
                }}
              >
                {word}
              </motion.span>
            ))}
          </div>

          <p className="text-sm text-zinc-400 leading-relaxed max-w-xs mb-4">
            {product.mainBenefit}
          </p>

          <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 mb-4 max-w-sm">
            {product.bullets.slice(0, 4).map((b) => (
              <li key={b} className="flex items-start gap-2 text-xs text-zinc-300">
                <span className="flex-none h-1 w-1 rounded-full bg-orange-400 mt-1.5" />
                {b}
              </li>
            ))}
          </ul>

          {product.variants && product.variants.length > 1 && (
            <div className="mb-4">
              <div className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold mb-2">Format</div>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v, i) => (
                  <button
                    key={v.size}
                    onClick={() => setActiveVariant(i)}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${
                      i === activeVariant
                        ? "bg-orange-500 border-orange-500 text-black shadow-[0_0_20px_rgba(249,115,22,0.3)]"
                        : "border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-white bg-zinc-950/50"
                    }`}
                  >
                    {v.size} <span className={i === activeVariant ? "text-black/60 ml-1" : "text-orange-400 ml-1"}>{v.price} DH</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-5 mb-4">
            <button
              onClick={onOrder}
              className="group rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-black text-sm px-6 py-3.5 transition-all active:scale-[0.97] shadow-[0_0_35px_rgba(249,115,22,0.35)]"
            >
              <span className="flex items-center gap-2">
                {t("landing.cta")} <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <div>
              <div className="text-2xl font-black text-white leading-none">
                {currentPrice} <span className="text-sm text-zinc-500 font-normal">DH</span>
              </div>
              <div className="text-[10px] text-zinc-600 mt-0.5">{t("landing.cod")}</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {[
              { icon: ShieldCheck, label: "100% Authentique" },
              { icon: Truck, label: "Livraison gratuite" },
              { icon: Headset, label: "Support 7j/7" },
            ].map(({ icon: Icon, label }) => (
              <span key={label} className="flex items-center gap-1.5 text-[10px] text-zinc-600">
                <Icon className="h-3 w-3 text-orange-400" />
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT col — image in normal flow, centered vertically */}
        <div className="relative flex items-center justify-center min-h-[520px]">
          {/* Glow & rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[460px] h-[460px] rounded-full bg-orange-500/12 blur-[80px]" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[440px] h-[440px] rounded-full border border-white/[0.03]" />
            <div className="absolute w-[320px] h-[320px] rounded-full border border-white/[0.04]" />
            <div className="absolute w-[210px] h-[210px] rounded-full border border-orange-500/[0.08]" />
          </div>
          {/* Rotated product image */}
          <motion.div
            initial={{ opacity: 0, rotate: 6, scale: 0.88 }}
            animate={{ opacity: 1, rotate: 14, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10"
            style={{ filter: "drop-shadow(0 20px 60px rgba(249,115,22,0.5))" }}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-[300px] h-[300px] xl:w-[360px] xl:h-[360px] object-contain"
            />
          </motion.div>
          {/* Brand pill */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="absolute top-6 right-6 flex flex-col items-end gap-2"
          >
            <span className="bg-orange-500 text-black text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
              {product.brand}
            </span>
            {product.variants && (
              <span className="text-[10px] text-zinc-500 bg-zinc-900/80 px-2.5 py-0.5 rounded-full border border-zinc-800/50">
                {product.variants.length} formats dispo
              </span>
            )}
          </motion.div>
          {/* Price card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="absolute bottom-6 left-6 bg-black/70 border border-zinc-800/60 backdrop-blur-md rounded-2xl px-4 py-3"
          >
            <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-0.5">Prix</div>
            <div className="text-base font-black text-white">
              {product.variants
                ? `${Math.min(...product.variants.map(v => v.price))} – ${Math.max(...product.variants.map(v => v.price))} DH`
                : `${product.price} DH`}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── MOBILE: Stacked layout ── */}
      <div className="relative z-10 lg:hidden">
        {/* Mobile image strip */}
        <div className="relative h-[260px] sm:h-[320px] overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[280px] h-[280px] rounded-full bg-orange-500/12 blur-[50px]" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[240px] h-[240px] rounded-full border border-white/[0.04]" />
            <div className="absolute w-[170px] h-[170px] rounded-full border border-orange-500/[0.07]" />
          </div>
          <motion.div
            initial={{ opacity: 0, rotate: 6, scale: 0.88 }}
            animate={{ opacity: 1, rotate: 14, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ filter: "drop-shadow(0 16px 40px rgba(249,115,22,0.4))" }}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] object-contain"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="absolute top-3 right-3"
          >
            <span className="bg-orange-500 text-black text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              {product.brand}
            </span>
          </motion.div>
        </div>

        {/* Mobile text content */}
        <div className="px-5 pb-8 pt-2">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.22em] text-orange-400 mb-2"
          >
            <span className="h-px w-5 bg-orange-400 block" />
            {product.brand}
          </motion.span>

          <div className="mb-3">
            {titleWords.map((word, i) => (
              <div key={word + i} className="overflow-hidden">
                <motion.span
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + i * 0.06, ease: [0.22, 1, 0.36, 1], duration: 0.6 }}
                  className="block font-black tracking-[-0.02em] leading-[0.88]"
                  style={{
                    fontSize: titleWords.length > 3 ? "clamp(1.8rem, 8vw, 3rem)" : "clamp(2.2rem, 10vw, 3.8rem)",
                    color: i % 2 === 0 ? "#ffffff" : "rgba(255,255,255,0.28)",
                  }}
                >
                  {word}
                </motion.span>
              </div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-sm text-zinc-400 leading-relaxed mb-4"
          >
            {product.mainBenefit}
          </motion.p>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="grid grid-cols-2 gap-x-3 gap-y-1.5 mb-4"
          >
            {product.bullets.slice(0, 4).map((b) => (
              <li key={b} className="flex items-start gap-1.5 text-xs text-zinc-300">
                <span className="flex-none h-1 w-1 rounded-full bg-orange-400 mt-1.5" />
                {b}
              </li>
            ))}
          </motion.ul>

          {product.variants && product.variants.length > 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mb-4"
            >
              <div className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold mb-2">Format</div>
              <div className="flex flex-wrap gap-1.5">
                {product.variants.map((v, i) => (
                  <button
                    key={v.size}
                    onClick={() => setActiveVariant(i)}
                    className={`px-2.5 py-1 rounded-lg border text-xs font-bold transition-all ${
                      i === activeVariant
                        ? "bg-orange-500 border-orange-500 text-black"
                        : "border-zinc-800 text-zinc-500 bg-zinc-950/50"
                    }`}
                  >
                    {v.size} <span className={i === activeVariant ? "text-black/60 ml-0.5" : "text-orange-400 ml-0.5"}>{v.price} DH</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="flex items-center gap-3"
          >
            <button
              onClick={onOrder}
              className="flex-1 rounded-xl bg-orange-500 text-black font-black text-sm py-3.5 shadow-[0_0_25px_rgba(249,115,22,0.3)] active:scale-[0.97] transition-all"
            >
              <span className="flex items-center justify-center gap-2">
                {t("landing.cta")} <ArrowRight className="h-4 w-4" />
              </span>
            </button>
            <div>
              <div className="text-2xl font-black text-white leading-none">
                {currentPrice} <span className="text-sm text-zinc-500 font-normal">DH</span>
              </div>
              <div className="text-[10px] text-zinc-600">{t("landing.cod")}</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65 }}
            className="mt-3 flex items-center gap-3 flex-wrap"
          >
            {[ShieldCheck, Truck, Headset].map((Icon, i) => (
              <span key={i} className="flex items-center gap-1 text-[10px] text-zinc-600">
                <Icon className="h-3 w-3 text-orange-400" />
                {["100% Authentique", "Livraison gratuite", "Support 7j/7"][i]}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="relative z-10 hidden lg:flex justify-center pb-4">
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown className="h-5 w-5 text-zinc-700" />
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Stats bar ─────────────────────────────────────────────────────── */
function StatsBar({ product }: { product: Product }) {
  const stats = [
    { value: "5.0", label: "Note clients" },
    { value: "+1200", label: "Athlètes satisfaits" },
    { value: "24-72h", label: "Délai livraison" },
    { value: "100%", label: "Authentique" },
  ];

  return (
    <div className="bg-orange-500 text-black">
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4">
        {stats.map(({ value, label }) => (
          <div key={label} className="flex flex-col items-center justify-center py-4 sm:py-5 border-r border-black/10 last:border-0 odd:border-b sm:odd:border-b-0">
            <span className="text-xl sm:text-2xl font-black leading-none">{value}</span>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider opacity-70 mt-0.5">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Ingredients grid (dark premium) ───────────────────────────────── */
function IngredientsSection({ product }: { product: Product }) {
  const { t } = useI18n();

  return (
    <section className="bg-zinc-950 relative overflow-hidden">
      {/* decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-orange-500/5 blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="text-center mb-10 sm:mb-14">
          <span className="inline-block text-orange-400 text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] mb-3">
            — {t("landing.benefits.eyebrow")} —
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
            {t("landing.benefits.title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {product.ingredients.map((ing, i) => {
            const Icon = ICONS[ing.icon as keyof typeof ICONS] ?? Sparkles;
            return (
              <motion.div
                key={ing.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="group relative rounded-2xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8 overflow-hidden hover:border-orange-500/40 transition-all"
              >
                {/* number watermark */}
                <span className="absolute top-4 right-4 text-6xl font-black text-white/[0.04] leading-none select-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex items-center justify-center h-12 w-12 rounded-xl bg-orange-500/10 text-orange-400 mb-5 group-hover:bg-orange-500/20 transition">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="font-black text-white text-lg leading-tight mb-2">{ing.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{ing.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Problem / Solution section ────────────────────────────────────── */
function ProblemSolution({ product }: { product: Product }) {
  const { t } = useI18n();

  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">

          {/* Problems */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden"
          >
            <div className="px-6 sm:px-8 pt-6 sm:pt-8 pb-4 border-b border-zinc-800">
              <span className="text-[10px] font-black uppercase tracking-widest text-red-400">Le problème</span>
              <h2 className="mt-1 text-xl sm:text-2xl font-black text-white">
                {t("landing.problem.title")}{" "}
                <span className="text-red-400">{t("landing.problem.title2")}</span> ?
              </h2>
            </div>
            <ul className="px-6 sm:px-8 py-5 sm:py-6 space-y-3 sm:space-y-4">
              {product.problems.map((p, i) => (
                <motion.li
                  key={p}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-start gap-3 text-zinc-300 text-sm sm:text-base"
                >
                  <span className="flex-none mt-0.5 grid place-items-center h-5 w-5 rounded-full bg-red-500/10 border border-red-500/30">
                    <XCircle className="h-3.5 w-3.5 text-red-400" />
                  </span>
                  {p}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Solutions */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl bg-zinc-900 border border-orange-500/20 overflow-hidden"
          >
            <div className="px-6 sm:px-8 pt-6 sm:pt-8 pb-4 border-b border-orange-500/10">
              <span className="text-[10px] font-black uppercase tracking-widest text-orange-400">La solution</span>
              <h2 className="mt-1 text-xl sm:text-2xl font-black text-white">
                {t("landing.solution.title")}{" "}
                <span className="text-orange-400">{product.shortName}</span>
              </h2>
            </div>
            <ul className="px-6 sm:px-8 py-5 sm:py-6 space-y-3 sm:space-y-4">
              {product.solutions.map((s, i) => (
                <motion.li
                  key={s}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-start gap-3 text-zinc-200 text-sm sm:text-base"
                >
                  <span className="flex-none mt-0.5 grid place-items-center h-5 w-5 rounded-full bg-orange-500/10 border border-orange-500/30">
                    <CheckCircle2 className="h-3.5 w-3.5 text-orange-400" />
                  </span>
                  {s}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Testimonials ───────────────────────────────────────────────────── */
function Testimonials() {
  const { t } = useI18n();

  return (
    <section className="bg-zinc-950 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="text-center mb-10">
          <span className="inline-block text-orange-400 text-[10px] font-black uppercase tracking-[0.25em] mb-2">
            — {t("landing.testimonials.eyebrow")} —
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">{t("landing.testimonials.title")}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {([1, 2, 3] as const).map((n, i) => (
            <motion.div
              key={n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6 flex flex-col"
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-zinc-200 leading-relaxed text-sm flex-1">
                &ldquo;{t(`testimonial.${n}.text`)}&rdquo;
              </p>
              <div className="mt-5 pt-4 border-t border-zinc-800 flex items-center gap-3">
                <div className="grid place-items-center h-10 w-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-black font-black text-sm shrink-0">
                  {t(`testimonial.${n}.name`)[0]}
                </div>
                <div>
                  <div className="font-bold text-white text-sm">{t(`testimonial.${n}.name`)}</div>
                  <div className="text-xs text-zinc-500">{t(`testimonial.${n}.city`)}, Maroc 🇲🇦</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Checkout section ──────────────────────────────────────────────── */
function CheckoutSection({ product }: { product: Product }) {
  const { t } = useI18n();
  const [activeVariant, setActiveVariant] = useState(0);
  const displayPrice = product.variants ? product.variants[activeVariant].price : product.price;

  return (
    <section id="checkout" className="relative bg-black border-t border-zinc-900 overflow-hidden">
      {/* BG glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/8 blur-[100px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8 sm:gap-12 items-start">

        {/* Left info */}
        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-orange-400">
            — {t("landing.checkout.eyebrow")} —
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-black text-white leading-tight">
            {t("landing.checkout.title")}
          </h2>
          <p className="mt-3 text-zinc-400 text-sm sm:text-base max-w-md leading-relaxed">
            {t("landing.checkout.desc")}
          </p>

          {/* Product card */}
          <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-4 flex items-center gap-4">
            <div className="relative shrink-0">
              <div className="absolute inset-0 bg-orange-500/20 blur-xl rounded-full" />
              <img
                src={product.image}
                alt={product.name}
                className="relative h-16 w-16 sm:h-20 sm:w-20 object-contain"
                style={{ filter: "drop-shadow(0 8px 20px rgba(249,115,22,0.3))" }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-black text-white text-sm sm:text-base leading-tight">{product.shortName}</div>
              <div className="text-xs text-zinc-500 mt-0.5">{product.brand}</div>
              <div className="text-xs text-zinc-400 mt-1 truncate">{product.tagline}</div>
            </div>
            <div className="shrink-0 text-right">
              <div className="text-orange-400 font-black text-xl sm:text-2xl">{displayPrice}</div>
              <div className="text-xs text-zinc-500">DH</div>
            </div>
          </div>

          {/* Variant select in checkout */}
          {product.variants && product.variants.length > 1 && (
            <div className="mt-4">
              <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Choisir le format</div>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v, i) => (
                  <button
                    key={v.size}
                    onClick={() => setActiveVariant(i)}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition ${
                      i === activeVariant
                        ? "bg-orange-500 border-orange-500 text-black"
                        : "border-zinc-700 text-zinc-400 hover:border-orange-500/50 hover:text-white"
                    }`}
                  >
                    {v.size} — {v.price} DH
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Trust checklist */}
          <ul className="mt-6 space-y-2">
            {[
              t("landing.cod"),
              `${t("trust.delivery")} · 24-72h`,
              t("trust.authentic"),
              "Produit 100% certifié",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-zinc-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Right — form */}
        <CheckoutForm product={product} />
      </div>
    </section>
  );
}

/* ─── Main export ────────────────────────────────────────────────────── */
export function ProductLanding({ product }: { product: Product }) {
  const scrollToOrder = () => {
    document.getElementById("checkout")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="bg-zinc-950 text-white">
      {/* 1. Full-screen Figma-style hero */}
      <HeroProduct product={product} onOrder={scrollToOrder} />

      {/* 2. Stats orange bar */}
      <StatsBar product={product} />

      {/* 3. Pack breakdown (radial animation) */}
      <PackBreakdown product={product} />

      {/* 4. Ingredients grid */}
      <IngredientsSection product={product} />

      {/* 5. Problem / Solution */}
      <ProblemSolution product={product} />

      {/* 6. Testimonials */}
      <Testimonials />

      {/* 7. Checkout */}
      <CheckoutSection product={product} />
    </main>
  );
}
