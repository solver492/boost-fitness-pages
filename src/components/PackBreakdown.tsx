import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import {
  Flame, Zap, Dumbbell, Sparkles, Pill, Beaker, Droplet, Atom, CheckCircle2,
} from "lucide-react";
import type { PackItem, Product } from "@/data/products";
import { useI18n } from "@/i18n";

const ICONS = { Flame, Zap, Dumbbell, Sparkles, Pill, Beaker, Droplet, Atom } as const;

const COLORS: Record<string, { ring: string; bg: string; text: string; glow: string }> = {
  orange: { ring: "ring-orange-500/40", bg: "bg-orange-500/15", text: "text-orange-400", glow: "shadow-orange-500/30" },
  amber:  { ring: "ring-amber-500/40",  bg: "bg-amber-500/15",  text: "text-amber-400",  glow: "shadow-amber-500/30" },
  lime:   { ring: "ring-lime-500/40",   bg: "bg-lime-500/15",   text: "text-lime-400",   glow: "shadow-lime-500/30" },
  red:    { ring: "ring-red-500/40",    bg: "bg-red-500/15",    text: "text-red-400",    glow: "shadow-red-500/30" },
};

/**
 * Positions for up to 4 items — 4 diagonal quadrants so they never overlap.
 * Format: [angleDeg, radiusVw]
 * Angles use standard math convention (0=right, 90=down on screen).
 */
const POSITIONS = [
  { angle: -45, radius: 34 },  // top-right
  {  angle: 45, radius: 34 },  // bottom-right
  { angle: 135, radius: 34 },  // bottom-left
  { angle: -135, radius: 34 }, // top-left
];

export function PackBreakdown({ product }: { product: Product }) {
  const { t } = useI18n();
  const items = product.items.slice(0, 4);

  return (
    <section className="relative bg-zinc-950 border-y border-zinc-900">
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-8 text-center">
        <span className="inline-block text-orange-400 text-xs font-bold uppercase tracking-wider">
          {t("landing.breakdown.eyebrow")}
        </span>
        <h2 className="mt-2 text-3xl sm:text-4xl font-black text-white">
          {t("landing.breakdown.title")}
        </h2>
        <p className="mt-2 text-sm text-zinc-400 max-w-xl mx-auto">
          {t("landing.breakdown.subtitle")}
        </p>
      </div>

      {/* MOBILE: horizontal snap scroll carousel */}
      <div className="md:hidden px-4 pb-12">
        <div className="overflow-x-auto snap-x snap-mandatory flex gap-4 pb-2 -mx-4 px-4">
          {items.map((item, i) => (
            <div key={item.name} className="snap-center shrink-0 w-[85vw] max-w-[320px]">
              <MobileItemCard item={item} index={i} tDosage={t("item.dosage")} tBenefits={t("item.benefits")} />
            </div>
          ))}
        </div>
        {/* scroll hint dots */}
        <div className="flex justify-center gap-1.5 mt-4">
          {items.map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all ${i === 0 ? "w-4 bg-orange-500" : "w-1.5 bg-zinc-700"}`} />
          ))}
        </div>
      </div>

      {/* DESKTOP: sticky radial animation */}
      <div className="hidden md:block">
        <RadialStage product={product} items={items} tDosage={t("item.dosage")} tBenefits={t("item.benefits")} />
      </div>
    </section>
  );
}

function RadialStage({
  product,
  items,
  tDosage,
  tBenefits,
}: {
  product: Product;
  items: PackItem[];
  tDosage: string;
  tBenefits: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Decompose 20%→50% of progress, recompose 80%→95%
  const progress = useTransform(scrollYProgress, [0.15, 0.45, 0.75, 0.92], [0, 1, 1, 0]);

  return (
    <div ref={ref} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="relative h-full w-full max-w-6xl mx-auto px-6">
          {/* Center pack image — always below cards (z-0) */}
          <CenterImage src={product.image} alt={product.name} progress={progress} />

          {/* Radial cards */}
          {items.map((item, i) => {
            const pos = POSITIONS[i] ?? POSITIONS[0];
            return (
              <RadialItem
                key={item.name}
                item={item}
                angle={pos.angle}
                radiusVw={pos.radius}
                progress={progress}
                index={i}
                tDosage={tDosage}
                tBenefits={tBenefits}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function CenterImage({
  src,
  alt,
  progress,
}: {
  src: string;
  alt: string;
  progress: MotionValue<number>;
}) {
  const scale = useTransform(progress, [0, 1], [1, 0.5]);
  const opacity = useTransform(progress, [0, 0.6, 1], [1, 0.4, 0.2]);

  return (
    <motion.div
      style={{ scale, opacity }}
      className="absolute inset-0 m-auto z-0 h-[280px] w-[280px] lg:h-[360px] lg:w-[360px] flex items-center justify-center pointer-events-none"
    >
      <div className="absolute inset-0 bg-orange-500/20 blur-3xl rounded-full" />
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="relative w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(249,115,22,0.45)]"
      />
    </motion.div>
  );
}

function RadialItem({
  item,
  angle,
  radiusVw,
  progress,
  index,
  tDosage,
  tBenefits,
}: {
  item: PackItem;
  angle: number;
  radiusVw: number;
  progress: MotionValue<number>;
  index: number;
  tDosage: string;
  tBenefits: string;
}) {
  const rad = (angle * Math.PI) / 180;
  const xTarget = Math.cos(rad) * radiusVw;
  const yTarget = Math.sin(rad) * radiusVw;

  const x = useTransform(progress, [0, 1], ["0vw", `${xTarget}vw`]);
  const y = useTransform(progress, [0, 1], ["0vw", `${yTarget}vw`]);
  const opacity = useTransform(progress, [0, 0.25, 0.85, 1], [0, 1, 1, 0]);
  const scale = useTransform(progress, [0, 0.4, 1], [0.7, 1, 0.95]);
  const rotate = useTransform(progress, [0, 0.4, 1], [index % 2 === 0 ? -8 : 8, 0, 0]);

  const Icon = ICONS[item.icon] ?? Sparkles;
  const color = COLORS[item.color] ?? COLORS.orange;

  return (
    <motion.div
      style={{ x, y, opacity, scale, rotate }}
      className="absolute inset-0 m-auto z-10 h-fit w-[270px] lg:w-[300px] pointer-events-none"
    >
      <div
        className={`relative rounded-2xl bg-zinc-900/98 border border-zinc-800 ring-1 ${color.ring} backdrop-blur-sm p-4 shadow-2xl ${color.glow}`}
      >
        <div className="flex items-center gap-3">
          <span className={`grid place-items-center h-11 w-11 rounded-xl ${color.bg} ${color.text} shrink-0`}>
            <Icon className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <div className={`text-[10px] uppercase tracking-wider font-bold ${color.text}`}>{item.category}</div>
            <div className="text-white font-black text-sm leading-tight">{item.name}</div>
          </div>
        </div>
        <p className="mt-3 text-xs text-zinc-300 leading-relaxed line-clamp-2">{item.description}</p>
        <div className="mt-3 rounded-lg bg-zinc-950/70 border border-zinc-800 p-2.5">
          <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">{tDosage}</div>
          <div className="text-xs text-white mt-0.5">{item.dosage}</div>
        </div>
        <div className="mt-2.5">
          <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold mb-1">{tBenefits}</div>
          <ul className="space-y-1">
            {item.benefits.slice(0, 3).map((b) => (
              <li key={b} className="flex items-start gap-1.5 text-[11px] text-zinc-300">
                <CheckCircle2 className={`h-3 w-3 mt-0.5 ${color.text} shrink-0`} />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

function MobileItemCard({
  item,
  index,
  tDosage,
  tBenefits,
}: {
  item: PackItem;
  index: number;
  tDosage: string;
  tBenefits: string;
}) {
  const Icon = ICONS[item.icon] ?? Sparkles;
  const color = COLORS[item.color] ?? COLORS.orange;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className={`rounded-2xl bg-zinc-900/95 border border-zinc-800 ring-1 ${color.ring} p-5 shadow-xl h-full`}
    >
      <div className="flex items-center gap-3 mb-4">
        <span className={`grid place-items-center h-12 w-12 rounded-xl ${color.bg} ${color.text} shrink-0`}>
          <Icon className="h-6 w-6" />
        </span>
        <div className="min-w-0">
          <div className={`text-[11px] uppercase tracking-wider font-bold ${color.text}`}>{item.category}</div>
          <div className="text-white font-black text-base leading-tight">{item.name}</div>
        </div>
      </div>

      <p className="text-sm text-zinc-300 leading-relaxed mb-4">{item.description}</p>

      <div className="rounded-xl bg-zinc-950/70 border border-zinc-800 p-3 mb-4">
        <div className="text-[11px] uppercase tracking-wider text-zinc-500 font-bold mb-1">{tDosage}</div>
        <div className="text-sm text-white">{item.dosage}</div>
      </div>

      <div>
        <div className="text-[11px] uppercase tracking-wider text-zinc-500 font-bold mb-2">{tBenefits}</div>
        <ul className="space-y-1.5">
          {item.benefits.map((b) => (
            <li key={b} className="flex items-start gap-2 text-sm text-zinc-300">
              <CheckCircle2 className={`h-4 w-4 mt-0.5 ${color.text} shrink-0`} />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
