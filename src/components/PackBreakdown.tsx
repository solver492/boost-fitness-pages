import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Flame, Zap, Dumbbell, Sparkles, Pill, Beaker, Droplet, Atom, CheckCircle2 } from "lucide-react";
import type { PackItem, Product } from "@/data/products";
import { useI18n } from "@/i18n";

const ICONS = { Flame, Zap, Dumbbell, Sparkles, Pill, Beaker, Droplet, Atom } as const;

const COLORS: Record<string, { ring: string; bg: string; text: string; glow: string }> = {
  orange: { ring: "ring-orange-500/40", bg: "bg-orange-500/15", text: "text-orange-400", glow: "shadow-orange-500/40" },
  amber:  { ring: "ring-amber-500/40",  bg: "bg-amber-500/15",  text: "text-amber-400",  glow: "shadow-amber-500/40" },
  lime:   { ring: "ring-lime-500/40",   bg: "bg-lime-500/15",   text: "text-lime-400",   glow: "shadow-lime-500/40" },
  red:    { ring: "ring-red-500/40",    bg: "bg-red-500/15",    text: "text-red-400",    glow: "shadow-red-500/40" },
};

/** Angles (in degrees) for up to 4 items around the pack image, starting top. */
const ANGLES = [-90, 30, 150, 210];

export function PackBreakdown({ product }: { product: Product }) {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Decompose between 25% and 70% of section progress; recompose after 85%
  const progress = useTransform(scrollYProgress, [0.15, 0.45, 0.75, 0.95], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative bg-zinc-950 border-y border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-8 text-center">
        <span className="inline-block text-orange-400 text-xs font-bold uppercase tracking-wider">
          {t("landing.breakdown.eyebrow")}
        </span>
        <h2 className="mt-2 text-3xl sm:text-4xl font-black text-white">
          {t("landing.breakdown.title")}
        </h2>
        <p className="mt-2 text-sm text-zinc-400 max-w-xl mx-auto">{t("landing.breakdown.subtitle")}</p>
      </div>

      {/* Sticky stage – height controls scroll duration */}
      <div className="relative h-[260vh] sm:h-[220vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <div className="relative h-full w-full max-w-6xl mx-auto px-4 sm:px-6">
            {/* Center pack image */}
            <CenterImage src={product.image} alt={product.name} progress={progress} />

            {/* Radial items */}
            {product.items.slice(0, 4).map((item, i) => (
              <RadialItem
                key={item.name}
                item={item}
                angle={ANGLES[i] ?? i * 90}
                progress={progress}
                index={i}
                tDosage={t("item.dosage")}
                tBenefits={t("item.benefits")}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
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
  const scale = useTransform(progress, [0, 1], [1, 0.55]);
  const opacity = useTransform(progress, [0, 0.7, 1], [1, 0.55, 0.35]);

  return (
    <motion.div
      style={{ scale, opacity }}
      className="absolute inset-0 m-auto h-[260px] w-[260px] sm:h-[360px] sm:w-[360px] flex items-center justify-center pointer-events-none"
    >
      <div className="absolute inset-0 bg-orange-500/25 blur-3xl rounded-full" />
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
  progress,
  index,
  tDosage,
  tBenefits,
}: {
  item: PackItem;
  angle: number;
  progress: MotionValue<number>;
  index: number;
  tDosage: string;
  tBenefits: string;
}) {
  // Distance moves item outward from center on decomposition.
  // We compute target x/y based on angle.
  const rad = (angle * Math.PI) / 180;
  // Responsive radius: % of viewport
  const radiusVw = 30; // ~30vw outward at peak
  const xTarget = Math.cos(rad) * radiusVw;
  const yTarget = Math.sin(rad) * radiusVw;

  const x = useTransform(progress, [0, 1], ["0vw", `${xTarget}vw`]);
  const y = useTransform(progress, [0, 1], ["0vw", `${yTarget}vw`]);
  const cardOpacity = useTransform(progress, [0, 0.3, 1], [0, 1, 1]);
  const scale = useTransform(progress, [0, 1], [0.5, 1]);
  const rotate = useTransform(progress, [0, 1], [-15 + index * 5, 0]);

  const Icon = ICONS[item.icon] ?? Sparkles;
  const color = COLORS[item.color] ?? COLORS.orange;

  return (
    <motion.div
      style={{ x, y, opacity: cardOpacity, scale, rotate }}
      className="absolute inset-0 m-auto h-fit w-[260px] sm:w-[300px] pointer-events-none"
    >
      <div className={`relative rounded-2xl bg-zinc-900/95 border border-zinc-800 ring-1 ${color.ring} backdrop-blur p-4 shadow-2xl ${color.glow}`}>
        <div className="flex items-center gap-3">
          <span className={`grid place-items-center h-11 w-11 rounded-xl ${color.bg} ${color.text} shrink-0`}>
            <Icon className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <div className={`text-[10px] uppercase tracking-wider font-bold ${color.text}`}>{item.category}</div>
            <div className="text-white font-black text-sm leading-tight truncate">{item.name}</div>
          </div>
        </div>
        <p className="mt-3 text-xs text-zinc-300 leading-relaxed">{item.description}</p>
        <div className="mt-3 rounded-lg bg-zinc-950/70 border border-zinc-800 p-2.5">
          <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">{tDosage}</div>
          <div className="text-xs text-white mt-0.5">{item.dosage}</div>
        </div>
        <div className="mt-2.5">
          <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold mb-1">{tBenefits}</div>
          <ul className="space-y-1">
            {item.benefits.map((b) => (
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
